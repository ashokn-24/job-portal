/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

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
  const [applicants, setApplicants] = useState([]);

  const loadAllJobs = async (query) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/jobs?${query}`);
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
      console.log(res.data);
      // setTimeout(() => {
      //   navigate("/");
      // }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (id) => {
    setLoading(true);
    try {
      const res = await api.post(`employee/jobs/${id}/apply`);
      setApplicationStatus(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/applications");
      setApplications(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const recruiterApplications = async (jobId) => {
    setApplications(null);
    try {
      const res = await api.get(`/dashboard/jobs/${jobId}/applications`);
      console.log(res.data);
      setApplications(res.data.data);
    } catch (error) {
      console.log(error);
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
        loading,
        loadAllJobs,
        filterJobs,
        getJobById,
        getDashBoardData,
        postJob,
        applyJob,
        getUserApplications,
        recruiterApplications,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

export const useJobs = () => useContext(JobContext);
