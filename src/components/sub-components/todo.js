import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  LinearProgressWithLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import completedAudio from "../audio/completed.mp3";
import deletedAudio from "../audio/deleted.mp3";
import clickAudio from "../audio/click.mp3";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function Todo() {
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Typography>Progress</Typography>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const audio = (variable) => {
    new Audio(variable).play();
  };
  const [input, setInput] = React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [i, setI] = React.useState(1);
  var [completedTask, setCompleted] = useState([]);
  var [percent, setPercent] = useState(0);
  if (i === 1) {
    if (window.localStorage.getItem("todo")) {
      setTodo(JSON.parse(window.localStorage.getItem("todo")));
    }

    setI(2);
  }
  if (i == 2) {
    completedTask = [];
    todo.map((val, key) => {
      if (val.completed == true) {
        completedTask.push(val);
      }
    });
    setPercent((completedTask.length / todo.length) * 100);

    setI(3);
  }
  if (i == 3) {
    if (isNaN(percent)) {
      setPercent(100);
    }
    setI(4);
  }
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: "1rem",
        width: "80%",
        marginInline: "auto",
        paddingBottom: "3rem",
      }}
    >
      <Typography color="primary" variant="button">
        Keep track of your work{" "}
      </Typography>

      <TextField
        label={"Add Task"}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        fullWidth
      />
      <Button
        variant="contained"
        style={{ paddingInline: "2rem", alignSelf: "flex-start" }}
        startIcon={<AddIcon />}
        onClick={() => {
          setI(2);
          audio(clickAudio);
          setTodo((task) => [
            ...task,
            {
              id: todo.length + 1,
              name: input,
              completed: false,
            },
          ]);
        }}
      >
        Add Task
      </Button>
      <LinearProgressWithLabel value={percent} />

      {todo.map((val, key) => {
        window.localStorage.setItem("todo", JSON.stringify(todo));
        return (
          <div
            key={key}
            style={{
              display: "flex",
              padding: "1rem",
              backgroundColor: "#272727",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Checkbox
              defaultChecked={val.completed}
              onClick={() => {
                // console.log(todo);
                if (val.completed == false) {
                  audio(completedAudio);
                }
                val.completed = !val.completed;
                setI(2);
                // setI(!val.completed);
                window.localStorage.setItem("todo", JSON.stringify(todo));
              }}
            />
            <Typography
              style={
                val.completed
                  ? {
                      flex: 1,
                      textDecoration: "line-through",
                      fontStyle: "italic",
                    }
                  : { flex: 1 }
              }
            >
              {val.name}
            </Typography>{" "}
            <Button
              color="error"
              onClick={() => {
                setI(2);
                audio(deletedAudio);
                setTodo(
                  todo.filter(function (person) {
                    return person.id !== val.id;
                  })
                );
                window.localStorage.setItem(
                  "todo",
                  JSON.stringify(
                    todo.filter(function (person) {
                      return person.id !== val.id;
                    })
                  )
                );
              }}
              variant="contained"
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
