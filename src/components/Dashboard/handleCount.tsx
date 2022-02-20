import { useEffect, useState } from 'react'
import { Todo } from './dashboardInterface';

const HandleCount = (todoList:Array<Todo>) => {
    const[todoCount,setTodoCount] = useState<number>(0);
    const[inProgressCount,setInProgressCount] = useState<number>(0);
    const[isDoneCount,setIsDoneCount] = useState<number>(0);
    useEffect(() => {
      setTodoCount(todoList.filter((todo) => todo.inProgress === false && todo.isDone===false).length);
      setInProgressCount(todoList.filter((todo) => todo.inProgress === true).length);
      setIsDoneCount(todoList.filter((todo) => todo.isDone === true).length);
    },[todoList]);
    return [todoCount,inProgressCount,isDoneCount];
}

export default HandleCount;