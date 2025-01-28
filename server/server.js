import express from 'express'
import cors from 'cors'
import connectDB from './config/database.js';
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json())
app.use(cors());

await connectDB();
app.use('/api/v1/user',userRouter);
app.use('/api/v1/image',imageRouter);

app.get('/' , (req,res) => res.send("API working"));

app.listen(PORT , ()=> console.log('Server running on Port : ' + PORT));
