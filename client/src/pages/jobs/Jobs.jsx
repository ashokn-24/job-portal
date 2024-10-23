import { useEffect } from "react";
import { useJobs } from "../../context/JobsContext";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import Filter from "./Filter";

const Jobs = () => {
  const { jobs, loadAllJobs, loading } = useJobs();

  useEffect(() => {
    loadAllJobs(); // Fetch jobs when component mounts
  }, []);

  if (loading) return <h1>Loading....</h1>;
  return (
    <>
      <Navbar />
      <div className="my-5">
        <h1 className="text-3xl font-bold mb-6 text-darkBlue text-center">
          Current Jobs
        </h1>
        <Filter />
      </div>
      <div className="container mx-auto p-8 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-[700px] gap-8">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p className="text-center col-span-full text-gray-600">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Jobs;
