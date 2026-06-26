import bcrypt from 'bcrypt'
import User from "../models/User.js";
import jwt from "jsonwebtoken"

// login for employee and admin
// POST /api/auth/login

export const login = async (req, res) => {
    try {
        const {email, password, role_type} = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "Email and password are required"})
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({ error: "Invalid credentials"});
        }
        
        if(role_type === "admin" && user.role !== "ADMIN"){
            return res.status(401).json({ error: "Not authorized as admin"});
        }

        if(role_type === "employee" && user.role !== "EMPLOYEE"){
            return res.status(401).json({ error: "Not authorized as employee" });
        }

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) {
            return res.status(401).json({ error: "Invalid credentials"})
        }

        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d"})
        return res.json({ user: payload, token});

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Login failed"})
    }
}

// Get session for employee and admin
// GET /api/auth/session
export const session = async (req, res) => {
    const session = req.session;
    return res.json({user: session})
}

// Change password for employee and admin
// POST /api/auth/change-password
export const changePassword = async (req, res) => {
    try {
        const session = req.session;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "Both passwords are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                error: "New password must be at least 6 characters long",
            });
        }

        const user = await User.findById(session.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        const isValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                error: "Current password is incorrect",
            });
        }

        const samePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (samePassword) {
            return res.status(400).json({
                success: false,
                error: "New password must be different from the current password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });

    } catch (error) {
        console.error("Change password error:", error);

        return res.status(500).json({
            success: false,
            error: "Failed to change password",
        });
    }
};