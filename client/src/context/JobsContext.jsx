/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [applications, setApplications] = useState([]);
  const [dashboardApplications, setDashboardApplications] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [userApplication, setUserApplication] = useState(null);

  console.log(dashboardData);
  console.log(dashboardData?.company?._id);
  useEffect(() => {
    loadAllJobs();
    dashboardData?.company &&
      getCompanyApplications(dashboardData?.company?._id);
  }, [dashboardData?.company]);

  const loadAllJobs = async (query) => {
    setLoading(true);
    try {
      const res = await api.get(
        query ? `/employee/jobs?${query}` : `/employee/jobs`
      );
      setJobs(res.data);
      // console.log("data", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = async (query) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/jobs?${query}`);
      setFilteredJobs(res.data);
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/job/${id}`);
      setJobData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getDashBoardData = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/dashboard/jobs/${id}`);
      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const postJob = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post(`employee/postjob`, payload);
      message.success("Job posted successfully");
      // setTimeout(() => {
      //   navigate("/");
      // }, 500);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (id) => {
    setLoading(true);
    try {
      const res = await api.post(`employee/jobs/${id}/apply`);
      setApplicationStatus(res.data);
      message.success(res.data.message || "Successfully applied");
      return res;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      setApplicationStatus({ status: "error", message: errorMessage });
      message.error(errorMessage);
      return { data: { status: "error", message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const updateJobById = async (id, payload) => {
    setLoading(true);
    try {
      const res = await api.put(`employee/job/${id}`);
      message.success(res.data.message || "Successfully Updated Job");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      message.error(errorMessage);
      return { data: { status: "error", message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const deleteJobById = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`employee/job/${id}`);
      message.success("Successfully Deleted Job");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      message.error(errorMessage);
      return { data: { status: "error", message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const getUserApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/applications`);
      setApplications(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyApplications = async (companyId) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/${companyId}/applications`);
      setDashboardApplications(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const recruiterApplications = async (jobId) => {
    setApplications(null);
    setLoading(true);
    try {
      const res = await api.get(`/dashboard/jobs/${jobId}/applications`);
      console.log(res.data);
      setApplications(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getApplicationById = async (id) => {
    setLoading(true);
    setUserApplication(null);
    try {
      const res = await api.get(`/dashboard/jobs/applications/${id}`);
      console.log(res.data);
      setUserApplication(res.data.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationById = async (id, status) => {
    setLoading(true);
    try {
      const res = await api.put(`/dashboard/applications/status/${id}`, status);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        dashboardData,
        jobData,
        applicationStatus,
        applications,
        userApplication,
        loading,
        dashboardApplications,
        loadAllJobs,
        updateApplicationById,
        filterJobs,
        getJobById,
        getDashBoardData,
        postJob,
        applyJob,
        getUserApplications,
        getApplicationById,
        recruiterApplications,
        updateJobById,
        deleteJobById,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

export const useJobs = () => useContext(JobContext);
