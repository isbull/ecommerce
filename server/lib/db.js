import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting MONGODB:", error.message);
    process.exit(1);
  }
};
