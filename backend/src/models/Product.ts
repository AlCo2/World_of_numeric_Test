import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
    ProductID: Number,
    ProductName: String,
    Category: String,
    Price: Number
})

export const Product = mongoose.model('Product', ProductSchema);
