import { useEffect, useState } from "react";
import { useJobs } from "../../context/JobsContext";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import Filter from "./Filter";
import { Badge, Checkbox, Spin } from "antd";

const Jobs = () => {
  const { jobs, loadAllJobs, loading } = useJobs();

  const [page, setPage] = useState(1);

  const sortedJobs = jobs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  useEffect(() => {
    loadAllJobs();
  }, []);

  const handleFilterResults = (filteredJobs) => {
    console.log("Filtered Jobs:", filteredJobs);
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
        <div className="container mx-auto p-8 flex justify-between ">
          <div className=" h-fit px-2  py-5 flex flex-col gap-6 text-gray-500">
            <div>
              <div className="bg-blue-50 rounded-md p-5 m-2 grid gap-2 text-sm">
                <h1 className="font-bold">Create Job Alert</h1>
                <p> Create a job alert now and never miss a job</p>
                <input
                  type="text"
                  placeholder="Enter Job Keyword"
                  className="border-0 rounded-md p-2 text-sm"
                />
                <button className="bg-darkBlue text-white rounded-md px-3 py-2">
                  Create Job Alert
                </button>
              </div>
            </div>

            <div className="rounded-md bg-white px-5 py-10 grid gap-5">
              <div className="grid gap-2">
                <h1>Work Mode</h1>
                <div className="flex justify-between">
                  <Checkbox className="text-gray-500">Onsite</Checkbox>
                  <Badge count={25} color="bg-darkBlue" />
                </div>
                <div className="flex justify-between">
                  <Checkbox className="text-gray-500">Work From Home</Checkbox>
                  <Badge count={25} color="bg-darkBlue" />
                </div>
                <div className="flex justify-between">
                  <Checkbox className="text-gray-500">Hybrid</Checkbox>
                  <Badge count={25} color="bg-darkBlue" />
                </div>
              </div>
              <div className="grid gap-2">
                <h1>Experience</h1>
                <div>
                  <Checkbox className="text-gray-500">Fresher</Checkbox>
                </div>
                <div>
                  <Checkbox className="text-gray-500">1+ year</Checkbox>
                </div>
                <div>
                  <Checkbox className="text-gray-500">3+ year</Checkbox>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3">
            <div>Showing {sortedJobs.length} jobs</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-[700px] gap-8">
              {sortedJobs.length > 0 ? (
                sortedJobs
                  .slice(page * 10 - 10, page * 10)
                  .map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p className="text-center col-span-full text-gray-600">
                  No jobs available at the moment.
                </p>
              )}

              {jobs.length > 0 && (
                <div className="flex gap-3 justify-center">
                  {jobs.length / 10 > 0 &&
                    Array.from({ length: Math.ceil(jobs.length / 10) }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className="bg-darkBlue text-white  px-2 py-1 cursor-pointer rounded-[50%] hover:scale-110 transition-all duration-300"
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </span>
                      )
                    )}
                </div>
              )}
            </div>
          </div>
          <div>{/* Empty fot space */}</div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
