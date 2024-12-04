import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { Product } from "./models/Product";
import { Sale } from "./models/Sale";

dotenv.config();

const dbUrl = process.env.dbUrl || '';
const app: Express = express();
const port = 3000;

const productsLookup = {
  from: 'sales',
  localField: 'ProductID',
  foreignField: 'ProductID',
  pipeline: [
    { 
      $project: {
        _id: false,
        Quantity: true
      } 
    }
  ],
  as: 'Sales',
}
const productsAddFields = {
  QuantitySold: {$sum: "$Sales.Quantity"}
}
const productsProject = {
  _id: false,
  ProductID: true,
  ProductName: true,
  Category: true,
  Price: true,
  QuantitySold: true,
}


mongoose.connect(dbUrl).then(()=>
  console.log("connected to database")
).catch((error)=>{
  console.log(error);
});


app.get('/products', async (req:Request, res:Response)=>{
  const page:number|null = req.query.page?parseInt(req.query.page as string, 10):null;
  const limit = 10;
  const skip = page&&page!==1?(page*limit)-limit:0;
  const products = await Product.aggregate([
    {
      $lookup: productsLookup
    },
    {
      $addFields: productsAddFields
    },
    {
      $project: productsProject
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    }
  ]);
  res.status(200).json(products);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})