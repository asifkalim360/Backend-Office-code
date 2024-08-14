import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import connectDB from "./db/db.index.js"; 



connectDB();




























/*
import mongoose from "mongoose"; 
import { DB_NAME } from "./constants";

import express from "express";  
const app = express();

// using iffe method for database connection(All database conection codes are in IFFI method)
( async()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log("ERROR: ", error);
            throw error  
        })
        app.listen(process.env.PORT, ()=> {
            console.log(`App is listen on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR: ", error);
        throw error;  
    }
})()

*/

