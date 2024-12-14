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
    location: "",
  });

  console.log(filterData);
  const jobLocation = Array.from(new Set(jobs?.map((job) => job.location)));
  const skillsArray = Array.from(
    new Set(jobs?.flatMap((job) => job.skills || []))
  );

  const handleFilterChange = () => {
    const filteredJobs = jobs.filter((job) => {
      const matchesSkills = filterData.skills.length
        ? filterData.skills.some((skill) => job.skills?.includes(skill))
        : true; // Replace with `.every` if matching all skills is desired

      const matchesJobType = filterData.jobType
        ? job.workType === filterData.jobType
        : true;

      const matchesLocation = filterData.location
        ? job.location === filterData.location
        : true;

      return matchesSkills && matchesJobType && matchesLocation;
    });

    onFilter(filteredJobs); // Pass filtered jobs to parent
  };

  return (
    <div className="border-gray-300 flex items-center rounded-md p-2 space-x-2 justify-center">
      <div className="flex items-center space-x-2">
        <SearchOutlined className="text-mildBlue" />
        <Select
          mode="multiple"
          size="large"
          value={filterData.skills}
          placeholder="Skills"
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, skills: value }))
          }
          options={skillsArray.map((skill) => ({ label: skill, value: skill }))}
          className="min-w-40 max-w-[500px] border-0 border-white"
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
          options={jobLocation.map((location) => ({
            label: location.split(", ")[0],
            value: location,
          }))}
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
