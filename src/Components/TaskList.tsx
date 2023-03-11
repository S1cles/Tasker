import { Box, Button, Checkbox, Input, ListItem } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { useTaskStore } from "../Store";
import { Task, TaskStore } from "../Types/Task";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

interface TaskListType {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdit: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}

const TaskList: React.FC<TaskListType> = ({
  id,
  title,
  onDone,
  onEdit,
  onRemove,
}) => {
  const [check, setCheck] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  //   const [tasks, createTask, updateTask, removeTask] = useTaskStore((state) => [
  //     state.tasks,
  //     state.createTask,
  //     state.updateTask,
  //     state.removeTask,
  //   ]);

  const editInput = useRef<HTMLInputElement>(null);
  const handleEdit = () => {
    if (editMode) {
      onEdit(id, inputValue);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  useEffect(() => {
    if (editMode && editInput.current) {
      editInput.current.focus();
    }
  }, [editMode]);

  return (
    <ListItem display={"flex"} justifyContent={"space-between"}>
      <Checkbox
        disabled={editMode ? true : false}
        onChange={() => {
          setCheck(!check);
          setTimeout(() => onDone(id), 800);
        }}
        isChecked={check}
        borderColor={"#1A202C"}
        colorScheme="teal"
        width={"90%"}
      >
        {editMode ? (
          <div style={{ background: "teal" }}>
            <Input
              defaultValue={title}
              style={{
                border: "black 2px solid",
                position: "absolute",
                left: "0",
                top: "0",
              }}
              ref={editInput}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit();
                }
              }}
            />
          </div>
        ) : (
          title
        )}
      </Checkbox>
      <Box gap={"5px"} display={"flex"}>
        {editMode ? (
          <>
            <Button onClick={handleEdit}>
              <CheckIcon />{" "}
            </Button>
            <Button onClick={() => setEditMode(false)}>
              <CloseIcon />{" "}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)}>
              <EditIcon color="gray.600" />
            </Button>
            <Button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this task?"
                );
                if (confirmed) {
                  onRemove(id);
                }
              }}
            >
              <DeleteIcon color="gray.600" />{" "}
            </Button>
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default TaskList;
