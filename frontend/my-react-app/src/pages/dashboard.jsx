import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components/taskcard.jsx";
import EditButton from "../components/edit_task.jsx";
import Graph, { Graph2 } from "../extra-features/progress-chart.jsx";
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import "../App.css";


function Dashboard() {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setname] = useState("");
  const [count, setcount] = useState(0);


  let today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const newCount = tasks
      .flatMap(group => group.tasks)
      .filter(task => task.status === "Pending" &&
        task.due_date === today)
      .length;

    setcount(newCount);
  }, [tasks]);   // runs whenever tasks change

  useEffect(() => {
    if (count > 0) {
      alert(`Your ${count} tasks are due today!`);
    }
  }, [count]); // runs only when count changes
  const handleedit = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  }
  const handleDeleteUI = (id) => {
    setTasks((prev) =>
      prev.map((group) => ({
        ...group,
        tasks: group.tasks.filter((t) => t.id !== id),
      }))
    );
  };

  const handleEditUI = (task) => {
    // console.log(task);

    setTasks((prev) => {



      return prev.map((group) => {
        // Remove task from all groups
        const filteredTasks = group.tasks.filter(
          (t) => t.id !== task.id
        );




        // Add task to the correct status group
        if (group.status === task.status) {


          return {
            ...group,
            tasks: [...filteredTasks, task],
          };
        }


        return {
          ...group,
          tasks: filteredTasks,
        };

      });
    });



  }
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!localStorage.getItem("token")) {
          alert("session expired pls relogin");
          navigate("/login");
          return;
        };
        const token = localStorage.getItem("token");


        const res = await axios.get(
          `${import.meta.env.VITE_backend_url}/api/task/gettask`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.emptymsg) {
          return alert(res.data.emptymsg);
        }

        console.log(res)
        console.log(res.data[1]); //contains the data of task in sroted form as pending and done
        console.log(res.data[0]);//for name in token 

        setname(res.data[0]);
        setTasks(res.data[1].reverse());

      



      } catch (err) {
        console.error("Error in fetching tasks:", err);

        alert("Error in fetching tasks")


      }
    };

    fetchTasks();
  }, []);


  const pendingGroup = tasks.find(group => group.status === "Pending");
  const completedGroup = tasks.find(group => group.status === "Done");
  const high = pendingGroup?.tasks?.filter(t => t.priority === "High") || [];
  const moderate = pendingGroup?.tasks?.filter(t => t.priority === "Moderate") || [];
  const low = pendingGroup?.tasks?.filter(t => t.priority === "Low") || [];


  const pending = pendingGroup?.tasks?.length || 0;
  const done = completedGroup?.tasks?.length || 0;


  function logout() {
    const confirm = window.confirm("do want to logout from your account")
    if (!confirm) return;

    if (!localStorage.getItem("token")) {
      console.log("no token found pls relogin");
      navigate("/login");
      return;
    }
    else {
      localStorage.removeItem("token");
      console.log("logged out successfully");

    }
    navigate("/");
  }

  // stats();








  return (

    <div className="dashboard">



      <header className="dash-header">

        {/* Top Row */}
        <div className="dash-top">
          <h1>Welcome, {name}</h1>

          <div className="dash-actions">
            <Button
              variant="contained"
              onClick={() => navigate("/add")}
              startIcon={<AddIcon />}
            >
              Add Task
            </Button>

            <Button
              variant="outlined"
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                borderColor: "#475569",
                color: "#e2e8f0",
                transition: "all 0.25s ease",

                "&:hover": {
                  background: "rgba(255,255,255,0.05)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                },

                "&:hover .MuiButton-startIcon": {
                  transform: "translateX(5px)",
                  transition: "0.25s",
                },
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="back">
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Go Back
          </Button>
        </div>

      </header>

      <div>
        <h2 style={{ marginBottom: "20px" }}>
          Progress Graph
        </h2>
      </div>
      <div className="graphs" >

        <Graph pending={pending} done={done} />

        <Graph2 high={high.length} moderate={moderate.length} low={low.length} />
      </div>


      {/* <h1>Welcome , {name}</h1> */}
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div className="task-section" key={task.status}>
          <h2>{task.status}</h2>

          <div className="task-row">
            {task.tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onEdit={handleedit}
                onDelete={handleDeleteUI}
              />
            ))}
          </div>
        </div>
      ))}


      {isEditing && (
        <EditButton
          prevtask={selectedTask}
          onClose={() => setIsEditing(false)}
          onUpdate={handleEditUI}
        />
      )}

    </div>
  )



}

export default Dashboard;