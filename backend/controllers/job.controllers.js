import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, companyName } = req.body;

    const job = new Job({
      jobTitle,
      jobDescription,
      companyName,
    });

    console.log({
      jobTitle,
      jobDescription,
      companyName,
    });

    if (job) {
      await job.save();

      res.status(201).json({
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        companyName: companyName,
      });
    } else {
      res.status(400).json({ error: "cant post job" });
    }
  } catch (error) {
    console.log("error in posJob controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the job ID is in the request URL parameters

    const job = await Job.findById(id);

    console.log(job);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Error fetching job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the job ID is in the request URL parameters

    const job = await Job.findById(id);

    if (job) {
      job.jobTitle = req.body.jobTitle;
      job.jobDescription = req.body.jobDescription;
      job.companyName = req.body.companyName;

      const updatedJob = await job.save();

      res.json(updatedJob);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the job ID is in the request URL parameters

    const job = await Job.findById(id);

    if (job) {
      await Job.deleteOne(job);
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
