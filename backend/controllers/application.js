import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existingApplication = await Application.findOne({
      jobId: id,
      user: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        status: "error",
        error: "You have already applied for this job.",
      });
    }

    const application = new Application({
      jobId: id,
      user: req.user.id,
      status: "Applied",
    });

    await application.save();

    const populatedApplication = await application.populate("jobId");

    res.status(200).json({
      status: "success",
      message: "You have successfully applied for the job.",
      data: populatedApplication,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate({
      path: "jobId",
      select: "jobTitle company",
      populate: {
        path: "company",
        model: "Company",
        select: "name description",
      },
    });

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getApplicationByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const jobs = await Job.find({ company: companyId }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId")
      .populate("user")
      .exec();

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
