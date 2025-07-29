import { Router } from 'express';
import * as classController from '../controllers/class.controller';
import { validateClass, ValidateClassUpdate } from '../middlewares/validateClass';

const router = Router();

router.post('/', validateClass, classController.create);
router.get('/', classController.getAll);
router.get('/:className', classController.getById);
router.put('/:className', ValidateClassUpdate, classController.update);
router.delete('/:className', classController.remove);

export default router;
