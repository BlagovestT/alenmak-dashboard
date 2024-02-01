import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/helpers/helpers";
import {
  GetQueryAllTasksSnippet,
  PostQueryCreateTaskSnippet,
  PostQueryDeleteTaskSnippet,
  PostQueryUpdateTaskSnippet,
  Task,
} from "@/services/Tasks/apiTasksSnippets";
import { callApi } from "@/services/callApi";
import { getQueryAllTasks } from "@/services/Tasks/apiTasksGetQueries";
import {
  postQueryCreateTask,
  postQueryDeleteTask,
  postQueryUpdateTask,
} from "@/services/Tasks/apiTasksPostQueries";
import { PostQueryCreateTaskInput } from "@/services/Tasks/apiTasksInputs";

const HomeTasksList = () => {
  const theme = useTheme();
  const [tasksData, setTasksData] = useState<Task[]>();
  const [taskTitle, setTaskTitle] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const tasksData = await callApi<GetQueryAllTasksSnippet>({
          query: getQueryAllTasks,
        });

        if (tasksData.success) {
          setTasksData(tasksData.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleAddTask = async () => {
    if (!taskTitle) return;

    const body: PostQueryCreateTaskInput = {
      title: taskTitle,
    };

    const newTask = await callApi<PostQueryCreateTaskSnippet>({
      query: postQueryCreateTask(body),
    });

    if (newTask.success && tasksData) {
      setTasksData([newTask.data, ...tasksData]);
    }
  };

  const handleCheckTask = async (taskId: string, checked: boolean) => {
    const updateTask = await callApi<PostQueryUpdateTaskSnippet>({
      query: postQueryUpdateTask(taskId, { isDone: !checked }),
    });

    if (updateTask.success && tasksData) {
      const newTasksData = tasksData.map((task) => {
        if (task._id === taskId) {
          return updateTask.data;
        } else {
          return task;
        }
      });

      setTasksData(newTasksData);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const deletedTask = await callApi<PostQueryDeleteTaskSnippet>({
      query: postQueryDeleteTask(taskId),
    });

    if (deletedTask.success && tasksData) {
      const newTasksData = tasksData.filter((task) => task._id !== taskId);

      setTasksData(newTasksData);
    }
  };

  return (
    <Stack>
      <FormControl
        variant="filled"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
      >
        <InputLabel>Добавете задача...</InputLabel>
        <OutlinedInput
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Добави">
                <IconButton onClick={handleAddTask}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          }
        />
      </FormControl>

      <List>
        {tasksData ? (
          tasksData.length === 0 ? (
            <Typography m={2}>Няма добавени задачи...</Typography>
          ) : (
            tasksData.map((task) => (
              <ListItem
                key={task._id}
                secondaryAction={
                  <Tooltip title="Изтрий">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      <DeleteIcon sx={{ color: theme.palette.error.main }} />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemAvatar>
                  <Checkbox
                    edge="start"
                    checked={task.isDone}
                    tabIndex={-1}
                    inputProps={{ "aria-labelledby": task._id }}
                    onChange={() => handleCheckTask(task._id, task.isDone)}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={task._id}
                  primary={task.title}
                  secondary={formatDate(task.createdAt)}
                  sx={{
                    textDecoration: task.isDone
                      ? "line-through"
                      : theme.typography.body1.fontWeight,
                  }}
                />
              </ListItem>
            ))
          )
        ) : (
          "Зареждане..."
        )}
      </List>
    </Stack>
  );
};

export default HomeTasksList;
