/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import api from "../utils/axiosConfig";

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(jobs);

  const loadAllJobs = async () => {
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

  return (
    <JobContext.Provider value={{ jobs, loadAllJobs, loading }}>
      {children}
    </JobContext.Provider>
  );
};

export default JobProvider;

export const useJobs = () => useContext(JobContext);
