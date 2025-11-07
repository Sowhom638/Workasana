import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate()

    async function handleSignUp(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })
            if (!response.ok) throw new Error("Error while creating the user");
            const data = await response.json();
            toast.success("User is registered successfully");
            setName("");
            setEmail("");
            setPassword("");
            setTimeout(() => navigate("/login"), 700);
            
        } catch (error) {
            setSubmitError(error);
            toast.warning(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <>
            <div className="container w-75 mt-4">
                <h2 className="mb-4 text-center">Workasana</h2>
                {submitError && (
                    <div className="alert alert-danger">{JSON.stringify(submitError)}</div>
                )}
                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white border-bottom text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Sign Up</h5>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSignUp}>
                            <div class="mb-3">
                                <label htmlFor="nameInput" className="form-label">Name</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="nameInput" placeholder="John Doe" required />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="emailInput" placeholder="johndoe@example.com" required />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="passwordInput" className="form-label">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="text" className="form-control" id="passwordInput" placeholder="Enter the password" required />
                            </div>
                           <button disabled={isSubmitting} className="btn btn-info" type="submit">
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Signing...
                                            </>
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </button>
                        </form>
                        <Link className="text-decoration-none" to="/login"><span className="text-secondary">Already have an account? Go to</span> Log In</Link>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default Signup;