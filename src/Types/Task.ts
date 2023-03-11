export interface Task {
    id:string;
    title:string;
    createdTime: number;
}
export interface TaskStore{
    tasks: Task[];
    createTask: (title:string)=>void;
    updateTask:(id:string , title:string)=>void;
    removeTask:(id:string)=>void;
}