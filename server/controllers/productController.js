// controllers/productController.js
import ProductModel from "../models/productModel.js";
import { client } from "../redisClient.js";
import AppError from "../utils/error.utlis.js";


export const addProduct=async(req,res,next)=>{
     try{

        const {name,description}=req.body

        if(!name || !description){
            return next(new AppError("All fields are Required",400))
        }

         const product=await ProductModel.create({
            name,
            description 
         })

         if(!product){
            return next(new AppError("Product not created, please try again",400))
         }


         res.status(201).json({
            success:true,   
            message:"Product created successfully",
            data:product    
            })

     }catch(error){
         return next(new AppError(error.message,500))
     }
}



export const getProduct = async (req, res, next) => {
  try {
    const cacheKey = "all-products";

    // 1. Check Redis cache first
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      // If found in Redis, return it
      return res.status(200).json({
        success: true,
        source: "cache",
        message: "Product fetched successfully from cache",
        data: JSON.parse(cachedData),
      });
    }

    // 2. If not in cache, fetch from DB
    const products = await ProductModel.find({});

    if (!products || products.length === 0) {
      return next(new AppError("No products found", 404));
    }

    // 3. Store in Redis for 1 hour (3600 seconds)
    await client.set(cacheKey, JSON.stringify(products), { EX: 3600 });

    res.status(200).json({
      success: true,
      source: "database",
      message: "Product fetched successfully from DB",
      data: products,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};




