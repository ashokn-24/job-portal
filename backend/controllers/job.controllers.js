import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

export const registerAsEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      gender,
      companyName,
      companyDescription,
      companyWebsite,
      companyAddress,
      companyContactEmail,
      companyPhoneNumber,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    const userProfilePic = `https://avatar.iran.liara.run/${
      gender === "male" ? "boy" : "girl"
    }`;

    const user = new User({
      fullName: name,
      email,
      password: hashedPassword,
      profilePic: userProfilePic,
      role: "employee",
      company: company._id,
    });

    await user.save();

    generateTokensAndSetCookies(user.id, res);

    res.status(201).json({ message: "Employee registered successfully", user });
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
    const { jobTitle, jobDescription, jobType, company } = req.body;

    const job = new Job({
      jobTitle,
      jobDescription,
      type: jobType,
      company,
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
    const jobs = await Job.find({}).populate("company");
    res.json(jobs);
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
