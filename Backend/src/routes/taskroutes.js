import express from "express";
import {task,gettask,updatetask,remove_task} from "../controllers/tasksub.js";
import { authmiddleware } from "../middleware/authmiddleware.js";


const router1 =express.Router();
router1.post("/addtask",authmiddleware,task);
router1.get("/gettask",authmiddleware,gettask);
router1.put("/update",authmiddleware,updatetask);
router1.delete("/delete/:id",authmiddleware,remove_task);

export default  router1;