// src/api/tasks.ts
import type { Task } from '../types/types';

const API_URL = 'http://localhost:3000';

// Obtiene el token del localStorage
const getToken = (): string => localStorage.getItem('token') ?? '';

// Función para manejar respuestas del backend
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const message = await res.text();
    throw { status: res.status, message };
  }
  return res.json();
};

// Obtener todas las tareas
export const getTasks = async (): Promise<Task[]> => {
  const token = getToken();
  if (!token) throw { status: 401, message: 'No token found' };

  return handleResponse(
    await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  );
};

// Crear una nueva tarea
export const createTask = async (task: { title: string }): Promise<Task> => {
  const token = getToken();
  if (!token) throw { status: 401, message: 'No token found' };

  return handleResponse(
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  );
};

// Alternar estado de completada de la tarea
export const toggleTaskDone = async (id: number): Promise<void> => {
  const token = getToken();
  if (!token) throw { status: 401, message: 'No token found' };

  // 🔹 Logs de debug
  console.log('Toggle URL:', `${API_URL}/tasks/${id}/toggle`);
  console.log('Token:', token);

  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw { status: res.status, message };
  }
};


// Eliminar una tarea
export const deleteTask = async (id: number): Promise<void> => {
  const token = getToken();
  if (!token) throw { status: 401, message: 'No token found' };

  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw { status: res.status, message };
  }
};
