import type { FC } from 'react';
import type { Task } from '../types/types';
import { IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskItem: FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex justify-between items-start p-3 border rounded shadow-sm hover:bg-gray-50 transition">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Checkbox checked={task.done} onChange={onToggle} color="primary" />
          <span className={`${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </span>
        </div>
        {task.description && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={task.done ? 'line-through text-gray-400' : 'text-gray-600'}
          >
            {task.description}
          </Typography>
        )}
      </div>
      <IconButton onClick={onDelete} color="error">
        <DeleteIcon />
      </IconButton>
    </li>
  );
};

export default TaskItem;
