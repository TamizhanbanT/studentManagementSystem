import { NextFunction, Request,Response } from "express";
import * as classService from "../services/class.service";
import  { CreateClassDto, UpdateClassDto } from '../schemas/class.schema';

//create

export const create=async(req:Request,res:Response)=>{
    try{
     const dto:CreateClassDto= req.body;
     const newClass=await classService.createClass(dto);    
     res.status(201).json(newClass)
    }catch(error:any){

        res.status(400).json({
            message:error.message
        })

    }
}

//getall

export const getAll = async (_: Request, res: Response) => {
  try {
    const classes = await classService.getAllClasses();
    res.json(classes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//getclass by id
export const getById = async (req: Request, res: Response) => {
  try {
    const className = parseInt(req.params.className);
    if (!className) return res.status(400).json({ message: 'Invalid className' });
    const singleClass = await classService.getClassbyid(className);
    if (!singleClass) return res.status(404).json({ message: 'Class not found' });
    res.json(singleClass);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


//update class

export const update = async (req: Request, res: Response) => {
  try {
    const className = parseInt(req.params.className);
    if (!className) return res.status(400).json({ message: 'Invalid className' });
    const dto: UpdateClassDto = req.body;
    const updated = await classService.updateClass(className, dto);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

//delete class

export const remove = async (req: Request, res: Response) => {
  try {
    const className = parseInt(req.params.className);
    if (!className) return res.status(400).json({ message: 'Invalid className' });
    await classService.deleteClass(className);
    res.json({ message: 'Class deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};