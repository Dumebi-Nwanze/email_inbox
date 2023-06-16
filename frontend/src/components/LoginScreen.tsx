import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import './styles/Login.css'
import { AuthContext, AuthState } from '../AuthProvider';

function LoginScreen() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const auth = useContext(AuthContext)

    const navigate = useNavigate();
    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true);
        if (email === "" && password === "") return alert("Fill all fields");

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
            method: "POST",
            credentials: "include",
            cache: "no-cache",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()


        if (data.error) {
            return alert(data.error);
        }
        const decodedToken: {
            uid: number,
            name: string,
            email: string,
        } | null = decodeToken(data.accessToken);
        const payload: AuthState = {
            user: { name: decodedToken?.name ?? "", email: decodedToken?.email ?? "", },
            token: data.accessToken ?? null,
            isAuthenticated: data.accessToken != null,
        }
        localStorage.setItem('authState', JSON.stringify(data));
        console.log("Saved to local storage")
        auth?.dispatch({ type: "LOGIN", payload })
        setEmail("");
        setPassword("");
        setIsLoading(false);
        navigate("/");
    };
    return (
        <div className="login">
            <h1 className="p-4 text-2xl font-bold">Login</h1>
            <p>Fill in the feilds below</p>
            <form className="login__form">
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    type="email"
                    className="textInput"
                />
                <input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    type="password"
                    className="textInput"
                />

                <button
                    disabled={isLoading}
                    type="submit"

                    onClick={(e) => {
                        login(e);
                    }}
                    className="login__btn bg-purple-700"
                >
                    Log In
                </button>
            </form>

        </div>
    );

}

export default LoginScreen