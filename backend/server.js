import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
import authRouter from "./routes/auth.js";


const dbURL = process.env.dbURL;


app.use(express.json())
app.use(cors())
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


app.get('/', (req, res) => {
    res.send("hello world")
})

app.use("/", authRouter);

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})