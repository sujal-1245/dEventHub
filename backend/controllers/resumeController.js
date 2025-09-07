import Resume from "../models/Resume.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

// Upload resume
export const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const resume = await Resume.create({
    user: req.user._id,
    filename: req.file.originalname,
    filepath: req.file.path,
  });

  // Add resume reference to user
  await User.findByIdAndUpdate(req.user._id, { $push: { resumes: resume._id } });

  res.status(201).json(resume);
};

// Get user resumes
export const getUserResumes = async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id });
  res.json(resumes);
};
