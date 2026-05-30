import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

export const authmiddleware=(req,res,next)=>{
    try{
    const authheader=req.headers.authorization;
    if(!authheader) res.status(401).json({message:"Unauthorized"});

     console.log(authheader);
const token = authheader.split(" ")[1]; 
console.log(token);
 jwt.verify(token,process.env.JWT_secret,(err,decoded)=>{ //verify the jwttoken store in local storage 
    if(err){
         return res.status(403).json({ message: "Token expired or invalid" });
    }
    console.log(decoded);
   req.user=decoded;
   next();
 });
 

    }catch(error){
        console.error(error);
        res.send("error");
    }

}