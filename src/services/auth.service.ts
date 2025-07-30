import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (role: string, name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "student") {
    const existing = await prisma.student.findUnique({ where: { email } });
    if (existing) throw new Error("Student already exists");

    await prisma.student.create({
      data: {
        studentName: name,
        email,
        password: hashedPassword,
        role: "student"
      }
    });

  } else if (role === "mentor") {
    const existing = await prisma.mentor.findUnique({ where: { email } });
    if (existing) throw new Error("Mentor already exists");

    await prisma.mentor.create({
      data: {
        mentorName: name,
        email,
        password: hashedPassword,
        role: "mentor"
      }
    });
  }
};

export const loginUser = async (role: string, email: string, password: string) => {
  let user: any;

  if (role === "student") {
    user = await prisma.student.findUnique({ where: { email } });
  } else if (role === "mentor") {
    user = await prisma.mentor.findUnique({ where: { email } });
  }

  if (!user || !user.password) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password");

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET as string, {
    expiresIn: "1d"
  });

  return token;
};
