  import { useState,useEffect } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'

  import { useQuery } from "@tanstack/react-query";


  import AddTodo from './components/add-todo';
  import TodosList from './components/todos-list';
  import Login from './components/login';
  import Signup from './components/signup';
  import RoomCreate from './components/roomcreate';
  import RoomJoin from './components/roomjoin';
  import Room from './components/room';

  import 'bootstrap/dist/css/bootstrap.min.css';
  import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';

  import { Link } from 'react-router-dom';
  import { BrowserRouter, Routes, Route,Router } from 'react-router-dom'; 

  import TodoDataService from './services/todos';
  import HomeRoom from './components/homeroom';

  function App() {
    //useState is a React Hook that lets you add a state variable to your component.
    //The set function that lets you update the state and trigger a re-render
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedCode = localStorage.getItem('room_code');
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(storedUser);
      if (storedCode) {setRoomCode(storedCode)}else{setRoomCode(storedCode)};
    }, []);

      // 用于更新状态的回调函数
  const set_room_code = (code) => {
    setRoomCode(code); // 更新父组件的状态
  };

    // login, signup 和 logout 函数定义
    async function login(user = null) { // 默认参数 user 为 null
      try {
          const response = await TodoDataService.login(user);
          setToken(response.data.token);
          setUser(user.username);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', user.username);
          setError('');
      } catch (e) {
          console.error('login error:', e);
          setError(e.toString());
      }
  }

    const logout = async () => {
      setToken('');
      setUser('');
      localStorage.setItem('token', '');
      localStorage.setItem('user', '');
    };

    const signup = async (user = null) => {
      try {
        const response = await TodoDataService.signup(user); // 使用 async/await 替代 .then
        setToken(response.data.token); // 保存 token
        setUser(user.username); // 保存用户名
        localStorage.setItem('token', response.data.token); // 将 token 存入本地存储
        localStorage.setItem('user', user.username); // 将用户名存入本地存储
        setError(''); // 清空错误
    } catch (e) {
        console.error('Error during login:', e); // 打印错误日志
        setError(e.toString()); // 设置错误状态
    }
    };

    return (
        <div className="App">
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className="nav-link" to={"/todos"}>Todos</Link>
                  <Link className="nav-link" to={roomCode?'/room/'+roomCode :"/homeroom"}>MusicRoom</Link>
                  {user ? (
                    <Link className="nav-link" to={"/logout"}  onClick={logout}>Logout ({user})</Link>
                  ) : (
                    <>
                      <Link className="nav-link" to={"/login"}>Login</Link>
                      <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>


          <div className="container mt-4">
          <Routes>
              <Route path={"/"} element={<TodosList token={token} />} /> 
              <Route path={"/todos"} element={<TodosList token={token} />} />
              <Route path="/todos/create" element={<AddTodo token={token} />} />
              <Route path="/todos/:id" element={<AddTodo token={token} />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/signup" element={<Signup signup={signup} />} />
              <Route path="/homeroom" element={<HomeRoom token={token} set_room_code={set_room_code}  />} />
              <Route path="/roomcreate" element={<RoomCreate token={token} set_room_code={set_room_code} />} />
              <Route path="/roomjoin" element={<RoomJoin token={token} set_room_code={set_room_code} />} />
              <Route path="/room/:roomCode" element={<Room token={token} set_room_code={set_room_code} />} />
          </Routes>
          </div>

          <footer className="text-center text-lg-start bg-light text-muted mt-4">
            <div className="text-center p-4">
              © Copyright - 
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset fw-bold text-decoration-none"
                href="https://twitter.com/greglim81"
              >
                Greg Lim
              </a> 
              - 
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-reset fw-bold text-decoration-none"
                href="https://twitter.com/danielgarax"
              >
                Daniel Correa
              </a>
            </div>
          </footer>
        </div>



    );
  }

  export default App;

  // function App() {
  //   const [count, setCount] = useState(0)

  //   return (
  //     <>
  //       <div>
  //         <a href="https://vite.dev" target="_blank">
  //           <img src={viteLogo} className="logo" alt="Vite logo" />
  //         </a>
  //         <a href="https://react.dev" target="_blank">
  //           <img src={reactLogo} className="logo react" alt="React logo" />
  //         </a>
  //       </div>
  //       <h1>Vite + React</h1>
  //       <div className="card">
  //         <button onClick={() => setCount((count) => count + 1)}>
  //           count is {count}
  //         </button>
  //         <p>
  //           Edit <code>src/App.jsx</code> and save to test HMR
  //         </p>
  //       </div>
  //       <p className="read-the-docs">
  //         Click on the Vite and React logos to learn more
  //       </p>
  //     </>
  //   )
  // }
