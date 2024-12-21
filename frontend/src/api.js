import axios from "axios";

const apiUrl = import.meta.env.VITE_APP_APIURL;
export const getProducts = () =>{
    return axios.get(`${apiUrl}/products`);
}
export const getTotalSales = () =>{
    return axios.get(`${apiUrl}/analytics/total_sales`);
}

export const getCategoriesAnalyses = () =>{
    return axios.get(`${apiUrl}/analytics/category_sales`);
}
export const getTrendingProducts = async () =>{
    return axios.get(`${apiUrl}/analytics/trending_products`);
}