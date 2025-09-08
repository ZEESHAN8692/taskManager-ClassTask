import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["a", "u"], // a = admin, u = user
    required: true,
  },
  role:{
    type: String,
    enum:["admin" , "user"],
    required:true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],

  refreshToken: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);    
export default User;

