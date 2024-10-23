/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});
  // console.log(dashboardData);

  const loadAllJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employee/jobs");
      setJobs(res.data);
      console.log("data", res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`/employee/job/${id}`);
      setJobData(res.data);
      console.log("data", res.data);
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

  return (
    <JobContext.Provider
      value={{
        jobs,
        dashboardData,
        jobData,
        loading,
        loadAllJobs,
        getJobById,
        getDashBoardData,
        postJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

export const useJobs = () => useContext(JobContext);
