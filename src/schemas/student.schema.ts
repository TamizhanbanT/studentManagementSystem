import {z} from "zod";

export const studentSchema=z.object({
    studentName:z.string().min(1),
    parentName:z.string().min(1),
    parentPhone:z.number().int().min(1000000000),
    address:z.string().min(1),
    pincode:z.number().int().min(100000),
    className:z.number().int(),
    mentorId:z.number().int().optional(),
    fees:z.number().int().optional(),
    marks:z.number().int().optional(),
    todaysUpdate:z.string().optional(),
    subjects:z.array(z.number().optional( ))
})

export const updateStudentSchema=studentSchema.partial()

export type CreateStudentDto=z.infer<typeof studentSchema>
export type UpdateStudentDto=z.infer<typeof updateStudentSchema>