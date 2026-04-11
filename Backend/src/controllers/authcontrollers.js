import bcrypt from "bcrypt";
import db from "../database/data.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export const register= async (req,res)=>{
    try{
    const {name,email,password} =req.body; 
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("insert into users (name,email,password) values ($1,$2,$3)",
        [name,email,hashedPassword]
    );
    res.status(200).json({message:"registered"});
    console.log("user registered");
    
}
catch(error){
    console.error(error);
    res.status(501).json({message:"something went wrong pls ensure that email id is unique"})
}
}
export const login= async(req,res)=>{

    try{
          console.log(req.body);

  const {email,password}=req.body;
   const check=await db.query("select * from users where email=$1",[email]);
   console.log(check.rows);
      const ismatch=await bcrypt.compare(password,check.rows[0].password);
      console.log(ismatch);

       if(ismatch){
        // res.send(`welcome : ${check.rows[0].name}`);
        console.log(process.env.JWT_secret);
 const jwtToken=jwt.sign(
        {id:check.rows[0].id,
            name:check.rows[0].name
            // email:check.rows[0].email
        },
        process.env.JWT_secret,
        {
            expiresIn:"1d"
        }
    );
    console.log(jwtToken);

   res.status(200).json({
  token: jwtToken,
});
   
    }
    else{
         res.status(401).json({message:"wrong password! pls try again"});
        
    }

   
    }
    catch(error){
        res.status(404).json({message:"user not found"});
        console.log("user not found");
    }
   
}
