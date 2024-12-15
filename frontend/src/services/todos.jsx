import axios from 'axios';
class TodoDataService{
    getAll(token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('https://ldb123.pythonanywhere.com/api/todos/');[DCB7]
    }
    createTodo(data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post("https://ldb123.pythonanywhere.com/api/todos/", data);
    }
    updateTodo(id, data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`https://ldb123.pythonanywhere.com/api/todos/${id}`, data);
    }
    deleteTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`https://ldb123.pythonanywhere.com/api/todos/${id}`);
    }
    completeTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`https://ldb123.pythonanywhere.com/api/todos/${id}/complete/`);
    }
    login(data){
        return axios.post("https://ldb123.pythonanywhere.com/api/login/", data);
    }
    signup(data){
        return axios.post("https://ldb123.pythonanywhere.com/api/signup/", data);
    }


    createRoom(data){
        return axios.post("http://localhost:8000/api/room-create", data,{
            withCredentials: true, // 确保请求携带凭据（如 cookies）
        });
    }
}
export default new TodoDataService();
