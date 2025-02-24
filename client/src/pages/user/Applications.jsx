import ApplicationCard from "../../components/ApplicationCard";
import { useState } from "react";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      {/* <div className="mb-4 w-full flex justify-between items-center px-10">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div> */}
      <div>
        <h1 className="font-bold text-2xl py-2">My Applications</h1>
      </div>
      <div className="grid gap-4 justify-center w-full px-10">
        {/* Assuming ApplicationCard component can accept props for search and filter */}
        <ApplicationCard searchTerm={searchTerm} filter={filter} />
      </div>
    </div>
  );
};

export default Applications;
