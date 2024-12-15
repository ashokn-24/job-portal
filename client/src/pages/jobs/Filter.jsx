/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useEffect, useState } from "react";
import {
  SearchOutlined,
  EnvironmentOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const Filter = ({ jobs, onFilter }) => {
  const [filterData, setFilterData] = useState({
    jobType: "",
    skills: [],
    location: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

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

  // Helper to parse query parameters
  const parseQueryParams = (search) => {
    const params = new URLSearchParams(search);
    const parsed = {
      jobType: params.get("jobType") || "",
      skills: params.get("skills") ? params.get("skills").split(",") : [],
      location: params.get("location") || "",
    };
    return parsed;
  };

  const createQueryParams = (filterData) => {
    const params = new URLSearchParams();

    if (filterData?.jobType) {
      params.append("jobType", filterData.jobType);
    }
    if (filterData.skills.length > 0) {
      params.append("skills", filterData.skills.join(","));
    }
    if (filterData?.location) {
      params.append("location", filterData.location);
    }
    return params.toString();
  };

  useEffect(() => {
    // Initialize state from query parameters on mount
    const initialFilters = parseQueryParams(location.search);
    setFilterData(initialFilters);
  }, [location.search]);

  const handleFilterChange = () => {
    const params = createQueryParams(filterData);
    navigate(`?${params}`);
    onFilter(params);
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
            skillsArray.length > 0 &&
            skillsArray.map((skill) => ({ label: skill, value: skill }))
          }
          className="min-w-40 max-w-[500px] border-0 border-white"
        />
      </div>

      <div className="flex items-center space-x-2">
        <EnvironmentOutlined className="text-mildBlue" />
        <Select
          placeholder="Location"
          size="large"
          value={filterData.location}
          onChange={(value) =>
            setFilterData((prev) => ({ ...prev, location: value }))
          }
          options={
            jobLocationArray.length > 0 &&
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
          value={filterData.jobType}
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
