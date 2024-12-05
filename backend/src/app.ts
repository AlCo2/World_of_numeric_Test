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

const categoriesLookup = {
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
const categoriesGroup = {
  _id:'$Category',
  QuantitySold: { $sum: "$Sales.Quantity" }
}

const categoriesProject = {
  _id: false,
  Category: true,
  QuantitySold: true,
}

mongoose.connect(dbUrl).then(()=>
  console.log("connected to database")
).catch((error)=>{
  console.log(error);
});


app.get('/products', async (req:Request, res:Response)=>{
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
  ]);
  res.status(200).json(products);
})
app.get('/analytics/total_sales', async (req:Request, res:Response)=>{
  try{
  const date_start = new Date(req.query.date_start as string);
  const date_end = new Date(req.query.date_end as string);
  const sales = await Sale.find({Date: {
    $gte: date_start,
    $lte: date_end
  }})
  res.status(200).json(sales);
}catch(e){
  res.status(404).json({message: 'There is no data to show'});
}
})

app.get('/analytics/trending_products', async (req:Request, res:Response)=> {
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
      $sort: { "QuantitySold": -1 }
    },
    {
      $limit: 3,
    }
  ]);
  res.status(200).json(products);
})

app.get('/analytics/category_sales', async (req:Request, res:Response)=> {
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
  ]);
  let categoriesMap = new Map<string, number>();
  products.forEach((product)=>{
    const total = product.Price * product.QuantitySold;
    if (categoriesMap.has(product.Category))
    {
      const oldTotal = categoriesMap.get(product.Category) || 0;
      categoriesMap.set(product.Category, oldTotal + total);
    }
    else
    {
      categoriesMap.set(product.Category, total)
    }
  })
  const categories = Object.fromEntries(categoriesMap);
  res.status(200).json(categories);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})