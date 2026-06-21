
import { Routes,Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard.jsx";
import  Login  from "./pages/login.jsx";
import  Register  from "./pages/register.jsx";
import Addtask from "./components/addtask.jsx";
import Edit_task from "./components/edit_task.jsx";
import Home_page from "./pages/home.jsx";
import About from "./pages/about.jsx";
import { Analytics } from '@vercel/analytics/react'
function App() {
 return (
    <Routes>
       <Route path="/" element={<Home_page/>} /> 
       <Route path="/login" element={<Login/>}/>;
       <Route path="/register" element={<Register/>}/>;
       <Route path="/dashboard" element={<Dashboard/>}/>;
       <Route path="/add" element={<Addtask/>}/>;
       <Route path="/edit" element={<Edit_task/>}/>;
       <Route path="/about" element={<About/>}/>;

      <Analytics/>

    </Routes>
 )
}

export default App;
