import { prisma } from '../config/prisma';
import { CreateMentorDto, UpdateMentorDto } from '../schemas/mentor.schema';

// create Mentor
export const createMentor = async (data: CreateMentorDto) => {
  try {
    return await prisma.mentor.create({
      data: {
        mentorName: data.mentorName,
        mentorPhone: data.mentorPhone,
        subjects: data.subjects
          ? { connect: data.subjects.map((id) => ({ id })) }
          : undefined,
        classes: data.classes
          ? { connect: data.classes.map((className) => ({ className })) }
          : undefined,
      },
      include: {
        subjects: true,
        classes: true,
        students: true,
      },
    });
  } catch (error) {
    throw new Error(`Failed to create mentor: ${error}`);
  }
};

//  Get All Mentors
export const getAllMentors = async () => {
  try {
    return await prisma.mentor.findMany({
      include: {
        subjects: true,
        classes: true,
        students: true,
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch mentors: ${error}`);
  }
};

//  Get Mentor By ID
export const getMentorById = async (id: number) => {
  try {
    return await prisma.mentor.findUnique({
      where: { id },
      include: {
        subjects: true,
        classes: true,
        students: true,
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch mentor with ID ${id}: ${error}`);
  }
};

// update
export const updateMentor = async (id: number, data: UpdateMentorDto) => {
  try {
    return await prisma.mentor.update({
      where: { id },
      data: {
        mentorName: data.mentorName,
        mentorPhone: data.mentorPhone,
        subjects: data.subjects
          ? { set: data.subjects.map((id) => ({ id })) }
          : undefined,
        classes: data.classes
          ? { set: data.classes.map((className) => ({ className })) }
          : undefined,
      },
    });
  } catch (error) {
    throw new Error(`Failed to update mentor with ID ${id}: ${error}`);
  }
};

//  delete
export const deleteMentor = async (id: number) => {
  try {
    return await prisma.mentor.delete({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to delete mentor with ID ${id}: ${error}`);
  }
};
