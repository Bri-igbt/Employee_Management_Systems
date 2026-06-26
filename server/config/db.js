import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected");

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB Error:", err);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
};

export default connectDB;