import { useEffect, useState } from "react";
import { useJobs } from "../../context/JobsContext";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import Filter from "./Filter";
import { Spin } from "antd";
import CheckboxFilter from "./CheckboxFilter";
import JobAlert from "../../components/JobAlert";

const Jobs = () => {
  const { jobs, loadAllJobs, filteredJobs, filterJobs, loading } = useJobs();
  const [page, setPage] = useState(1);

  const displayedJobs = filteredJobs.length > 0 ? filteredJobs : jobs;

  // const count = displayedJobs.reduce((acc, job) => {
  //   acc[job.workType] = (acc[job.workType] || 0) + 1;
  //   return acc;
  // }, {});

  // Sort jobs by creation date (descending)
  const sortedJobs = displayedJobs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Load all jobs on initial render
  useEffect(() => {
    loadAllJobs();
  }, []);

  // Handle filter results
  const handleFilterResults = (filteredJobs) => {
    console.log("Filtered Jobs:", filteredJobs);
    setPage(1);
    filterJobs(filteredJobs);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="mb-5">
          <Filter jobs={jobs} onFilter={handleFilterResults} />
        </div>
        <div className="container mx-auto p-8 flex justify-between gap-6">
          {/* Left Sidebar */}
          <div className="h-fit px-2 py-5 flex flex-col gap-6 text-gray-500">
            {/* Create Job Alert */}
            <JobAlert />

            {/* Work Mode and Experience Filters */}
            <CheckboxFilter />
          </div>

          {/* Job Cards Section */}
          <div className="flex-grow">
            <div className="mb-4">Showing {sortedJobs.length} jobs</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {sortedJobs.length > 0 ? (
                sortedJobs
                  .slice((page - 1) * 10, page * 10)
                  .map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-center col-span-full text-gray-600">
                  No jobs available at the moment.
                </p>
              )}
            </div>
            {/* Pagination */}
            {displayedJobs.length > 10 && (
              <div className="flex gap-3 justify-center mt-6">
                {Array.from({
                  length: Math.ceil(displayedJobs.length / 10),
                }).map((_, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 cursor-pointer rounded-full ${
                      page === i + 1
                        ? "bg-darkBlue text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:scale-110 transition-transform`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
