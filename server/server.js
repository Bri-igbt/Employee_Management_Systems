import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leavesRoutes.js";
import payslipRoutes from "./routes/payslipsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Connect Database
await connectDB();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://emstack-delta.vercel.app",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());

// Health Check
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/payslips", payslipRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions,
    })
);

app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});