import express from 'express';
import cors from 'cors';
import "dotenv/config";
import multer from 'multer';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import leaveRoutes from './routes/leavesRoutes.js';
import payslipRoutes from './routes/payslipsRoutes.js';


const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());
app.use(multer().none());

// Routes
app.get("/", (req, res) => res.send("Server is running"))
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/payslips", payslipRoutes);



await connectDB();
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))