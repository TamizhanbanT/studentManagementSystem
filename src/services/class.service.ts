import { prisma } from '../config/prisma';
import { CreateClassDto,UpdateClassDto } from '../schemas/class.schema';

//create class

export const createClass=async (data:CreateClassDto)=>{
try{

    return await prisma.class.create({
        data,
        include:{
            students:true,
            mentors:true
        }

    });

}catch(err){
throw new Error("Error creating class:" + err);
}

};

//getAll class

export const getAllClasses=async()=>{
   try{
    return await prisma.class.findMany({
        include:{
            students:true,
            mentors:true,
        }
    });

   }catch(err){
throw new Error ("Error Fetching classes:"+ err)
   } 
}

//getClassbyid 

export const getClassbyid =async(className:number)=>{
try{
    return await prisma.class.findUnique({
        where:{className},
        include:{
            students:true,
            mentors:true
        }
    })

}catch(err){
throw new Error ("Error Fetching class" + err)

}
};

//updateClass

export const updateClass=async(className:number, data:UpdateClassDto)=>{
    try{
    return await prisma.class.update({
        where:{className},
        data
    })
    }catch(err){
        throw new Error("Error updating class")

    }
}

//deleteClass

export const deleteClass=async(className:number)=>{
    try{
return await prisma.class.delete({
    where:{
    className
    }
})
    }catch(err){
throw new Error("Error deleting Class")
    }
}