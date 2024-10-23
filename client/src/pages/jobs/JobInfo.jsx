import { useParams } from "react-router-dom";
import { useJobs } from "../../context/JobsContext";
import { useEffect } from "react";
import { Spin } from "antd";

function JobInfo() {
  const { id } = useParams();
  const { jobData, getJobById, loading } = useJobs();

  useEffect(() => {
    getJobById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{jobData?.jobTitle}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Company:</strong> {jobData?.company.name}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Description:</strong> {jobData?.company.description}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Website:</strong>{" "}
        <a href={jobData?.company.website} className="text-blue-500">
          {jobData?.company.website}
        </a>
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Address:</strong> {jobData?.company.address}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Location:</strong> {jobData?.location}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Experience Level:</strong> {jobData?.experienceLevel}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Industry:</strong> {jobData?.industry}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Job Description:</strong> {jobData?.jobDescription}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Job Type:</strong> {jobData?.jobType}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Salary Range:</strong> {jobData?.salaryRange}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Skills:</strong> {jobData?.skills.join(", ")}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Work Type:</strong> {jobData?.workType}
      </p>
      <p className="text-gray-500 text-sm">
        <strong>Posted on:</strong>{" "}
        {new Date(jobData?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default JobInfo;
