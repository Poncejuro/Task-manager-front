import React, { useEffect, useState } from "react";
import { TaskService } from "../../services"; 
import { useSelector } from "react-redux";
import { CustomTable } from "../../components"; 
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("in progress");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState(""); // Para el ID de la tarea que se actualizará
  const [isUpdating, setIsUpdating] = useState(false); // Para saber si estamos en el modo de actualización
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return; 
      try {
        const tasksData = await TaskService.getAll(token); 
        setTasks(tasksData); 
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, [token]); 

  const columns = [
    { label: "Id", field: "id" }, 
    { label: "Title", field: "title" }, 
    { label: "Description", field: "description", align: "right" },
    { label: "Status", field: "status", align: "right" },  
    { label: "Actions", field: "actions", render: (task) => (
      <>
        <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
      </>
    )}
  ];

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    const taskData = { title, description, status };

    try {
      setIsLoading(true);
      await TaskService.create(token, taskData);
      setTitle("");
      setDescription("");
      setStatus("in progress");
      setError(null);
      const updatedTasks = await TaskService.getAll(token);
      setTasks(updatedTasks);
    } catch (error) {
      setError("Failed to add the task.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!taskId) {
      setError("Task ID is required to update.");
      return;
    }

    if (!title || !description) {
      setError("Both title and description are required.");
      return;
    }

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    const taskData = { title, description, status };

    try {
      setIsLoading(true);
      await TaskService.update(token, taskId, taskData);
      setTitle("");
      setDescription("");
      setStatus("in progress");
      setTaskId("");
      setIsUpdating(false);
      setError(null);
      const updatedTasks = await TaskService.getAll(token);
      setTasks(updatedTasks);
    } catch (error) {
      setError("Failed to update the task.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.delete(token, taskId);
      const updatedTasks = await TaskService.getAll(token);
      setTasks(updatedTasks);
    } catch (error) {
      setError("Failed to delete the task.");
    }
  };

  const toggleFormMode = () => {
    setIsUpdating(!isUpdating);
    setTitle("");
    setDescription("");
    setStatus("in progress");
    setTaskId("");
    setError(null);
  };

  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4, 
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography component="h1" variant="h5" gutterBottom>
              {isUpdating ? "Update Task" : "Add Task"}
            </Typography>

            {error && <Typography color="error">{error}</Typography>}

            <form onSubmit={isUpdating ? handleUpdateTask : handleAddTask} noValidate>
              {isUpdating && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="taskId"
                  label="Task ID"
                  name="taskId"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="normal"
                fullWidth
                id="status"
                label="Status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : isUpdating ? 'Update Task' : 'Add Task'}
              </Button>
            </form>
            
            <Button
              onClick={toggleFormMode} 
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              {isUpdating ? "Switch to Add Mode" : "Switch to Update Mode"}
            </Button>
          </Box>

          <Box sx={{ flex: 2 }}>
            <Typography component="h1" variant="h5" gutterBottom>
              Task List
            </Typography>

            <div style={{ paddingLeft: 16, paddingRight: 16 }}>
              <CustomTable columns={columns} data={tasks} />
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
