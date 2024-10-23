import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const getJobsByCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const jobs = await Job.find({ company: id });

    res.status(200).json({
      company,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs by Company:", error);
    res.status(500).json({ message: "Error fetching job" });
  }
};
