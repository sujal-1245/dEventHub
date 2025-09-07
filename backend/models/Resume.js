import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    filepath: { type: String, required: true },
    parsedData: { type: Object }, // JSON of extracted resume info
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
