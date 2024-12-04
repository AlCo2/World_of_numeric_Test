import {Schema , model} from "mongoose";


interface IProduct {
    ProductID: number,
    ProductName: string,
    Category: string,
    Price: number,
}

const ProductSchema = new Schema<IProduct>({
    ProductID: Number,
    ProductName: String,
    Category: String,
    Price: Number,
})

export const Product = model<IProduct>('Product', ProductSchema);
