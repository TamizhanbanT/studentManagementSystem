import { Request, Response, NextFunction } from "express";

export const validateRole = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.body;

  if (role !== "student" && role !== "mentor") {
    return res.status(400).json({ message: "Role must be either 'student' or 'mentor'" });
  }

  next();
};
