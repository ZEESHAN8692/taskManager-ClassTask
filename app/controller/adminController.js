import Project from "../model/projectModel.js"
import User from "../model/userModel.js";


class AdminController {
    async dashboard(req, res) {
        if (req.user.userType !== "a") return res.send("Access Denied");

        const projects = await Project.find().populate("assignedUsers", "name email");
        const users = await User.find({ userType: "u" });
        res.render("admin/dashboard", { user: req.user, projects, users });
    }

    async createProject(req, res) {
        if (req.user.userType !== "a") return res.send("Access Denied");

        const { name } = req.body;
        const project = new Project({
            name,
            createdBy: req.user.id
        });

        await project.save();
        res.redirect("/admin/dashboard");
    }

    async assignProject(req, res) {
        if (req.user.userType !== "a") return res.send("Access Denied");

        const { projectId, userId } = req.body;
        const project = await Project.findById(projectId);
        if (!project) return res.send("Project not found");

        project.assignedUsers.push(userId);
        await project.save();

        res.redirect("/admin/dashboard");
    }

    async updateProjectStatus(req, res) {
        if (req.user.userType !== "a") return res.send("Access Denied");

        const { projectId, status } = req.body;
        await Project.findByIdAndUpdate(projectId, { status });
        res.redirect("/admin/dashboard");
    }


}

export default new AdminController();