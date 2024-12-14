const JobList = () => {
  return (
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
  );
};

export default JobList;
