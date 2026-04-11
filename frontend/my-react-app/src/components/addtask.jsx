import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addtask(){
    const navigate=useNavigate();
    const [title,settitle]=useState("");
    const [desc,setdesc]=useState("");
    const [status,setstatus]=useState("Pending");
    const [priority,setpriority]=useState("Moderate");
    const [dueDate,setdate]=useState("");


    const Submitted= async(event)=>{
        event.preventDefault();
        try{
            const token = localStorage.getItem("token");

      if (!token) {
          console.log("No token found");
          navigate("/login");
          return;
        }

            await axios.post(`${import.meta.env.VITE_backend_url}/api/task/addtask`,{
                title:title,
                desc:desc,
                status:status,
                priority:priority,
                dueDate:dueDate
            }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
            console.log("task added successfully");
            navigate("/dashboard");
 
        }catch(error){
            console.error("something went wrong task is not added");
            navigate("/add");
        }
    }
    return (
        <div className="addtask">
            <form method="post" onSubmit={Submitted}>
                    <h2>Add New Task</h2>
               <input type="text"  onChange={(e)=> settitle(e.target.value)} value={title} className="title" placeholder="Enter task title" required />
               <textarea type="text" onChange={(e) => setdesc(e.target.value)} value={desc} className="description" placeholder="description" required />
               <select name="status" id="status" value={status} onChange={(e)=> setstatus(e.target.value)}
               required>
                <option  >Pending</option>
                <option >Done</option>
               </select>
               <select name="priority" id="priority" value={priority}  onChange={(e)=> setpriority(e.target.value)} required>
                <option >High</option>
                <option >Moderate</option>
                <option >Low</option>
               </select>
               
               <input type="date" name="dueDate" id="dueDate"  onChange={(e)=> setdate(e.target.value)}value={dueDate} required/>
               <button type="submit">Add</button>
            </form>
        </div>
    );

}
export default Addtask;