import express from "express";
import db from "../database/data.js";

export const task= async(req,res)=>{
    try{
        const uid=req.user.id;
        const {title,desc,status,priority,dueDate}=req.body;
        console.log(dueDate);
        await db.query("insert into tasks (user_id,title,description,status,priority,due_date) values ($1,$2,$3,$4,$5,$6)",[uid,title,desc,status,priority,dueDate]);
        console.log("task added successfully");
        
        res.status(201).json({ message: "Task added successfully" });

    }catch(error){
        res.status(500).json({ message: "Cannot upload the task" });
         console.error(error);
    }
}

export const gettask=async (req,res)=>{
    try{
        const uid=req.user.id;
        console.log(uid);
        const result=await db.query(`SELECT 
  status,
  json_agg(tasks.* ORDER BY id ASC) AS tasks
FROM tasks
WHERE user_id = $1
GROUP BY status;

`,[uid]) 
if(result.rows.length==0){
    return res.json({
        emptymsg:"Add some task!!"
    })
}
 //get task group by the status pending task then its task array another done task then its array of task json
        console.log(result.rows[0].tasks);
   
        const date = new Date(result.rows[0].tasks[0].due_date).toLocaleString("en-IN", { //it is date and time of current time zone
  timeZone: "Asia/Kolkata"
});
let rest=[];
rest.push(req.user.name);
rest.push(result.rows);
console.log("due date:",date);
res.json(rest);
        // res.status(201).json({
        //     message:"all tasks of user is fetched"
        // });

    }
    catch(error){
        console.error(error);
        res.status(404).json({message:"task of user not found"})
    }
}

export const updatetask= async(req,res)=>{
    try{
        console.log(req.body);
        const uid=req.user.id;
        const taskid= req.body.id;
    const {title,description,status,priority,due_date}=req.body;

    await db.query("update tasks set title=$1 ,description=$2,status=$3 ,priority=$4, due_date=$5 where user_id=$6 and id=$7",[title,description,status,priority,due_date,uid,taskid]);


    console.log("task info updated successfully");
        res.status(200).send("task info updated successfully");

}catch(error){
        console.error(error)
        res.status(404).json({message:"User not exist"});
    }
}
export const remove_task = async(req,res)=>{
      try{
        const taskid=req.params.id;
        const user_id=req.user.id;
        await db.query("delete from tasks where id=$1 and user_id=$2",[taskid,user_id]);
        console.log("task deleted successfully");
        res.status(200).json({message:"task deleted successfully"});

      } catch(error){
        console.error(error)
        res.status(404).json({message:"task not found"});
        }
}