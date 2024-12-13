import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";

export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;

    const existingApplication = await Application.findOne({
      jobId: id,
      user: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        error: "You have already applied for this job.",
      });
    }

    const application = new Application({
      jobId: id,
      user: req.user.id,
      status: "Applied",
    });

    await application.save();

    res.status(200).json({
      message: "You have successfully applied for the job.",
      data: application,
    });
  } catch (error) {
    console.log(error);
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
