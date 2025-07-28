import express from 'express';
import studentRoutes from "../src/routes/student.routes";
const port =3000
const app=express();
app.use(express.json());

app.use('/api/students',studentRoutes);

app.listen(port , ()=>{
    console.log(`server running on port ${port}` )
})