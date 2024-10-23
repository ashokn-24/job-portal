import { useJobs } from "../../context/JobsContext";

const Applications = () => {
  const { dashboardData } = useJobs();

  const jobs = dashboardData.jobs;

  console.log("jobs", jobs);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 h-[100vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>
      {/* Applicants List */}
      <div className="space-y-4">
        {/* Replace with actual applicant data */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-lg">John Doe</h3>
          <p className="text-gray-600">Applied for: Software Developer</p>
          <p className="text-gray-600">Status: Under Review</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-lg">Jane Smith</h3>
          <p className="text-gray-600">Applied for: Data Analyst</p>
          <p className="text-gray-600">Status: Interview Scheduled</p>
        </div>
      </div>
    </div>
  );
};

export default Applications;
