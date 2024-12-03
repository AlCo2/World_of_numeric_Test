import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.dbUrl || '';
const app: Express = express();
const port = 3000;

mongoose.connect(dbUrl).then(()=>
  console.log("connected")
).catch((error)=>{
  console.log(error);
});

app.get('/', (req:Request, res:Response) => { 
  res.send('everything is working well!');
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})