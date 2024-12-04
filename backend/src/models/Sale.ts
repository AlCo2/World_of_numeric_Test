import mongoose from "mongoose";

const { Schema } = mongoose;

const saleSchema = new Schema({
    SaleId: Number,
    ProductID: Number,
    Quantity: Number,
    Date: Date,
    TotalAmount: Number
})

export const Sale = mongoose.model('Sale', saleSchema);