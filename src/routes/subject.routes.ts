import { Router } from 'express';
import * as subjectController from '../controllers/subject.controller';

const router = Router();

router.post('/', subjectController.create);
router.get('/', subjectController.getAll);
router.get('/:id', subjectController.getById);
router.put('/:id', subjectController.update);
router.delete('/:id', subjectController.remove);

export default router;
