import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack,
  Paper,
  TextField,
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTask, postTask, updateTask, deleteTask } from '../../../api';
import { setTasks, addTask, onUpdateTask, onDeleteTask } from '../../../store/actions';
import './task.css'

export default function AppTasks() {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState({
    task: '',
    complete: false
  })
  const { tasksList } = useSelector((state) => state.taskReducers);
  const dispatch = useDispatch();

  useEffect(() => {
    setTasks([...tasksList])
  }, [tasksList])

  const handleSubmit = (e) => {
    e.preventDefault()
    postTask(currentTask).then((res) => {
      dispatch(addTask(res))
    })
  }

  const handleUpdate = (e, id) => {
    e.preventDefault()
    const index = tasks.findIndex((task) => task._id === id);
    tasks[index] = { ...tasks[index] };
    tasks[index].completed = !tasks[index].completed;
    console.log(tasks[index])
    updateTask(id, {
      completed: tasks[index].completed,
    }).then((res) => {
      dispatch(onUpdateTask(id, tasks[index].completed))
    })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    deleteTask(id).then((res) => {
      dispatch(onDeleteTask(id))
    })
  }



  return (
    <div className="App flex">
      <Paper elevation={3} className="container">
        <div className="heading">Tasks </div>
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{ margin: "15px 0" }}
        >
          <TextField
            variant="outlined"
            size="small"
            style={{ width: "80%" }}
            value={currentTask.task}
            required={true}
            onChange={(e) => setCurrentTask({ ...currentTask, task: e.target.value })}
            placeholder="Add New TO-DO"
          />
          <span style={{ marginInline: "4px" }}></span>
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant="outlined"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <div>
          {tasks.map((task) => (
            <Paper
              key={task._id}
              className="flex task_container"
            >
              <Checkbox
                checked={task.completed}
                onClick={(e) => handleUpdate(e, task._id)}
                color="primary"
              />
              <div
                className={
                  task.completed
                    ? "task line_through"
                    : "task"
                }
              >
                {task.task}
              </div>
              <Button
                onClick={(e) => handleDelete(e, task._id)}
                color="secondary"
              >
                delete
              </Button>
            </Paper>
          ))}
        </div>
      </Paper>
    </div>
  );
}

