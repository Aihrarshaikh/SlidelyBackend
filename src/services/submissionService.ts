import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(__dirname, '../db.json');

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

export const getSubmissions = (): Submission[] => {
    if (!fs.existsSync(dbPath)) {
        return [];
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

export const saveSubmission = (submissions: Submission[]) => {
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
};

export const getSubmissionByIndex = (index: number): Submission | null => {
    const submissions = getSubmissions();
    return submissions[index] || null;
};

export const deleteSubmissionByIndex = (index: number): Submission[] => {
    let submissions = getSubmissions();
    submissions = submissions.filter((_, i) => i !== index);
    return submissions;
};

export const updateSubmissionByIndex = (index: number, updatedData: Partial<Submission>): Submission[] => {
    const submissions = getSubmissions();
    if (submissions[index]) {
        submissions[index] = { ...submissions[index], ...updatedData };
    }
    return submissions;
};

export const searchSubmissionsByEmail = (email: string): Submission[] => {
    const submissions = getSubmissions();
    return submissions.filter(sub => sub.email === email);
};
