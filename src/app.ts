import express from 'express';
import studentRoutes from "../src/routes/student.routes";
import classRoutes from '../src/routes/class.routes'
const port =3000
const app=express();
app.use(express.json());

app.use('/api/students',studentRoutes);
app.use('/api/classes', classRoutes);

app.listen(port , ()=>{
    console.log(`server running on port ${port}` )
})