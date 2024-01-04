import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    return (
        <div className='auth'>
            <Login />
            <Signup />
        </div>
    )
}

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/auth/login", { userName, password });
            console.log("Response from server:", res.data);// console.log("acess_token recieved from backend", access_token);
            setCookies("access_token", res.data.token);     //In the response variable we are getting token from backend and here in setCookie function we are setting the recieved token as a cookie
            window.localStorage.setItem("userID", res.data.userID);
            window.localStorage.setItem("access_token", res.data.token);
            navigate('/');
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='signupContainer'>
            <h2>Login</h2>
            <Form
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit} />
        </div>
    );
};

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(userName);
            console.log(password);
            await axios.post("http://localhost:3001/auth/register", { userName, password });
            alert("You are registered!");
        }
        catch (err) {
            console.error('Error during registration:', err.message || err.response.data);
        }
    };

    return (
        <div className='signupContainer'>
            <h2>Signup</h2>
            <Form
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit} />
        </div>
    );
};

const Form = ({ userName, setUserName, password, setPassword, handleSubmit }) => {
    return (
        <div className='auth-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='userName'> username:
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor='password'> Password:
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Auth;
