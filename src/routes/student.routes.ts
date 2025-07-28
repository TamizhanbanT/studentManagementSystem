import {Router} from 'express';
import * as studentController from '../controllers/student.controller';
import { validateStudent,validateStudentUpdate } from '../middlewares/valitateStudent';

const router=Router();

router.post('/',validateStudent,studentController.create)
router.get('/',studentController.getAll)
router.get('/:id',studentController.getById)
router.put('/:id',validateStudent, studentController.update)
router.delete('/:id',studentController.remove)

export default router;
