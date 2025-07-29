
import { Request, Response, NextFunction } from "express";
import { mentorSchema, updateMentorSchema } from "../schemas/mentor.schema";
import { ZodError, ZodIssue } from "zod";

// Create
export const validateMentor = (req: Request, res: Response, next: NextFunction) => {
  try {
    mentorSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((issue: ZodIssue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Validation Failed",
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//  Update
export const validateMentorUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateMentorSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((issue: ZodIssue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Validation Failed",
        errors: formattedErrors,
      });
    }

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
