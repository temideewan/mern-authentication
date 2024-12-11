import express from 'express'
import  dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/connectDB.js'
import cors from 'cors';
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(express.json()); // parse json incoming request onto request.body
app.use(cookieParser()); // parse incoming cookies

app.get('/', (req, res) => {
  res.send('Hello, World!')
}) 

app.use('/api/auth', authRoutes)

app.listen(port, () => {
  connectDB();
  console.log('server is listening on port 3000');
})


process.on('uncaughtException',(err) => {
  console.error('Uncaught exception', err);
  process.exit(1);
})
