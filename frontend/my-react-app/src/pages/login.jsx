import axios from "axios";
import { useState } from "react";
import Dashboard from "./dashboard.jsx";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";


function Login() {
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const navigate = useNavigate();

    const click = async (event) => {
        event.preventDefault();
        console.log(email);
        try {
            const res = await axios.post(`${import.meta.env.VITE_backend_url}/api/auth/login`, {
                email: email,
                password: pass,
            })
   
            console.log(res.data.token);
            if (res.data.token) {
                            
                localStorage.setItem("token", res.data.token);
                 navigate("/dashboard") ;
            }
            else {
                console.log("cannot fetch the data pls try again") 
                navigate("/login");
            }


            


        }
        catch (error) {
           
console.log(error.response.data.message);
if(error.response.data.error){
console.log(error.response.data.error);
 alert(error.response.data.error);
 return;
}


alert(error.response.data.message);      }

    }
    function onchange(event) {
        const n = event.target.name;
        const value = event.target.value;
        if (n === "email") {
            setemail(value);
        }
        else {
            setpass(value);

        }
    }

    return (
        <div className="login_body">
               <div className="login-back">
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Go Back
        </Button>
      </div>
       <div className="login_page">
  <form onSubmit={click} className="login_card">
    <h2>Welcome</h2>

    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      onChange={onchange}
      value={email}
      required
    />

    <input
      type="password"
      name="password"
      placeholder="Enter password"
      onChange={onchange}
      value={pass}
      required
    />

    <button type="submit">Login</button>

    <p>
      Don't have an account?{" "}
      <span onClick={() => navigate("/register")}>Register</span>
    </p>
  </form>
</div>

</div>
    );

}
export default Login;