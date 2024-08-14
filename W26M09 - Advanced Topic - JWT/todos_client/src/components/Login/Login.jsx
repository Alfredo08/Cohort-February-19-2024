import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigate();

    const processLogin = async (event) => {
        event.preventDefault();
        const loginData = {email, password};
        try {
            const response = await axios.post("http://localhost:8080/login", loginData);
            localStorage.setItem('token', response.data.token);
            navigation('/dashboard');
        }
        catch(err){
            // Display the error on the form
        }

    }

    return(
        <>
            <h2> Login </h2>
            <form onSubmit={processLogin}>
                <div>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input type="text" 
                           id="email"
                           name="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div>
                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" 
                           id="password"
                           name="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} />

                </div>
                <button>
                    Login
                </button>
            </form>
        </>
    );
}

export default Login;