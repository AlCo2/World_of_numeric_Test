import {Schema, model} from "mongoose";

interface ISale {
    SaleId: number,
    ProductID: number,
    Quantity: number,
    Date: Date,
    TotalAmount: number
}

const saleSchema = new Schema<ISale>({
    SaleId: Number,
    ProductID: Number,
    Quantity: Number,
    Date: Date,
    TotalAmount: Number
})
saleSchema.index({ProductID: 1});
saleSchema.index({Date: 1})
// saleSchema.indexes()
export const Sale = model<ISale>('Sale', saleSchema);