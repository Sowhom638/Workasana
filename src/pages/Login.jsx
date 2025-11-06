import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogIn(e){
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            if(!response.ok) throw new Error("Error while logging the user");
            const data = await response.json();
            console.log("Success: ", data);
            localStorage.setItem('loginToken', data.token);
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container w-75 mt-4">
                <h2 className="mb-4 text-center">Workasana</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white border-bottom text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Log In</h5>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleLogIn}>

                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="emailInput" placeholder="johndoe@example.com" required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input onChange={(e)=>setPassword(e.target.value)} type="text" className="form-control" id="passwordInput" placeholder="Enter the password" required/>
                            </div>
                            <button className="btn btn-info" type="submit">Log In</button>
                        </form>
                        <Link className="text-decoration-none" to="/signup"><span className="text-secondary">Have no account?</span> Create One</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;