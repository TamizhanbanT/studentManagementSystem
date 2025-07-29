import { prisma } from '../config/prisma';
import { CreateSubjectDto, UpdateSubjectDto } from '../schemas/subject.schema';

//create

export const createSubject = async (data: CreateSubjectDto) => {
  try {
    return await prisma.subject.create({
      data: {
        subjectName: data.subjectName,
        mentors: data.mentorIds
          ? { connect: data.mentorIds.map(id => ({ id })) }
          : undefined,
        students: data.studentIds
          ? { connect: data.studentIds.map(id => ({ id })) }
          : undefined,
      },
      include: {
        mentors: true,
        students: true,
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

//get all subjects
export const getAllSubjects = async () => {
  try {
    return await prisma.subject.findMany({
      include: {
        mentors: true,
        students: true,
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

//getby id
export const getSubjectById = async (id: number) => {
  try {
    return await prisma.subject.findUnique({
      where: { id },
      include: {
        mentors: true,
        students: true,
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

//update

export const updateSubject = async (id: number, data: UpdateSubjectDto) => {
  try {
    return await prisma.subject.update({
      where: { id },
      data: {
        subjectName: data.subjectName,
        mentors: data.mentorIds
          ? { set: data.mentorIds.map(id => ({ id })) }
          : undefined,
        students: data.studentIds
          ? { set: data.studentIds.map(id => ({ id })) }
          : undefined,
      },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};


//delete

export const deleteSubject = async (id: number) => {
  try {
    return await prisma.subject.delete({
      where: { id },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
