/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Modal } from "antd";
import { useState } from "react";
import PostJob from "../pages/dashboard/PostJob";

const DashBoardJobs = ({ job }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleAlert = () => {
    setIsAlertVisible(!true);
  };
  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white border border-gray-300 shadow-lg w-[90%] rounded-lg p-6 transition-transform duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-semibold text-gray-700">
          {job.jobTitle}
        </div>
        <div className="flex gap-3">
          <button
            onClick={showAlert}
            className="text-red-500 hover:text-red-700"
          >
            <MdDelete size={20} />
          </button>
          <button
            onClick={showModal}
            className="text-blue-500 hover:text-blue-700"
          >
            <MdEdit size={20} />
          </button>
        </div>
      </div>
      <Modal
        title="Confirm Deletion"
        open={isAlertVisible}
        onOk={handleAlert}
        onCancel={handleAlert}
        width={"400px"}
        footer={null}
      >
        <div className="flex items-center justify-center gap-10 h-20">
          <button className="border border-black rounded-md px-3 py-2 hover:bg-gray-200">
            Cancel
          </button>
          <button className="rounded-md px-3 py-2 text-white bg-red-500 hover:bg-red-700">
            Delete
          </button>
        </div>
      </Modal>
      <Modal
        title="Edit Job Details"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
        footer={null}
      >
        <PostJob initialData={job} />
      </Modal>
      <h2 className="text-xl font-semibold mb-2">{job.name}</h2>
      <div className="text-sm flex flex-col sm:flex-row gap-4 text-gray-500">
        <span>{job.location}</span>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span>{job.jobType}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">
          {new Date(job.createdAt).toLocaleString()}
        </span>
        <div className="flex gap-3">
          <Link to={`/jobs/${job._id}`}>
            <button className="bg-blue-500 text-white text-sm rounded-lg px-2 py-1 hover:bg-blue-600 transition-all duration-300">
              View Description
            </button>
          </Link>
          <Link to={`/jobs/${job._id}`}>
            <button className="bg-blue-500 text-white text-sm rounded-lg px-2 py-1 hover:bg-blue-600 transition-all duration-300">
              Applicants
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardJobs;
