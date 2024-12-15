import { Badge, Checkbox, Radio } from "antd";
import { useState, useEffect } from "react";
import { useJobs } from "../../context/JobsContext";
import { useNavigate, useLocation } from "react-router-dom";

const CheckboxFilter = () => {
  const { jobs, filterJobs, filteredJobs } = useJobs();
  const navigate = useNavigate();
  const location = useLocation();

  const [filterData, setFilterData] = useState({
    workType: null,
    experienceLevel: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilterData({
      workType: params.get("workType"),
      experienceLevel: params.get("experienceLevel"),
    });
  }, [location.search]);

  const experienceData = Array.from(
    new Set(jobs.map((job) => job.experienceLevel))
  );
  const workTypeData = Array.from(new Set(jobs.map((job) => job.workType)));

  const count = new Map();
  workTypeData.forEach((workType) => {
    count.set(workType, 0);
  });
  filteredJobs.forEach((job) => {
    count.set(job.workType, (count.get(job.workType) || 0) + 1);
  });

  const createQueryParams = (newFilterData) => {
    const params = new URLSearchParams(window.location.search);

    Object.entries(newFilterData).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    return params.toString();
  };

  const handleWorkTypeChange = (value, checked) => {
    setFilterData((prev) => ({
      ...prev,
      workType: checked ? value : null,
    }));
  };

  const handleExperienceChange = (value) => {
    setFilterData((prev) => ({
      ...prev,
      experienceLevel: value,
    }));
  };

  const handleFilterChange = () => {
    const queryParams = createQueryParams(filterData);
    filterJobs(queryParams);
    navigate(`?${queryParams}`);
  };

  return (
    <div className="rounded-md bg-white px-5 py-10 grid gap-5">
      {/* Work Mode */}
      <div className="grid gap-2">
        <h1>Work Mode</h1>
        {workTypeData.map((mode) => (
          <div className="flex justify-between" key={mode}>
            <Checkbox
              className="text-gray-500"
              checked={filterData.workType === mode}
              onChange={(e) => handleWorkTypeChange(mode, e.target.checked)}
            >
              {mode}
            </Checkbox>
            <Badge
              count={count.get(mode) || 0}
              color="blue"
              style={{ backgroundColor: "#0052cc" }}
              showZero
            />
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="grid gap-2">
        <h1>Experience</h1>
        <Radio.Group
          value={filterData.experienceLevel}
          onChange={(e) => handleExperienceChange(e.target.value)}
        >
          {experienceData.map((exp) => (
            <Radio className="text-gray-500" value={exp} key={exp}>
              {exp}
            </Radio>
          ))}
        </Radio.Group>
      </div>

      <div>
        <button
          className="bg-darkBlue text-white rounded-md px-3 py-2 w-full"
          onClick={handleFilterChange}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default CheckboxFilter;
