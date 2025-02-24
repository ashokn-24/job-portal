import { Link } from "react-router-dom";
import { useJobs } from "../../context/JobsContext";
import { Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Applications = () => {
  const { dashboardData, recruiterApplications, dashboardApplications } =
    useJobs();

  const jobs = dashboardData?.jobs || [];

  const sortedJobs = jobs.sort(
    (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
  );

  console.log("jobs", dashboardApplications);

  const handleChange = (value) => {
    recruiterApplications(value);
    console.log(value);
  };

  const options = sortedJobs.map((job) => ({
    value: job._id,
    label: job.jobTitle,
  }));

  return (
    <div className="bg-white">
      <h2 className="text-2xl bg-white font-bold px-5 py-3 ">Applicants</h2>
      <div className="bg-white px-6 w-full h-full">
        {/* Applicants List */}
        <div className="space-y-4">
          <Select
            onChange={handleChange}
            // defaultActiveFirstOption
            options={options}
            className="w-full"
            defaultActiveFirstOption
            placeholder={"Sort by job"}
          />
          {dashboardApplications?.length > 0 ? (
            dashboardApplications.map(
              (application) =>
                application.status != "Rejected" && (
                  <div
                    key={application._id}
                    className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="border rounded-full p-4 bg-blue-100">
                        <UserOutlined className="text-blue-600 text-2xl" />
                      </div>
                      <h3 className="font-semibold text-lg text-start flex-1">
                        {application?.user?.name}
                      </h3>
                      <Link to={`/dashboard/applicants/${application?._id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300">
                          View Profile
                        </button>
                      </Link>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700 font-medium">Applied for:</p>
                      <p className="text-gray-600">
                        {application?.jobId?.jobTitle}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-700 font-medium">Status:</p>
                      <p className="text-gray-600">{application?.status}</p>
                    </div>
                  </div>
                )
            )
          ) : (
            <p className="text-gray-600">No applications found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
