import {z} from 'zod';
export const mentorSchema=z.object({
             mentorName:z.string().min(1,"mentor name is required"),
             mentorPhone:z.number().int().min(1000000000,"Invalid phone number").max(9999999999),
             subjects:z.array(z.number().int()).optional(),
             classes: z.array(z.number().int()).optional(),
})

export const updateMentorSchema = mentorSchema.partial();

export type CreateMentorDto = z.infer<typeof mentorSchema>;
export type UpdateMentorDto = z.infer<typeof updateMentorSchema>;