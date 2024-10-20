import { useEffect } from "react";
import { useJobs } from "../../context/JobsContext";

const Jobs = () => {
  const { jobs, loadAllJobs, loading } = useJobs();

  useEffect(() => {
    loadAllJobs(); // Fetch jobs when component mounts
  }, []);

  if (loading) return <h1>Loading....</h1>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{job.name}</h2>{" "}
              <p className="text-gray-700 mb-4">{job.email}</p>{" "}
              <img
                src={job.profilePic}
                alt={job.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="text-sm text-gray-500 mb-2">
                Role: {job.jobTitle}
              </div>
              <div className="text-sm text-gray-500">
                Company: {job.company.name}{" "}
              </div>
              <div className="text-sm text-gray-500">
                Created At: {new Date(job.createdAt).toLocaleDateString()}
              </div>{" "}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
