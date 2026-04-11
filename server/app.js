import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize({ replaceWith: "_" }));
app.use(xss());

app.use("/api/auth", authRoutes);
app.use("/api/auth/login", loginLimiter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
