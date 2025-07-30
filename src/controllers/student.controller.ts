import { Request, Response } from "express";
import * as studentService from "../services/student.service";
import { CreateStudentDto, UpdateStudentDto } from "../schemas/student.schema";
import { AuthRequest } from "../middlewares/auth.middleware";

// Create - allow only mentor to create student
export const create = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can create students" });
    }

    const dto: CreateStudentDto = req.body;
    const student = await studentService.createStudent(dto);
    res.status(201).json(student);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get All - allow only mentor

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can view all students" });
    }

    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get by ID - allow only student to view their own data

export const getById = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid Id" });

    if (req.user?.role !== "student") {
      return res.status(403).json({ message: "Only students can access their data" });
    }

    const student = await studentService.getStudentById(id);
    if (!student) return res.status(404).json({ message: "Student Not Found" });

    res.json(student);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update - allow only mentor to update student data
export const update = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can update students" });
    }

    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid Id" });

    const dto: UpdateStudentDto = req.body;
    const updated = await studentService.updateStudent(id, dto);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete - allow only mentor
export const remove = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== "mentor") {
      return res.status(403).json({ message: "Only mentors can delete students" });
    }

    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "Invalid Id" });

    await studentService.deleteStudent(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
