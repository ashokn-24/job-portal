import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../context/JobsContext";
import { Button, Popconfirm, Spin, message } from "antd";

const UserDetails = () => {
  const { id } = useParams();

  const {
    getApplicationById,
    userApplication,
    loading,
    updateApplicationById,
  } = useJobs();

  const navigate = useNavigate();

  const handleStatus = (status) => {
    updateApplicationById(id, { status: status });
    message.success(`Application ${status} Successfully`);
    navigate("/dashboard");
  };

  useEffect(() => {
    getApplicationById(id);
  }, []);

  console.log(userApplication);

  if (loading || !userApplication) {
    return <Spin fullscreen />;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md">
        {" "}
        <div className="flex items-center space-x-4">
          {" "}
          <img
            className="w-24 h-24 rounded-full"
            src={userApplication?.profilePic}
            alt="Profile"
          />{" "}
          <div>
            {" "}
            <h1 className="text-2xl font-bold">{userApplication?.name}</h1>{" "}
            <p>{userApplication?.email}</p>{" "}
          </div>{" "}
        </div>{" "}
        <section className="mt-6">
          {" "}
          <h2 className="text-xl font-semibold">Education</h2>{" "}
          <ul className="list-disc list-inside">
            {" "}
            {userApplication?.education.map((edu) => (
              <li key={edu._id} className="mt-2">
                {" "}
                <strong>{edu.degree}</strong> at {edu.institution} (
                {new Date(edu.startDate).toLocaleDateString()} -{" "}
                {new Date(edu.endDate).toLocaleDateString()}) <br /> Grade:{" "}
                {edu.grade}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </section>{" "}
        <section className="mt-6">
          {" "}
          <h2 className="text-xl font-semibold">Experience</h2>{" "}
          <ul className="list-disc list-inside">
            {" "}
            {userApplication?.experience.map((exp) => (
              <li key={exp._id} className="mt-2">
                {" "}
                <strong>{exp.title}</strong> at {exp.company} (
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {new Date(exp.endDate).toLocaleDateString()}) <br />{" "}
                {exp.description}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </section>{" "}
        <section className="mt-6">
          {" "}
          <h2 className="text-xl font-semibold">Resume</h2>{" "}
          <a
            href={userApplication?.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {" "}
            View Resume{" "}
          </a>{" "}
        </section>{" "}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Popconfirm
          title="Reject the Application"
          description="Are you sure to reject this application?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleStatus("Rejected")}
        >
          <button className="bg-red-500 rounded-md px-4 py-2 text-white hover:scale-105 transition-transform duration-300 hover:bg-red-600">
            Reject
          </button>
        </Popconfirm>
        <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white hover:scale-105 transition-transform duration-300 hover:bg-blue-600"
          onClick={() => handleStatus("Under Review")}
        >
          Under Review
        </button>
        <button
          className="bg-green-500 rounded-md px-4 py-2 text-white hover:scale-105 transition-transform duration-300 hover:bg-green-600"
          onClick={() => handleStatus("Accepted")}
        >
          Accept
        </button>
      </div>
    </>
  );
};

export default UserDetails;
