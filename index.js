import express from 'express';
import axios from 'axios';
import cron from 'node-cron';
import createTables from './db/createTable.js';
import userRouter from './routes/user.js'
import webRouter from './routes/web.js'
import authMiddleware from "./middlewares/auth.js"
import submissionController from "./controllers/submission.js"

const app = express();

// -------Middlewares-------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// app.use(authMiddleware.checkForAuthentication);

const PORT = process.env.PORT || 3000;

// Connect DB 
createTables();

// -------Routes--------
app.get('/ping', (_, res) => {
    res.status(200).json('pong');
})

app.post('/submission', authMiddleware.checkForAuthentication, submissionController.addSubmission);
app.use('/user',  userRouter);
app.use('/web', webRouter);


app.listen(PORT, () => {console.log(`Server started at PORT ${PORT}`)});