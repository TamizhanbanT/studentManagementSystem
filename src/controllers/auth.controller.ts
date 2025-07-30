import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";


export const handleRegister = async (req: Request, res: Response) => {
  const { role, name, email, password } = req.body;

  try {
    await registerUser(role, name, email, password);
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  const { role, email, password } = req.body;

  try {
    const token = await loginUser(role, email, password);
    res.json({ token, role });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

