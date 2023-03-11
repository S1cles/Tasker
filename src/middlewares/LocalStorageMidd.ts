import { State, StateCreator } from "zustand";
import { TaskStore } from "../Types/Task";

export function isTaskStore(object: any): object is TaskStore {
  return "tasks" in object;
}

export const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState , ...args) => {
        if (isTaskStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
    set(nextState,...args)  
    },
      get,
      api
    );
