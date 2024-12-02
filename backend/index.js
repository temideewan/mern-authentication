import express from 'express'
import  dotenv  from 'dotenv';
import { connectDB } from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'

dotenv.config();

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json()); // parse json incoming request onto request.body

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
