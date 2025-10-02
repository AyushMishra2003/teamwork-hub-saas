import { model, Schema } from "mongoose";



const productSchema=new Schema(
    {
       name:{
         type:String
       },
       description:{
         type:String
       },
    },
    {
        timestamps:true
    }
)

const ProductModel=model('Product-Testing',productSchema)

export default ProductModel