import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteButton({ taskId, onDelete ,}) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_backend_url}/api/task/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onDelete(taskId); // tell parent to update UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <button className="delete-btn" onClick={handleDelete}>
    //   Delete
    // </button>
    <Button variant="outlined"   startIcon={<DeleteIcon />} onClick={handleDelete} 
      sx={{
    transition: "all 0.25s ease",

    "&:hover": {
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    },
  }}>
  Delete
</Button>


  );
}

export default DeleteButton;
