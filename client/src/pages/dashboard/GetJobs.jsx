import { Spin } from "antd";
import JobCard from "../../components/JobCard";
import { useJobs } from "../../context/JobsContext";
import DashBoardJobs from "../../components/DashBoardJobs";

const GetJobs = () => {
  const { dashboardData, loading } = useJobs();

  const jobs = dashboardData?.jobs || [];

  const sortedJobs = jobs.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 h-[100vh] overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Your Job Posts</h2>
      <div className="space-y-4">
        {sortedJobs.length > 0 ? (
          sortedJobs.map((job) => <DashBoardJobs job={job} key={job?._id} />)
        ) : (
          <p>No job posts available.</p> // Handle empty jobs array
        )}
      </div>
    </div>
  );
};

export default GetJobs;
