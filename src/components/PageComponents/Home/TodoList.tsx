import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Stack,
  Paper,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@/components/MUIComponents/TextField';
import Button from '@/components/MUIComponents/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onEditTodo: (id: number, text: string) => void;
  onDeleteTodo: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onAddTodo,
  onEditTodo,
  onDeleteTodo,
  onToggleComplete,
}) => {
  const theme = useTheme();
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      onAddTodo(newTodo);
      setNewTodo('');
    }
  };

  const handleEditStart = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditedText('');
  };

  const handleEditSave = (id: number) => {
    if (editedText.trim() !== '') {
      onEditTodo(id, editedText);
      setEditingId(null);
      setEditedText('');
    }
  };

  return (
    <Paper>
      <Stack spacing={2} padding={2}>
        <TextField
          label='Добави задача'
          value={newTodo}
          onChange={(e: any) => setNewTodo(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          message='Добави'
          onClick={handleAddTodo}
          sx={{ width: '100px' }}
        />
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id}>
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggleComplete(todo.id)}
              />
              {editingId === todo.id ? (
                <Stack direction='row' spacing={2} alignItems='center'>
                  <TextField
                    label='Edit Todo'
                    value={editedText}
                    onChange={(e: any) => setEditedText(e.target.value)}
                  />
                  <IconButton
                    color='primary'
                    aria-label='save'
                    onClick={() => handleEditSave(todo.id)}
                  >
                    <CheckCircleIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </IconButton>
                  <IconButton
                    color='secondary'
                    aria-label='cancel'
                    onClick={handleEditCancel}
                  >
                    <CancelIcon sx={{ color: theme.palette.secondary.main }} />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  <ListItemText
                    primary={todo.text}
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge='end'
                      aria-label='edit'
                      onClick={() => handleEditStart(todo.id, todo.text)}
                    >
                      <EditIcon sx={{ color: '#f7a54f' }} />
                    </IconButton>
                    <IconButton
                      edge='end'
                      aria-label='delete'
                      onClick={() => onDeleteTodo(todo.id)}
                    >
                      <DeleteIcon sx={{ color: theme.palette.grey[700] }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Stack>
    </Paper>
  );
};

export default TodoList;
