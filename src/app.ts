import express from 'express';
import bodyParser from 'body-parser';
import submissionRoutes from './routes/submissionRoutes';
import { errorHandler } from './middleware/errorMiddleware';

const app = express();

app.use(bodyParser.json());

app.use('/api', submissionRoutes);

// Error handling middleware should be the last middleware
app.use(errorHandler);

export default app;
