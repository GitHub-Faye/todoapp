import React, { useState, useEffect } from 'react';
import TodoDataService from '../services/todos'; // 假设这是服务层文件
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

import Alert from 'react-bootstrap/Alert';

import moment from 'moment';

const TodosList = ({ token }) => {
    const [todos, setTodos] = useState([]);

    // useEffect 在组件挂载和 token 改变时运行
    useEffect(() => {
        if (token) {
            retrieveTodos();
        }
    }, [token]);

    // 获取任务列表的方法
    const retrieveTodos = async () => {
        try {
            const response = await TodoDataService.getAll(token); // 使用 async/await
            setTodos(response.data); // 设置任务列表
        } catch (e) {
            console.error('Error fetching todos:', e);
        }
    };


    const deleteTodo = async (todoId) => {
        try {
          await TodoDataService.deleteTodo(todoId, token);
          retrieveTodos();  // 删除成功后重新获取待办事项
        } catch (e) {
          console.error("Error deleting todo:", e);  // 错误处理
        }
      };

    const completeTodo = async (todoId) => {
    try {
        await TodoDataService.completeTodo(todoId, token);
        retrieveTodos();  // 完成后重新获取待办事项
        console.log("Todo completed:", todoId);  // 打印完成的 todoId
    } catch (e) {
        console.error("Error completing todo:", e);  // 更详细的错误信息
    }
    };
    return (
        <Container>
            {/* 如果没有 token，显示警告提示 */}
            {token == null || token === "" ? (
                <Alert variant="warning">
                    You are not logged in. Please{' '}
                    <Link to="/login">login</Link> to see your todos.
                </Alert>
            ) : (<div>
                <Link to={"/todos/create"}>
                    <Button variant="outline-info" className="mb-3">
                    Add To-do
                    </Button>
                    </Link>
            {todos.map((todo) => (
                <Card key={todo.id} className="mb-3">
                    <Card.Body>
                        <div className={`${todo.completed ? "text-decoration-line-through" : ""}`}>
                            <Card.Title>{todo.title}</Card.Title>
                            <Card.Text><b>Memo:</b> {todo.detail}</Card.Text>
                            <Card.Text>Date created:{moment(todo.create_time).format("Do MMMM YYYY")}</Card.Text>
                            
                        </div>
                        {!todo.completed &&
                        <Link 
                            to={`/todos/${todo.id}`} 
                            state={{ currentTodo: todo }} // 使用 `state` 传递数据
                        >
                            <Button variant="outline-info" className="me-2">
                                Edit
                            </Button>
                        </Link>}
                        <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </Button>
                        <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>
                        Complete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
            )}
            </Container>
        );
    }

export default TodosList;