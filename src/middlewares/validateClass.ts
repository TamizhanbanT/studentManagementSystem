import { Request,Response,NextFunction } from "express";
import { classSchema,updateClassSchema } from "../schemas/class.schema";
import { ZodError, ZodIssue } from "zod";


//validate class creation

export const validateClass=(req:Request , res:Response ,next:NextFunction)=>{
    try{
classSchema.parse(req.body);
next();
    }catch(error){

        if (error instanceof ZodError){
            const formattedErrors= error.issues.map((issue:ZodIssue)=>({
                path:issue.path.join("."),
                message:issue.message
            }));

            return res.status(400).json({
                message:"Validation Failed",
                errors:formattedErrors,
            });
        }
        return res.status(500).json({
            message:"Internal Server Error"
        })

    }
}

//validate class Update

export const ValidateClassUpdate=(req:Request,res:Response,next:NextFunction)=>{
    try{

    updateClassSchema.parse(req.body);
    next();
    }catch(error){
if(error instanceof ZodError){
    const formattedErrors=error.issues.map((issue:ZodIssue)=>({
       path:issue.path.join('.'),
       message:issue.message
    }));
    return res.status(400).json({
        message:"Validation Failed",
        errors:formattedErrors
    })
}
return res.status(500).json({
    message:"Internal server Error"
})
        
    }
}