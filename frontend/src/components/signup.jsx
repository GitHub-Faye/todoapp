import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6 的导航钩子
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Signup = ({ signup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 用于替代 props.history.push

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = () => {
        signup({ username, password }); // 调用传入的 signup 方法
        navigate('/'); // 使用 useNavigate 进行导航
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSignup}>
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
};

export default Signup;
