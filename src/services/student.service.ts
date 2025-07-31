import { prisma } from '../config/prisma';
import { CreateStudentDto , UpdateStudentDto } from '../schemas/student.schema';

//create student

export const createStudent=async (data:CreateStudentDto)=>{
    try{
        if(!data.studentName || !data.parentName || !data.parentPhone ||!data.address || !data.pincode ||!data.className){
            throw new Error ("Missing required student fields");
        }
        return await prisma.student.create({
            data:{
                ...data,
                subjects: data.subjects?{
                    connect:data.subjects.map(id=>({id}))
                }:undefined
            },
            include:{
                class:true,
                mentor:true,
                subjects:true
            },
        })

    }catch(err){

        throw new Error("Error Creating student : " + err)

    };

};

//getAll students

export const getAllStudents=async ()=>{
    try{

        return await prisma.student.findMany({
            include:{
                class:true,
                subjects:true,
                mentor:true
            }
        })

    }catch(err){


        throw new Error ("Error fetching Students:"+ err)
    };
}
 

//getStudentById

export const getStudentById=async (id:number)=>{

    try{

        if(!id) throw new Error ("Invalid Id")
            return await prisma.student.findUnique({
        where:{id},
        include:{
            class:true,
            subjects:true,
            mentor:true
        }
},
    )
    }catch(err){

        throw new Error ("Error fetching Student: " + err);

    }

};

// export const updateStudent =async(id:number, data:UpdateStudentDto)=>{
//     try{

//         if(!id) throw new Error ("Invalid Id");
//         return await prisma.student.update({
//             where:{id},
//             data:{},
//             include:{
//                 class:true,
//                 mentor:true,
//                 subjects:true
//             }
//         })
//     }catch(err){

//         throw new Error ("Error Fetching Student:" + err)


//     }
// } 

//update
export const updateStudent = async (id: number, data: Partial<UpdateStudentDto>) => {
  try {
    if (!id) throw new Error("Invalid Id");

    return await prisma.student.update({
      where: { id },
      data: {
        ...data,
        subjects: data.subjects
          ? {
              set: data.subjects.map((id) => ({ id })),
            }
          : undefined
      },
      include: {
        class: true,
        mentor: true,
        subjects: true
      }
    });
  } catch (err) {
    throw new Error("Error Updating Student: " + err);
  }
};

//delete  

export const deleteStudent= async(id:number)=>{

    try{

        if(!id) throw new Error ("Invalid Id")
    }catch(err){
throw new Error ("Error Deleting Student: "+ err)

    }

}