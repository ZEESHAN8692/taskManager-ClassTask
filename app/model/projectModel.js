import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // admin
    required: true,
  },
  assignedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  status: {
    type: String,
    enum: ["on-going", "almost end", "finished"],
    default: "on-going",
  },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
