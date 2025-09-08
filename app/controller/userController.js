import User from "../model/userModel.js";
import Project from "../model/projectModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, userType: user.userType }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

class UserController {

    async loginGet(req, res) {
        res.render("user/login");
    }
    async registerUserGet(req, res) {
        res.render("user/register");
    }
    async registerAdminGet(req, res) {
        res.render("admin/admin-register");
    }

    async userDashboard(req, res) {
        if (req.user.userType !== "u") return res.send("Access Denied");

        const projects = await Project.find({ assignedUsers: req.user.id });

        res.render("user/dashboard", { user: req.user, projects });
    }

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, email, password: hashedPassword, userType: "u", role: "user" });
            await user.save();

            res.redirect("/login");

        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async registerAdmin(req, res) {
        try {
            const { name, email, password } = req.body;
            const existingAdmin = await User.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new User({ name, email, password: hashedPassword, userType: "a", role: "admin" });
            await admin.save();

            res.redirect("/login");

        } catch (error) {
            console.error("Error registering admin:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie("accessToken", accessToken, { httpOnly: true });
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            if (user.userType === "a") {
                res.redirect("/admin/dashboard");
            } else {
                res.redirect("/dashboard");
            }


        } catch (error) {
            res.status(500).json({ message: "Server error" });
            console.error("Error during login:", error);
        }
    }

    async logout(req, res) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.redirect("/login");
    }

}

export default new UserController();