import { z } from 'zod';

export const createSubjectSchema = z.object({
  subjectName: z.string().min(1),
  mentorIds: z.array(z.number()).optional(),
  studentIds: z.array(z.number()).optional(),
});

export const updateSubjectSchema = z.object({
  subjectName: z.string().min(1).optional(),
  mentorIds: z.array(z.number()).optional(),
  studentIds: z.array(z.number()).optional(),
});

export type CreateSubjectDto = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectDto = z.infer<typeof updateSubjectSchema>;
