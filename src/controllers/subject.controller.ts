import { Request, Response } from 'express';
import * as subjectService from '../services/subject.service'

export const create = async (req: Request, res: Response) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.json(subjects);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const subject = await subjectService.getSubjectById(id);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const subject = await subjectService.updateSubject(id, req.body);
    res.json(subject);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await subjectService.deleteSubject(id);
    res.json({ message: 'Subject deleted' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
