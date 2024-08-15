import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from "./db/db.index.js"; 

dotenv.config();

connectDB()
.then( ()=> {
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is Running at port: ${process.env.PORT}`);
        app.on("error", (error)=> {
            console.log("ERROR: ", error);
            throw error  
        });
    })
})
.catch( (err) => {
    console.log("MongoDB connection failed!!!", err);
    
})




























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

