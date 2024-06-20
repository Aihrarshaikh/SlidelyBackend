import { Request, Response, NextFunction } from 'express';
import { getSubmissions, saveSubmission, getSubmissionByIndex, deleteSubmissionByIndex, updateSubmissionByIndex, searchSubmissionsByEmail } from '../services/submissionService';
import fs from 'fs';
import path from 'path';
import { Submission } from '../models/submissionModels';

// Path to the JSON file
const dbPath = path.resolve(__dirname, '../db.json');


let pingInterval: NodeJS.Timeout | null = null;
export const ping = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!pingInterval) {
            pingInterval = setInterval(() => {
                console.log('Ping every 15 seconds');
            }, 15000);
            res.json({ success: true});
        } else {
            res.json({ success: true});
        }
    } catch (error) {
        next(error);
    }
};

export const submitForm = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, github_link, stopwatch_time } = req.body;

        // Intentionally cause an error for testing
        if (!name || !email || !phone || !github_link || !stopwatch_time) {
            throw new Error("Missing required fields");
        }

        const submissions = getSubmissions();
        submissions.push({ name, email, phone, github_link, stopwatch_time });
        saveSubmission(submissions);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const readSubmission = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { index } = req.query;
        const submission = getSubmissionByIndex(parseInt(index as string));
        if (submission) {
            res.json(submission);
        } else {
            res.status(404).json({ error: 'Submission not found' });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteSubmission = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { index } = req.query;
        const submissions = deleteSubmissionByIndex(parseInt(index as string));
        saveSubmission(submissions);
        res.json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const editSubmission = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.query;
      const updatedData = req.body as Partial<Submission>;
  
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email query parameter is required.' });
      }
  
      const existingSubmission = findSubmissionByEmail(email);
  
      if (!existingSubmission) {
        return res.status(404).json({ error: 'Submission not found.' });
      }
  
      const submissions = updateSubmissionByEmail(email, updatedData);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  export const findSubmissionByEmail = (email: string): Submission | undefined => {
    const submissions = readSubmissions();
    return submissions.find((submission: { email: string; }) => submission.email === email);
  };
  
  export const updateSubmissionByEmail = (email: string, updatedData: Partial<Submission>): Submission[] => {
    const submissions = readSubmissions();
    const updatedSubmissions = submissions.map((submission: { email: string; }) => {
      if (submission.email === email) {
        return { ...submission, ...updatedData };
      }
      return submission;
    });
    writeDatabase(updatedSubmissions);
    return updatedSubmissions;
  };
  export const writeDatabase = (data: Submission[]) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  };

const readSubmissions = () => {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
};

export const searchByEmail = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.query;

        // Validate that email is provided
        if (!email) {
            return res.status(400).json({ error: 'Email query parameter is required' });
        }

        const submissions = readSubmissions();
        const index = submissions.findIndex((submission: any) => submission.email === email);

        if (index === -1) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        res.json({ ...submissions[index], index });
    } catch (error) {
        next(error);
    }
};