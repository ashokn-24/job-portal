import { useJobs } from "../../context/JobsContext";
import { Select } from "antd";

const Applications = () => {
  const { dashboardData, recruiterApplications, applications } = useJobs();

  const jobs = dashboardData?.jobs || [];

  const sortedJobs = jobs.sort(
    (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
  );

  console.log("jobs", applications);

  const handleChange = (value) => {
    recruiterApplications(value);
    console.log(value);
  };

  const options = sortedJobs.map((job) => ({
    value: job._id,
    label: job.jobTitle,
  }));

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[100vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>
      {/* Applicants List */}
      <div className="space-y-4">
        <Select
          onChange={handleChange}
          // defaultActiveFirstOption
          options={options}
          className="w-full"
          defaultActiveFirstOption
          placeholder={"Select job"}
        />
        {applications?.length > 0 ? (
          applications.map((application) => (
            <div
              key={application._id}
              className="p-4 bg-gray-50 rounded-lg border"
            >
              <h3 className="font-semibold text-lg">
                {application?.user?.name}
              </h3>
              <p className="text-gray-600">
                Applied for: {application?.jobId?.jobTitle}
              </p>
              <p className="text-gray-600">Status: Under Review</p>
              <button className="bg-mildBlue text-white px-3 py-1 rounded-md cursor-pointer hover:text-white my-3">
                {" "}
                View Profile{" "}
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No applications found</p>
        )}
      </div>
    </div>
  );
};

export default Applications;
