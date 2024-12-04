import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { Product } from "./models/Product";

dotenv.config();

const dbUrl = process.env.dbUrl || '';
const app: Express = express();
const port = 3000;

mongoose.connect(dbUrl).then(()=>
  console.log("connected")
).catch((error)=>{
  console.log(error);
});

app.get('/', async (req:Request, res:Response) => {
  const products = await Product.find();
  res.json(products);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})