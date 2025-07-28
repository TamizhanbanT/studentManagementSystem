import { Request, Response, NextFunction } from "express";
import { studentSchema, updateStudentSchema } from "../schemas/student.schema";
import { ZodError, ZodIssue } from "zod";

// Validate student creation
export const validateStudent = (req: Request, res: Response, next: NextFunction) => {
  try {
    studentSchema.parse(req.body);
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

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Validate student update
export const validateStudentUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateStudentSchema.parse(req.body);
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

    return res.status(500).json({ message: "Internal Server Error" });
  }
};
