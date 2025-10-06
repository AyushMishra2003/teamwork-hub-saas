import { Schema } from "mongoose";



const userSchema=new Schema(
    {
       name:{
         type:String,
         required:true
       },
       userName:{
         type:String,
         required:true,
         unique:true
       },
       email:{
         type:String,
         unique:true,
         required:true
       },
      

    },
    {
        timestamps:true
    }
)