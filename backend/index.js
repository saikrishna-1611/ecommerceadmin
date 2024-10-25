import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes.js';
import connectDB from './utils/ db.js';
import cors from "cors";
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
// User Routes
app.use('/api/v1/auth', router);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));