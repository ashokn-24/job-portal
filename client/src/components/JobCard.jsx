/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { FcDepartment } from "react-icons/fc";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
TimeAgo.addDefaultLocale(en);

const JobCard = ({ job }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="grid gap-1 bg-white broder-2 border-2-gray shadow-2xl w-[350px] rounded-lg p-6">
      <div className="flex justify-start gap-4">
        <FcDepartment size={25} />
        <div className="text-md font-semibold text-gray-500 mb-2">
          {job?.jobTitle || "Job Title Unavailable"}
        </div>
      </div>
      <div className="text-sm flex gap-7 text-gray-500">
        {job?.company?.name || "Company Name Unavailable"}
        <div>{job?.location || "Location Unavailable"}</div>
      </div>
      <div className=" mt-2 text-sm text-gray-500">
        <div className="py-2">{job?.jobType || "Job Type Unavailable"}</div>
      </div>
      <div className="flex justify-between">
        <div className="text-xs text-gray-500 flex items-end">
          {job?.createdAt
            ? timeAgo.format(new Date(job.createdAt))
            : "Date Unavailable"}
        </div>
        <div>
          <Link to={`/jobs/${job?._id}`}>
            <button className="bg-mildBlue text-white text-sm rounded-md px-2 py-1 hover:scale-110 hover:bg-darkBlue transition-all duration-500">
              Apply Here
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
