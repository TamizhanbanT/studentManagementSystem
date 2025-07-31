import {Router} from 'express';
import * as studentController from '../controllers/student.controller';
import { validateStudent,validateStudentUpdate } from '../middlewares/valitateStudent';
import { verifyToken } from '../middlewares/auth.middleware';

const router=Router();

router.post('/',verifyToken,validateStudent,studentController.create)
router.get('/',verifyToken,studentController.getAll)
// router.get('/:id',studentController.getById)
router.get("/:id", verifyToken, studentController.getById);
// router.put('/:id',verifyToken,validateStudent, studentController.update)
router.patch('/:id', verifyToken, validateStudentUpdate, studentController.update);

router.delete('/:id',verifyToken,studentController.remove)

export default router;
