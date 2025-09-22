import { useState } from 'react';
import type { FC } from 'react';
import { TextField, Button } from '@mui/material';

interface Props {
  onCreate: (task: { title: string; description?: string }) => void;
}

const TaskForm: FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({ title, description: description.trim() ? description : undefined });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <TextField
        fullWidth
        label="Título de la tarea"
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Descripción (opcional)"
        variant="outlined"
        size="small"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Agregar
      </Button>
    </form>
  );
};

export default TaskForm;
