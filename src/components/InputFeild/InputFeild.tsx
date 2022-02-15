import React, { useState } from 'react';
import '../InputFeild/InputFieldStyle.css';
import { Todo } from '../Dashboard/dashboardInterface';
import { Button, Input } from 'antd';

interface props {
    todoList: Array<Todo>;
    setTodoList: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    handleAdd: (singleTodo:Todo) => void;
}

const InputFeild: React.FC<props> = ({ todoList, setTodoList, handleAdd }) => {
    const formValues = {
        id:0,
        todoTitle: "",
        todoDesc: "",
        todoAsignee: "",
        inProgress: false,
        isDone: false,
    };
    const[singleTodo, setSingleTodo] = useState<Todo>(formValues);
    //function to handleChange in input feild
    const handleChange = (e:any) => {
        e.preventDefault();
        const {name,value} = e.target;
        setSingleTodo({...singleTodo, [name]: value });
      };
     //function to handleChange in add todo task
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const result = {
            id:todoList.length+1,
            todoTitle: singleTodo.todoTitle,
            todoDesc: singleTodo.todoDesc,
            todoAsignee: singleTodo.todoAsignee,
            inProgress: false,
            isDone: false,
        }
        handleAdd(result);
        setSingleTodo(formValues);
    };

    return (
    <div className="input">
        <div className="input__header">
            <h1>Add Task To Taskify</h1> 
        </div>
        <form className="input__form"
            onSubmit={handleSubmit}
        >
            <Input type="text" 
            showCount maxLength={20}
            placeholder="Add Todo Title"
            onChange = {handleChange}
            name="todoTitle"
            className="form__data" 
            size = "large"
            value = {singleTodo.todoTitle}
            />

            <Input type="text"
            showCount maxLength={40}
            placeholder="Add Todo Desc" 
            onChange = {handleChange}
            name="todoDesc"
            size = "large"
            className="form__data"
            value = {singleTodo.todoDesc}
            
            />

            <Input type="text"
            showCount maxLength={20}
            placeholder="Add Todo Asignee" 
            className="form__data"
            onChange = {handleChange}
            size = "large"
            name="todoAsignee"
            value = {singleTodo.todoAsignee}
            />
            <button 
            className="form__submit"
            color = "yellow"
            > Add Task</button>
        </form>
    </div>
    );
};

export default InputFeild;
