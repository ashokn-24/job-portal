import { Badge, Checkbox } from "antd";
import { useJobs } from "../../context/JobsContext";

const CheckboxFilter = () => {
  const { jobs } = useJobs();

  let count = new Map();

  jobs.forEach((job) => {
    if (count.has(job.workType)) {
      count.set(job.workType, count.get(job.workType) + 1);
    } else {
      count.set(job.workType, 1);
    }
  });
  return (
    <div className=" h-fit px-2  py-5 flex flex-col gap-6 text-gray-500">
      <div className="bg-blue-50 rounded-md p-5 m-2 grid gap-2 text-sm">
        <h1 className="font-bold">Create Job Alert</h1>
        <p> Create a job alert now and never miss a job</p>
        <input
          type="text"
          placeholder="Enter Job Keyword"
          className="border-0 rounded-md p-2 text-sm"
        />
        <button className="bg-darkBlue text-white rounded-md px-3 py-2">
          Create Job Alert
        </button>
      </div>

      <div className="rounded-md bg-white px-5 py-10 grid gap-5">
        <div className="grid gap-2">
          <h1>Work Mode</h1>
          <div className="flex justify-between">
            <Checkbox className="text-gray-500">Onsite</Checkbox>
            <Badge count={count.get("Onsite")} color="bg-darkBlue" />
          </div>
          <div className="flex justify-between">
            <Checkbox className="text-gray-500">Work From Home</Checkbox>
            <Badge count={count.get("Work From Home")} color="bg-darkBlue" />
          </div>
          <div className="flex justify-between">
            <Checkbox className="text-gray-500">Hybrid</Checkbox>
            <Badge count={count.get("Hybrid")} color="bg-darkBlue" />
          </div>
        </div>
        <div className="grid gap-2">
          <h1>Experience</h1>
          <div>
            <Checkbox className="text-gray-500">Fresher</Checkbox>
          </div>
          <div>
            <Checkbox className="text-gray-500">1+ year</Checkbox>
          </div>
          <div>
            <Checkbox className="text-gray-500">3+ year</Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxFilter;
