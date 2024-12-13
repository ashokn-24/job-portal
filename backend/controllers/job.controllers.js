import mongoose from "mongoose";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerAsEmployee = async (req, res) => {
  try {
    const {
      email,
      companyName,
      companyDescription,
      companyWebsite,
      companyAddress,
      companyContactEmail,
      companyPhoneNumber,
    } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: "Company name is required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.role === "employee") {
        return res
          .status(400)
          .json({ error: "User is already registered as an employee." });
      }

      let company = await Company.findOne({ name: companyName });
      if (!company) {
        company = new Company({
          name: companyName,
          description: companyDescription,
          website: companyWebsite,
          address: companyAddress,
          contactEmail: companyContactEmail,
          phoneNumber: companyPhoneNumber,
        });
        await company.save();
      }

      existingUser.role = "employee";
      existingUser.company = company._id;

      await existingUser.save();
      generateTokensAndSetCookies(existingUser.id, res);

      return res.status(200).json({
        message: "User updated to employee successfully",
        user: existingUser,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      let company = await Company.findOne({ name: companyName });
      if (!company) {
        company = new Company({
          name: companyName,
          description: companyDescription,
          website: companyWebsite,
          address: companyAddress,
          contactEmail: companyContactEmail,
          phoneNumber: companyPhoneNumber,
        });
        await company.save();
      }

      const user = new User({
        fullName: req.body.name,
        email,
        password: hashedPassword,
        role: "employee",
        company: company._id,
      });

      await user.save();
      generateTokensAndSetCookies(user.id, res);

      res
        .status(201)
        .json({ message: "Employee registered successfully", user });
    }
  } catch (error) {
    console.log("Error in registerAsEmployee controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const getEmpProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("company");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      company: user.company,
    });
  } catch (error) {
    console.log("Error in postJob controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const postJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      jobType,
      company,
      workType,
      location,
      industry,
      experienceLevel,
      salaryPeriod,
      salaryAmount,
      unStipend,
      skills,
    } = req.body;

    const salaryRange = unStipend
      ? "UnStipend"
      : `${salaryAmount} ${salaryPeriod}`;

    const job = new Job({
      jobTitle,
      jobDescription,
      jobType,
      industry,
      experienceLevel,
      skills,
      salaryRange,
      workType,
      location,
      company: new mongoose.Types.ObjectId(company),
    });

    if (job) {
      await job.save();
      res.status(201).json(job);
    } else {
      res.status(400).json({ error: "Can't post job" });
    }
  } catch (error) {
    console.log("Error in postJob controller", error);
    res.status(500).json({ error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const { jobType, workType, location, experienceLevel, skills } = req.query;

    const jobs = await Job.find({}).populate("company");
    let filteredJobs = jobs;

    if (jobType) {
      filteredJobs = filteredJobs.filter((job) => job.type === jobType);
    }

    if (workType) {
      filteredJobs = filteredJobs.filter((job) => job.type === workType);
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) => job.location === location);
    }
    if (experienceLevel) {
      filteredJobs = filteredJobs.filter(
        (job) => job.experienceLevel === experienceLevel
      );
    }

    if (skills) {
      const skillsArray = skills.split(",");
      filteredJobs = filteredJobs.filter((job) =>
        skillsArray.every((skill) => job.skills.includes(skill))
      );
    }

    res.json(filteredJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id).populate("company");

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

export const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, jobDescription, type, skills } = req.body;

    const updatedJob = {
      jobTitle,
      jobDescription,
      type,
      skills,
    };

    const updateJob = await Job.findByIdAndUpdate(id, updatedJob, {
      new: true,
    });

    if (!updateJob) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.status(200).json({
      success: true,
      data: updateJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

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
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (job) {
      await Job.deleteOne({ _id: id });
      res.status(200).json({ message: "Job deleted successfully" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
