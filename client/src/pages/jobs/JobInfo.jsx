import { Link, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../../context/JobsContext";
import { useEffect, useState } from "react";
import { Button, Result, Spin } from "antd";
import { useUser } from "../../context/UserContext";

function JobInfo() {
  const { id } = useParams();
  const { jobData, getJobById, loading, applyJob, applicationStatus } =
    useJobs();
  const { user } = useUser();
  const [success, setSuccess] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getJobById(id);
  }, [id]);

  const handleApply = () => {
    if (user) {
      applyJob(id);
    } else {
      navigate("/login");
      setSuccess(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (success) {
    return (
      <Result
        status="success"
        title={applicationStatus?.message || "Application Successful"}
        extra={[
          <Link key="back" to={"/jobs"}>
            <button className="bg-darkBlue px-3 py-1">Go Back</button>
          </Link>,
        ]}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {jobData?.jobTitle || "Job Title"}
      </h1>

      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          <strong>Company:</strong> {jobData?.company?.name || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {jobData?.location || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Experience Level:</strong> {jobData?.experienceLevel || "N/A"}
        </p>
      </div>

      {/* Interactive Job Description Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-darkBlue">Job Description</h2>
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
          <strong>Salary Range:</strong> {jobData?.salaryRange || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Skills:</strong> {jobData?.skills?.join(", ") || "N/A"}
        </p>
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
  );
}

export default JobInfo;
