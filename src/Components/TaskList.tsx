import { Checkbox, ListItem } from "@chakra-ui/react";
import React from "react";
import { useTaskStore } from "../Store";
import { Task, TaskStore } from "../Types/Task";

interface TaskListType{
    id:string;
    title: string;
    onDone:(id:string)=>void
    onEdit:(id:string,value:string)=>void
    onRemove:(id:string)=>void
}


const TaskList:React.FC<TaskListType>  = ({id,title,onDone,onEdit,onRemove}) => {

    const [tasks, createTask, updateTask, removeTask] = useTaskStore((state) => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
      ]);

  return (
    <ListItem>
      <Checkbox>
        {title}
      </Checkbox>
    </ListItem>
  );
};

export default TaskList;
