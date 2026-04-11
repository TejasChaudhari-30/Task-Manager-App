import react from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import DeleteButton from "./delete.jsx";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

export const TaskCard = ({ task, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log(task);
    navigate("/edit", { state: task });
  };

  return (
    <div className="task-card">

      {/* Priority */}
      <span className={`priority ${task.priority}`}>
        {task.priority}
      </span>

      {/* Title */}
      <h3 className="task-title">{task.title}</h3>

      {/* Description */}
      <p className="task-desc">{task.description}</p>

      {/* Meta row */}
      <div className="task-meta">
        <span className="task-status">{task.status}</span>
        <span className="task-date">{task.due_date}</span>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <Button className="edit-btn"
          variant="contained"
          onClick={() => onEdit(task)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>

        <DeleteButton
        className="delete-btn"
          taskId={task.id}
          onDelete={onDelete}
        />
      </div>

    </div>

  );
};
