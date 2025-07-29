import { Request, Response, NextFunction } from "express";
import { createSubjectSchema, updateSubjectSchema } from "../schemas/subject.schema";
import { ZodError, ZodIssue } from "zod";

// Create 
export const validateSubject = (req: Request, res: Response, next: NextFunction) => {
  try {
   createSubjectSchema.parse(req.body);
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

// Update
export const validateSubjectUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateSubjectSchema.parse(req.body);
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
