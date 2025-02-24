import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../context/JobsContext";
import { useEffect, useState } from "react";
import { Button, Result, Spin } from "antd";
import { useUser } from "../../context/UserContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function JobInfo() {
  const { id } = useParams();
  const { jobData, getJobById, loading, applyJob, applicationStatus } =
    useJobs();
  const { user } = useUser();
  const [status, setStatus] = useState(null);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getJobById(id);
  }, [id]);

  const handleApply = async () => {
    if (user) {
      const response = await applyJob(id);
      if (response?.data?.status === "error") {
        setStatus("error");
      } else if (response?.data?.status === "success") {
        setStatus("success");
      }
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  console.log(applicationStatus);
  if (status === "error") {
    return (
      <Result
        status="error"
        title="Application Failed"
        subTitle={
          applicationStatus?.message ||
          "An error occurred while applying for the job."
        }
        extra={[
          <Button key="retry" type="primary" onClick={() => getJobById(id)}>
            Retry
          </Button>,
          <Link key="back" to="/jobs">
            <Button>Back to Jobs</Button>
          </Link>,
        ]}
      />
    );
  }

  if (status === "success") {
    return (
      <Result
        status="success"
        title={applicationStatus?.message || "Application Successful"}
        extra={[
          <Link key="back" to="/jobs">
            <Button className="bg-darkBlue text-white hover:bg-blue-500 focus:outline-none">
              Go Back
            </Button>
          </Link>,
        ]}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 relative bg-white shadow-md rounded-lg">
        <div className="">
          <div className="bg-info-banner bg-cover w-full h-40 b-t p-16 relative">
            <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"></div>
          </div>
          <h1 className="text-3xl font-bold mb-4 p-4 text-center relative z-10">
            {jobData?.jobTitle || "Job Title"}
          </h1>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            <strong>Company:</strong> {jobData?.company?.name || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {jobData?.location || "N/A"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Experience Level:</strong>{" "}
            {jobData?.experienceLevel || "N/A"}
          </p>
        </div>

        {/* Interactive Job Description Section */}
        <div className="mb-6 w-[80%] ">
          <h2 className="text-xl font-semibold text-darkBlue">
            Job Description
          </h2>
          <p
            className={`text-gray-700 ${
              descriptionExpanded ? "" : "line-clamp-3"
            }`}
          >
            {jobData?.jobDescription || "No description available."}
          </p>
          <button
            className="text-blue-500 hover:text-blue-700 mt-2 focus:outline-none"
            onClick={() => setDescriptionExpanded(!descriptionExpanded)}
          >
            {descriptionExpanded ? "Show Less" : "Show More"}
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Salary Range:</strong>{" "}
            {jobData?.salaryRange != "undefined undefined"
              ? jobData?.salaryRange || "N/A"
              : "Unstipend"}
          </p>
          <div className="text-gray-700 flex items-center gap-2 my-2">
            <strong>Skills:</strong>{" "}
            <div className="flex gap-2">
              {jobData?.skills?.map((sk) => {
                return (
                  <span key={sk} className="bg-gray-100 rounded-lg p-2">
                    {sk || "N/A"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Apply Now Button with Hover Effect */}
        <div className="flex justify-center">
          <button
            className="bg-darkBlue text-white px-5 py-3 text-lg rounded-md transform transition duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobInfo;
