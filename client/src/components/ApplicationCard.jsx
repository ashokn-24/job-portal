import { useEffect } from "react";
import { useJobs } from "../context/JobsContext";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";

const ApplicationCard = () => {
  const { getUserApplications, applications, loading } = useJobs();
  console.log(applications);

  useEffect(() => {
    getUserApplications();
  }, []);

  const filterApplications = applications.sort((a, b) => {
    const updateTime = new Date(b.updatedAt) - new Date(a.updatedAt);

    if (updateTime !== 0) {
      return updateTime;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  console.log(filterApplications);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {filterApplications.map(
        (application) =>
          application.jobId && (
            <Card
              bordered={false}
              key={application?._id}
              title={application.jobId?.jobTitle}
              style={{ width: 500 }}
              extra={
                <div className="flex gap-3 items-center">
                  <div className="font-medium">
                    {" "}
                    Status:
                    <span
                      className={`p-2 font-medium ${
                        application.status === "Under Review"
                          ? "text-blue-500"
                          : application.status === "Applied"
                          ? "text-yellow-500"
                          : application.status === "Accepted"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
              }
              className="m-5 shadow-lg"
            >
              <div className="flex flex-col gap-3 justify-end">
                <div>{application?.jobId?.company?.name}</div>
                <div className="flex justify-between">
                  <div>
                    Applied at:{" "}
                    {new Date(application.appliedAt).toLocaleString()}
                  </div>
                  <Link
                    to={`/jobs/${application?.jobId?._id}`}
                    className="bg-mildBlue text-white px-3 py-1 rounded-md cursor-pointer hover:text-white"
                  >
                    View Decsription
                  </Link>
                </div>
              </div>
            </Card>
          )
      )}
    </>
  );
};

export default ApplicationCard;
