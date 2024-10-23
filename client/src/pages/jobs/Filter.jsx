/* eslint-disable react/prop-types */
import { useState } from "react";

const Filter = ({ jobs, onFilter }) => {
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState([]);
  const [company, setCompany] = useState("");

  const handleFilterChange = () => {
    // Call the filtering function passed as a prop
    const filteredJobs = jobs?.filter((job) => {
      return (
        (jobType === "" || job?.jobType === jobType) &&
        (skills.length === 0 ||
          skills.every((skill) => job?.skills.includes(skill))) &&
        (company === "" || job?.company === company)
      );
    });
    onFilter(filteredJobs);
  };

  return (
    <div>
      <h3>Filter Jobs</h3>

      {/* Job Type Filter */}
      <label>Job Type:</label>
      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="">All</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
      </select>

      {/* Skills Filter */}
      <label>Skills:</label>
      <input
        type="text"
        placeholder="Enter skills (comma separated)"
        onChange={(e) => setSkills(e.target.value.split(","))}
      />

      {/* Company Filter */}
      <label>Company:</label>
      <select value={company} onChange={(e) => setCompany(e.target.value)}>
        <option value="">All</option>
        <option value="670e2eff32313cf9ace4102a">Company A</option>
        <option value="670e2eff32313cf9ace4102b">Company B</option>
      </select>

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filter;
