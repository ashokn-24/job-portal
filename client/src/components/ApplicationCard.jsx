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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {applications.map((application) => (
        <Card
          bordered={false}
          di
          key={application._id}
          title={application.jobId?.jobTitle}
          style={{ width: 500 }}
          extra={
            <div className="flex gap-3 items-center">
              <div className="font-medium">
                {" "}
                Status:
                <span className=" p-2 font-medium text-green-500">
                  {application.status}
                </span>
              </div>
              {/* <div>
                <button className="bg-darkBlue text-white px-2 py-1 rounded-md">
                  Update Status
                </button>
              </div> */}
            </div>
          }
          className="m-5 shadow-lg"
        >
          <div className="flex flex-col gap-3 justify-end">
            <div>{application.jobId?.company?.name}</div>
            <div className="flex justify-between">
              <div>
                Applied at: {new Date(application.appliedAt).toLocaleString()}
              </div>
              <Link
                to={`/jobs/${application.jobId._id}`}
                className="bg-mildBlue text-white px-3 py-1 rounded-md cursor-pointer hover:text-white"
              >
                View Decsription
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ApplicationCard;
