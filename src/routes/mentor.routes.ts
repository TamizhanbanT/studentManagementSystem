import { Router } from 'express';
import * as mentorController from '../controllers/mentor.controller';
import { validateMentor, validateMentorUpdate } from '../middlewares/validateMentor';

const router = Router();

router.post('/', validateMentor, mentorController.create);
router.get('/', mentorController.getAll);
router.get('/:id', mentorController.getById);
router.put('/:id', validateMentorUpdate, mentorController.update);
router.delete('/:id', mentorController.remove);

export default router;
