import mongoSanitize from "express-mongo-sanitize";
import validator from "validator";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const securityMiddlewares = [
  helmet(),

  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
  }),

  mongoSanitize({ replaceWith: "_" }),

  (req, res, next) => {
    if (req.body) {
      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          req.body[key] = validator.escape(req.body[key]);
        }
      }
    }
    next();
  },
];
