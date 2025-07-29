import {z} from 'zod';


export const classSchema=z.object({
    className: z.number().int().min(1)
})

export const updateClassSchema= classSchema.partial();

export type CreateClassDto= z.infer<typeof classSchema>;
export type UpdateClassDto= z.infer<typeof updateClassSchema>