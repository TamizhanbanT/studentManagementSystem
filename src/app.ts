import express from 'express';
import studentRoutes from "../src/routes/student.routes";
import classRoutes from '../src/routes/class.routes';
import mentorRoutes from './routes/mentor.routes';
import subjectRoutes from './routes/subject.routes'
const port =3000
const app=express();
app.use(express.json());

app.use('/api/students',studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/subjects', subjectRoutes);

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

app.listen(port , ()=>{
    console.log(`server running on port ${port}` )
})