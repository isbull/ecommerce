import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { securityMiddlewares } from "./middlewares/security.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));

app.use(securityMiddlewares);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
