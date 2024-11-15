/* eslint-disable react/prop-types */

import { Badge } from "antd";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const DashBoardJobs = ({ job }) => {
  return (
    <div className="bg-gray-50 broder-2 border-2-gray shadow-2xl w-full  rounded-lg p-6">
      <div className="flex justify-between gap-4">
        <div className="text-md font-semibold text-gray-500">
          {" "}
          {job.jobTitle}
        </div>

        <div className="flex gap-3">
          <MdDelete size={20} />
          <MdEdit size={20} />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">{job.name}</h2>{" "}
      <div className="text-sm flex gap-7 text-gray-500">
        {" "}
        {job.company.name} <div>{job.location}</div>
      </div>
      <div className=" mt-2 text-sm text-gray-500">
        <div>{job.jobType}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-xs text-gray-500 flex items-end">
          {new Date(job.createdAt).toLocaleString()}
        </div>{" "}
        <div className="flex gap-3">
          <Link to={`/jobs/${job._id}`}>
            <button className="bg-mildBlue text-white text-sm rounded-lg px-2 py-1 hover:scale-110 hover:bg-darkBlue transition-all duration-500">
              View Discription
            </button>
          </Link>
          <Link to={`/jobs/${job._id}`}>
            <Badge count={100}>
              <button className="bg-mildBlue text-white text-sm rounded-lg px-2 py-1 hover:scale-110 hover:bg-darkBlue transition-all duration-500">
                Applicants
              </button>
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardJobs;
