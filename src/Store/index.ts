import uuid from "react-uuid";
import zustand from "zustand";
import create from 'zustand';
import { TaskStore } from "../Types/Task";
import {isTaskStore} from '../middlewares/LocalStorageMidd'
import {localStorageUpdate} from '../middlewares/LocalStorageMidd'

const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))

export const useTaskStore = create<TaskStore>(localStorageUpdate((set,get)=>({
    tasks: currentState,
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

})))