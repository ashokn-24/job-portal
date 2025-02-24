import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

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

export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    const applications = await Application.find({ jobId: jobObjectId })
      .populate("user", "name email")
      .populate("jobId", "jobTitle ");

    if (!applications || applications.length === 0) {
      return res.json({ message: "No applications found" });
    }
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export const getApplicationProfile = async (req, res) => {
  console.log("user application profile");
  try {
    const { id } = req.params;
    console.log(id);
    // const applicationId = new mongoose.Types.ObjectId(jobId);
    const application = await Application.findById(id).populate("user");
    console.log(application);
    if (application) {
      res.status(200).json({
        success: true,
        data: application,
      });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error in get application profile",
      error,
    });
  }
};

// export const getAllApplication = async (req, res) => {
//   try {
//     const { companyId } = req.params;

//     const applications = await Application.find({ company: companyId });

//     res.status(200).json({
//       success: true,
//       data: applications,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    console.log(status);
    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
