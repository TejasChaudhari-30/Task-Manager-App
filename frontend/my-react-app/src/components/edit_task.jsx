import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import react, { useState } from "react";

function EditButton({onClose,prevtask,onUpdate}) {
    // const location = useLocation();
    // const prev = location.state;
    const [task, settask] = useState(prevtask);


    const navigate = useNavigate();
    const edit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No token found");
                navigate("/login");
                return;
            }
            await axios.put(`${import.meta.env.VITE_backend_url}/api/task/update`, task,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            console.log("Task updated successfully");
            // navigate("/dashboard");
            onUpdate(task);
            onClose();


        }
        catch (error) {
            console.error("unable to edit task pls try again");
        }
    }

    return (
         <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Task</h2>
            <form onSubmit={edit} method="POST">
                <input type="text" name="title" onChange={(e) => settask({ ...task, title: e.target.value })} value={task.title} />
                <textarea type="text" name="desc" onChange={(e) => settask({ ...task, description: e.target.value })} value={task.description} />

                <select
                    name="status"
                    value={task.status}
                    onChange={(e) =>
                        settask({ ...task, status: e.target.value })
                    }
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>

                <select name="priority" value={task.priority} onChange={(e) =>
                        settask({ ...task, priority: e.target.value })}required>
                    <option >High</option>
                    <option >Moderate</option>
                    <option >Low</option>
                </select>

                <input type="date" name="dueDate" id="dueDate" onChange={(e) => settask({ ...task, due_date: e.target.value })} value={task.due_date} />
                <div className="editbtn">
                    <button type="submit">Save Changes</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </form>
            </div>
        </div>
    );
}
export default EditButton;