import React, { useState,useEffect } from "react";
import TodoDataService from "../services/todos";
import { Link,useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";


const AddTodo = (props) => {

    let initialTodoTitle = "";
    let initialTodoMemo = "";

    const [title, setTitle] = useState(initialTodoTitle); // Todo 标题的状态
    const [detail, setDetail] = useState(initialTodoMemo); // Todo 备注的状态
    const [submitted, setSubmitted] = useState(false); // 提交状态
    const [editing, setEditing] = useState(false); // 是否处于编辑模式

    const location = useLocation(); // 获取当前的路由信息
    const navigate = useNavigate(); // 用于导航


    useEffect(() => {
        if (location.state && location.state.currentTodo) {
            setEditing(true);
            const { title, detail } = location.state.currentTodo;
            setTitle(title || ""); // 设置标题
            setDetail(detail || ""); // 设置备注
        }
    }, [location.state]);


    // React.useEffect(() => {
    //     if (props.todo) {
    //       setTitle(props.todo.title || "");
    //       setDetail(props.todo.detail || "");
    //       setEditing(true);
    //     }
    //   }, [props.todo]);

        // 更新标题
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

      // 更新备注
    const onChangeMemo = (e) => {
        setDetail(e.target.value);
    };


        // 保存 Todo
    const saveTodo = () => {
        var data = {
        title,
        detail,
        completed: props.todo?.completed || false,
        };

        if (editing) {
            TodoDataService.updateTodo(
            location.state.currentTodo.id,
            data, props.token)
            .then(response => {
            setSubmitted(true);
            console.log(response.data)
            })
            .catch(e => {
            console.log(e);
            })
            }
            else {
        TodoDataService.createTodo(data, props.token)
        .then(() => {
            setSubmitted(true);
          })
          .catch((e) => {
            console.error("Error saving Todo:", e);
          });
        }
            }
    // 如果是编辑模式，调用更新接口；否则调用创建接口



    
      return (
        <Container>
          {submitted ? (
            <div>
              <h4>Todo {editing ? "updated" : "submitted"} successfully!</h4>
              <Link to="/todos/">Back to Todos</Link>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{editing ? "Edit" : "Create"} Todo</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="e.g. Buy gift tomorrow"
                  value={title}
                  onChange={onChangeTitle}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={detail}
                  onChange={onChangeMemo}
                />
              </Form.Group>
              <Button variant="info" onClick={saveTodo}>
                {editing ? "Update" : "Add"} To-do
              </Button>
            </Form>
          )}
        </Container>
      );
};




export default AddTodo;