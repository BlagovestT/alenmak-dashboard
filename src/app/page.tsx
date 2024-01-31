'use client';

import PageHeader from '@/components/SmallComponents/PageHeader/PageHeader';
import HomeIcon from '@mui/icons-material/Home';
import Calendar from 'react-calendar'; // TODO: delete the library
import 'react-calendar/dist/Calendar.css';
import { Container, Paper, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import CountWidget from '@/components/PageComponents/Home/CountWidget';
import TodoList from '@/components/PageComponents/Home/TodoList';
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Home = () => {
  const currentDate = dayjs();

  const [staffCount, setStaffCount] = useState(50);
  const [patientCount, setPatientCount] = useState(100);

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Sample Task 1', completed: false },
    { id: 2, text: 'Sample Task 2', completed: true },
  ]);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <PageHeader
        header='Добре дошли!'
        subheader='Управлявайте ежедневните си задачи със стил!'
        icon={<HomeIcon sx={{ fontSize: '2.5rem' }} />}
      />
      <Container>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Stack direction='row' justifyContent='space-between'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                defaultValue={dayjs(currentDate)}
                sx={{ border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </LocalizationProvider>
            <CountWidget staffCount={staffCount} patientCount={patientCount} />
          </Stack>
        </Paper>
        <TodoList
          todos={todos}
          onAddTodo={handleAddTodo}
          onEditTodo={handleEditTodo}
          onDeleteTodo={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />
      </Container>
    </>
  );
};

export default Home;
