import { message } from "antd";
import { useState } from "react";

const JobAlert = () => {
  const [jobKeyword, setJobKeyword] = useState("");

  const handleAlert = () => {
    if (jobKeyword.trim() === "") {
      message.error("Please enter a job keyword!");
    } else {
      message.success(`Job alert for "${jobKeyword}" created successfully!`);
    }
    setJobKeyword("");
  };

  return (
    <div className="bg-blue-50 rounded-md p-5 m-2 grid gap-2 text-sm">
      <h1 className="font-bold">Create Job Alert</h1>
      <p>Create a job alert now and never miss a job</p>
      <input
        type="text"
        placeholder="Enter Job Keyword"
        className="border border-gray-300 rounded-md p-2 text-sm"
        value={jobKeyword}
        onChange={(e) => setJobKeyword(e.target.value)}
      />
      <button
        className="bg-darkBlue text-white rounded-md px-3 py-2"
        onClick={handleAlert}
      >
        Create Job Alert
      </button>
    </div>
  );
};

export default JobAlert;
