const JobAlert = () => {
  return (
    <div className="bg-blue-50 rounded-md p-5 m-2 grid gap-2 text-sm">
      <h1 className="font-bold">Create Job Alert</h1>
      <p>Create a job alert now and never miss a job</p>
      <input
        type="text"
        placeholder="Enter Job Keyword"
        className="border border-gray-300 rounded-md p-2 text-sm"
      />
      <button className="bg-darkBlue text-white rounded-md px-3 py-2">
        Create Job Alert
      </button>
    </div>
  );
};

export default JobAlert;
