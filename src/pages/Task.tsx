// src/pages/Tasks.tsx
import { useState, useEffect, useContext, useCallback } from 'react';
import type { FC } from 'react';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { getTasks, createTask, toggleTaskDone, deleteTask } from '../api/task';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/types';

const Tasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err: unknown) {
      const status = err && typeof err === 'object' && 'status' in err ? Number((err as { status?: number }).status) : undefined;
      const message = err && typeof err === 'object' && 'message' in err ? String((err as { message?: string }).message) : 'Error al cargar tareas';

      if (status === 401) {
        logout();
        navigate('/login');
      } else {
        setError(message || 'Error al cargar tareas');
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (task: { title: string }) => {
    const newTask = await createTask(task);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggle = async (id: number) => {
    await toggleTaskDone(id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Cargando...
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card sx={{ mb: 4 }}>
        <CardContent className="flex justify-between items-center">
          <Typography variant="h5" component="div">
            Tus Tareas
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>

      <TaskForm onCreate={handleCreate} />

      {tasks.length === 0 ? (
        <Typography align="center" color="textSecondary">
          No tienes tareas aún.
        </Typography>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tasks;
