export interface Todo {
    id: number;
    todoTitle: string;
    todoDesc: string;
    todoAsignee: string;
    inProgress: boolean;
    isDone: boolean;
  }
  
export interface SingleTodo{
  todoTitle: string;
  todoDesc: string;
  todoAsignee: string;
}