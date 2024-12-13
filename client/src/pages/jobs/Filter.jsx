/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useState } from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  GiftOutlined,
} from "@ant-design/icons";

const Filter = ({ jobs, onFilter }) => {
  const [filterData, setFilterData] = useState({
    jobType: "",
    skills: [],
  });

  console.log(jobs);

  const jobLocation = new Set();
  const skills = new Set();

  jobs.forEach((job) => {
    jobLocation.add(job.location);
    job.skills.forEach((skill) => {
      skills.add(skill);
    });
  });

  const jobLocationArray = Array.from(jobLocation);
  const skillsArray = Array.from(skills);

  console.log(filterData);

  const handleFilterChange = () => {
    const filteredJobs = jobs?.filter((job) => {
      return (
        (filterData.jobType === "" || job?.jobType === filterData.jobType) &&
        (filterData.skills.length === 0 ||
          filterData.skills.every((skill) => job?.skills.includes(skill)))
      );
    });
    console.log(filteredJobs);
    onFilter(filteredJobs);
  };

  return (
    <div className=" border-gray-300 flex items-center rounded-md p-2 space-x-2 justify-center">
      <div className="flex items-center space-x-2 ">
        <SearchOutlined className="text-mildBlue" />
        <Select
          mode="multiple"
          size="large"
          value={filterData.skills}
          placeholder="Skills"
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, skills: value }))
          }
          options={
            skillsArray.length > 1 &&
            skillsArray.map((skill) => ({ label: skill, value: skill }))
          }
          className="w-40 border-0 border-white -full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <EnvironmentOutlined className="text-mildBlue" />
        <Select
          placeholder="Location"
          size="large"
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, location: value }))
          }
          options={
            jobLocationArray.length > 1 &&
            jobLocationArray.map((location) => ({
              label: location.split(", ")[0],
              value: location,
            }))
          }
          className="w-40"
        />
      </div>

      <div className="flex items-center space-x-2">
        <GiftOutlined className="text-mildBlue" />
        <Select
          placeholder="Job Type"
          size="large"
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, jobType: value }))
          }
          options={[
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Internship", value: "Internship" },
          ]}
          className="w-40"
        />
      </div>

      {/* <div className="flex items-center space-x-2">
        <DollarOutlined className="text-mildBlue" />
        <Select
          placeholder="Salary Range"
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, salaryRange: value }))
          }
          className="w-40"
        />
      </div> */}

      <button
        onClick={handleFilterChange}
        className="bg-darkBlue p-2 px-4 rounded-md text-white font-medium"
      >
        Find Job
      </button>
    </div>
  );
};

export default Filter;
