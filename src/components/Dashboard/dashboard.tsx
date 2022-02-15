import React, { useEffect, useState } from "react";
import "../Dashboard/dashboardStyle.css";
import Header from "../Header/header";
import InputField from "../InputFeild/InputFeild";
import { Todo } from "./dashboardInterface";
import "antd/dist/antd.css";
import { Avatar, List, Space } from "antd";
import Icon from "../../assets/profile.png";
import { AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

const Dashboard: React.FC = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const[todoCount,setTodoCount] = useState<number>(0);
  const[inProgressCount,setInProgressCount] = useState<number>(0);
  const[isDoneCount,setIsDoneCount] = useState<number>(0);


  
  const handleAdd = (singleTodo: Todo) => {
    setTodoList([...todoList, singleTodo]);
    handleCount();
  };

  const handleCount = () => {
    todoList.map(todo=>{
      if(todo.isDone && todo.inProgress){
        setIsDoneCount(isDoneCount+1);
      }
      else if(!todo.isDone && !todo.inProgress){
        setTodoCount(todoCount+1);
      }
      else{
        setInProgressCount(inProgressCount+1);
      }
    })
  }
  //Function To Delete Task
  const handleDelete = (id: number) => {
    const temp = todoList[id];
    setTodoList(todoList.filter((t) => t.id !== id));
    handleCount();
  };
  // Function to Mark Task inProgress 
  const handleInProgress = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, inProgress: true, isDone: false } : todo
      )
    );
    handleCount();
  };
  // Function to Mark Task isDone
  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: true, inProgress: false } : todo
      )
    );
    handleCount();
  };

  // Function to Drag and Drop Tasks and Reorder Task 
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log("destination", destination);
    console.log("source", source);
    if(!destination){
        return;
    }
    if(source.droppableId === destination.droppableId && source.index === destination.index){
        return;
    }
    let add: Todo, 
    activeTodo = todoList;
    if(source.droppableId === "todo__list"){
        add = activeTodo[source.index];
    }
    else if(source.droppableId === "todo__progress"){
        add = todoList[source.index];
    }
    else{ 
        add = todoList[source.index];
    }

    if(destination.droppableId === "todo__list"){
        setTodoList(
          todoList.map((todo) =>
            todo.id === add.id ? { ...todo, isDone: false, inProgress: false } : todo
          )
        );
    }
    else if(destination.droppableId === "todo__progress"){ 
      setTodoList(
        todoList.map((todo) =>
          todo.id === add.id ? { ...todo, isDone: false, inProgress: true } : todo
        )
      );
    }
    else{ 
      setTodoList(
        todoList.map((todo) =>
          todo.id === add.id ? { ...todo, isDone: true, inProgress: false } : todo
        )
      );
    }
    handleCount();
  };
  const handleFilter = () =>{

  }

  
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="dashboard__section">
          <div className="dashboard__header">
            <Header />
          </div>
          <div>
            <InputField
              todoList={todoList}
              setTodoList={setTodoList}
              handleAdd={handleAdd}
            />
          </div>
          <div className="dashboard__container">
            <section className="dashboard__todo">
              <h1 className="todo__title">Todo </h1>

              <div className="todo_conatiner">
                <Droppable droppableId="todo__list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={todoList}
                        size="large"
                        renderItem={(todo, index) =>
                          !todo.isDone &&
                          !todo.inProgress && (
                            <div>
                              <Draggable
                                draggableId={todo.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <List.Item>
                                      <List.Item.Meta
                                        avatar={<Avatar src={Icon} />}
                                        title={todo.todoTitle}
                                        description={todo.todoDesc}
                                      />
                                    </List.Item>
                                    <List.Item
                                      extra={todo.todoAsignee}
                                      actions={[
                                        <Space
                                          onClick={() => handleDelete(todo.id)}
                                        >
                                          {React.createElement(AiFillDelete)}
                                        </Space>,
                                        <Space
                                          onClick={() =>
                                            handleInProgress(todo.id)
                                          }
                                        >
                                          {React.createElement(GrInProgress)}
                                        </Space>,
                                        <Space
                                          onClick={() => handleDone(todo.id)}
                                        >
                                          {React.createElement(MdDone)}
                                        </Space>,
                                      ]}
                                    ></List.Item>
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          )
                        }
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </section>
            <section className="dashboard__todo">
              <h1 className="todo__title">In Progress </h1>
              <div className="todo_conatiner">
                <Droppable droppableId="todo__progress">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={todoList}
                        size="large"
                        renderItem={(todo, index) =>
                          todo.inProgress &&
                          !todo.isDone && (
                            <div>
                              <Draggable
                                draggableId={todo.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <List.Item>
                                      <List.Item.Meta
                                        avatar={<Avatar src={Icon} />}
                                        title={todo.todoTitle}
                                        description={todo.todoDesc}
                                      />
                                    </List.Item>
                                    <List.Item
                                      extra={todo.todoAsignee}
                                      actions={[
                                        <Space
                                          onClick={() => handleDelete(todo.id)}
                                        >
                                          {React.createElement(AiFillDelete)}
                                        </Space>,
                                        <Space
                                          onClick={() =>
                                            handleInProgress(todo.id)
                                          }
                                        >
                                          {React.createElement(GrInProgress)}
                                        </Space>,
                                        <Space
                                          onClick={() => handleDone(todo.id)}
                                        >
                                          {React.createElement(MdDone)}
                                        </Space>,
                                      ]}
                                    ></List.Item>
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          )
                        }
                      />
                    {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </section>
            <section className="dashboard__todo">
              <h1 className="todo__title">Done </h1>
              <div className="todo_conatiner">
                <Droppable droppableId="todo__done">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={todoList}
                        size="large"
                        renderItem={(todo, index) =>
                          todo.isDone &&
                          !todo.inProgress && (
                            <div>
                              <Draggable
                                draggableId={todo.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <List.Item>
                                      <List.Item.Meta
                                        avatar={<Avatar src={Icon} />}
                                        title={todo.todoTitle}
                                        description={todo.todoDesc}
                                      />
                                    </List.Item>
                                    <List.Item
                                      extra={todo.todoAsignee}
                                      actions={[
                                        <Space
                                          onClick={() => handleDelete(todo.id)}
                                        >
                                          {React.createElement(AiFillDelete)}
                                        </Space>,
                                        <Space
                                          onClick={() =>
                                            handleInProgress(todo.id)
                                          }
                                        >
                                          {React.createElement(GrInProgress)}
                                        </Space>,
                                        <Space
                                          onClick={() => handleDone(todo.id)}
                                        >
                                          {React.createElement(MdDone)}
                                        </Space>,
                                      ]}
                                    ></List.Item>
                                  </div>
                                )}
                              </Draggable>
                            </div>
                          )
                        }
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </section>
          </div>
        </section>
      </DragDropContext>
    </>
  );
};

export default Dashboard;


