import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as mentorService from '../services/mentor.service';
import { CreateMentorDto, UpdateMentorDto } from '../schemas/mentor.schema';
import { rmSync } from 'fs';

//create

// export const create = async (req: Request, res: Response) => {
//   try {
//     const dto: CreateMentorDto = req.body;
//     const mentor = await mentorService.createMentor(dto);
//     res.status(201).json(mentor);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const create=async(req:AuthRequest, res:Response)=>{
  try{
    if(req.user?.role!=='mentor'){
      return res.status(403).json({
        message:"Access Denied"
      })
    }
    const dto:CreateMentorDto=req.body;
    const mentor= await mentorService.createMentor(dto);
    res.status(201).json(mentor);

  }catch(error:any){

    res.status(400).json({message:error.message})

  }
};

//getall

// export const getAll = async (_: Request, res: Response) => {
//   try {
//     const mentors = await mentorService.getAllMentors();
//     res.json(mentors);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getAll =async(req:AuthRequest,res:Response)=>{
  try{

  if(req.user?.role!=='mentor'){
    return res.status(403).json({message:"Access Denied"})
  }
  const mentors=await mentorService.getAllMentors();
    res.json(mentors)
  }catch(error:any){
    
    res.status(500).json({message:error.message})
  }
}

//getbyId

// export const getById = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) return res.status(400).json({ message: 'Invalid ID' });
//     const mentor = await mentorService.getMentorById(id);
//     if (!mentor) return res.status(404).json({ message: 'Mentor not found' });
//     res.json(mentor);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getById=async(req:AuthRequest,res:Response)=>{
  try{
    if(req.user?.role !=='mentor'){
      return res.status(403).json({message:"Invalid Id"})
    }
    const id=parseInt(req.params.id);
    if(!id) return res.status(400).json({message:"Invalid Id"})
      const mentor=await mentorService.getMentorById(id);
    if(!mentor) return res.status(404).json({message:"Mentor Not Found"})
  res.json(mentor)
  }catch(error:any){
    res.status(500).json({message:error.message})

  }
}

//update

// export const update = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     const dto: UpdateMentorDto = req.body;
//     const updated = await mentorService.updateMentor(id, dto);
//     res.json(updated);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const update=async(req:AuthRequest,res:Response)=>{
  try{
if(req.user?.role!=='mentor'){
  res.status(403).json({message:"Access Denied"});
}
const id=parseInt(req.params.id)
const dto:UpdateMentorDto=req.body;
const updated=await mentorService.updateMentor(id,dto);
res.json(updated);
  }catch(error:any){
res.status(400).json({message:error.message})
  }
};

//delete

// export const remove = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     await mentorService.deleteMentor(id);
//     res.json({ message: 'Mentor deleted successfully' });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const remove=async(req:AuthRequest,res:Response)=>{
  try{
if(req.user?.role!=="mentor"){
  res.status(403).json({message:"Access Denied"})
}
const id =parseInt(req.params.id);
await mentorService.deleteMentor(id);
res.json({message:"Mentor deleted successfully"})
  }catch(error:any){
    res.status(400).json({message:error.message})
  }
}
