import { Request , Response } from "express";
import * as studentService from '../services/student.service'
import { CreateStudentDto, UpdateStudentDto } from "../schemas/student.schema";

//create
export const create=async(req:Request,res:Response)=>{
try{
    const dto: CreateStudentDto=req.body;
    console.log(dto)
    const student=await studentService.createStudent(dto);
    res.status(201).json(student);

}catch(error:any){
    res.status(400).json({message:error.message})
}
};

//getAll

export const getAll=async(_:Request, res:Response)=>{
try{
const students=await studentService.getAllStudents();
res.json(students);
}catch(error:any){
res.status(500).json({message:error.message})
}
};

//getById

export const getById=async(req:Request, res:Response)=>{
try{
const id=parseInt(req.params.id);
if(!id) return res.status (400).json({message:"Invalid Id"});
const student= await studentService.getStudentById(id);
if(!student)return res.status(404).json({message:"Student Not Found"})
res.json(student)
}catch(error:any){

}
}

//update

export const update=async(req:Request, res:Response)=>{
try{
const id= parseInt(req.params.id);
if(!id) return res.status(400).json({message:"invalid Id"});
const dto:UpdateStudentDto=req.body;
const updated=await studentService.updateStudent(id,dto);
res.json(updated);

}catch(error:any){
res.status(400).json({message:error.message});
}
};

//delete

export const remove = async (req:Request,res:Response)=>{
try{

    const id=parseInt(req.params.id);
    if(!id) return res.status(400).json({message:"Invalid Id "})

    await studentService.deleteStudent(id);
}catch(error:any){
res.status(400).json({message:error.message})
}
};


