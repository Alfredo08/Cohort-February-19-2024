import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../Todo/Todo";
import axios from 'axios';

const Dashboard = () => {
    
    const [todos, setTodos] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        const loadTodos = async () => {
            const URL = "http://localhost:8080/todosByUser";
            const config = {
                headers: {
                    user_token: localStorage.getItem('token')
                }
            }
            try{
                const response = await axios.get(URL, config);
                setTodos(response.data.todos);
            }
            catch(error) {
                navigation('/login');
            }
        }

        loadTodos();
    }, []);

    const processLogout = () => {
        localStorage.removeItem('token');
        navigation('/login');
    }

    return(
        <>
            <h2> Your list of todos </h2>
            {todos.map((todo, index) => {
                return (<Todo description={todo.description}
                              status={todo.status}
                              key={index}/>)
            })}

            <button onClick={processLogout}>
                Logout
            </button>
        </>
    );
}

export default Dashboard;