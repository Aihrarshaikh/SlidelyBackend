import express from 'express';
import { ping, submitForm, readSubmission, deleteSubmission, editSubmission, searchByEmail } from '../controllers/submissionController';

const router = express.Router();

router.get('/ping', ping);
router.post('/submit', submitForm);
router.get('/read', readSubmission);
router.delete('/delete', deleteSubmission);
router.put('/edit', editSubmission);
router.get('/search', searchByEmail);

export default router;
