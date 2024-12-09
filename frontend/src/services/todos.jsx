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
}
export default new TodoDataService();
