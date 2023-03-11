import uuid from "react-uuid";
import zustand from "zustand";
import create from 'zustand';
import { TaskStore } from "../Types/Task";
export const useTaskStore = create<TaskStore>((set,get)=>({
    tasks: [{
        id:'sadasdas',
        title:'default',
        createdTime:12312321
    }],
    createTask: (title)=>{
        const {tasks} = get()
        const newTask ={
            id: uuid(),
            title,
            createdTime: Date.now(),
        }
        set({
            tasks:[newTask].concat(tasks), 
        })
    },
    updateTask:(id , title)=>{
        const {tasks}=get()
        set({
            tasks: tasks.map((task)=>({
                ...task,
                title: task.id === id ? title : task.title

            }))
        })
    },
    removeTask:(id)=>{
        const {tasks}=get()
        set({
            tasks: tasks.filter((task)=>
                 task.id !== id 

            )
        })
    },

}))