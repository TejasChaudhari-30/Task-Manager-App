import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"

function Register(){
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [pass,setpass]=useState("");
    const [confirm,setconfirm]=useState("");

    const  Handleclick=async(event)=>{
        event.preventDefault();
        if(pass===confirm){
        try{
            const result=await axios.post(`${import.meta.env.VITE_backend_url}/api/auth/register`,{
                name:name,
                email:email,
                password:pass
                
            });

            console.log(result.data);
            navigate("/login");
        }catch(error){
            console.error(error.response.data.message);
            // res.status(501).json({message:"something went wrong"});
            alert(error.response.data.message);
        }
    }
    else{
        console.log("retry enter password again")
        navigate("/register");
    }
    }


    return (
        <div className="register_page">
             <div className="login-back">
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Go Back
        </Button>
        </div>
            <form onSubmit={Handleclick}>
                <h2>Create Account</h2>

                <input type="text" name="name" placeholder="Enter Your Name.." value={name} onChange={(e)=> setname(e.target.value)}  required/>
                <input type="email" name="email" placeholder="Enter Your email id.." value={email}  onChange={(e)=> setemail(e.target.value) 
                }required/>
                <input type="password" name="password" placeholder="enter password" value={pass} onChange={(e)=>  setpass(e.target.value)
                }required/>
                <input type="password" name="confirm" placeholder="confirm password" value={confirm} onChange={(e)=> setconfirm(e.target.value)
                } required/>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}
export default Register;