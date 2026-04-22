import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    async function handleLogIn(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) throw new Error("Invalid email or password");
            const data = await response.json();
            localStorage.setItem('loginToken', data.token);
            toast.success("🎉 Welcome back!", { theme: "colored" });
            setEmail("");
            setPassword("");
            setTimeout(() => navigate("/dashboard"), 700);
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            {/* Scoped styles for gradient & glass effects */}
            <style>{`
                .login-bg {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #f59e0b 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 1rem;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
                    width: 100%;
                    max-width: 480px;
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .glass-input {
                    background: rgba(248, 250, 252, 0.6);
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    transition: all 0.2s ease;
                }
                .glass-input:focus {
                    background: #ffffff;
                    border-color: #0ea5e9;
                    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
                }
                .gradient-btn {
                    background: linear-gradient(135deg, #0ea5e9, #10b981);
                    border: none;
                    color: white;
                    font-weight: 600;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35);
                }
                .gradient-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
                    color: white !important;
                }
                .gradient-btn:active:not(:disabled) {
                    transform: translateY(0);
                }
                .gradient-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .link-hover {
                    color: #475569;
                    transition: color 0.2s;
                }
                .link-hover:hover {
                    color: #0ea5e9 !important;
                }
            `}</style>

            <div className="login-bg">
                <div className="glass-card p-4 p-md-5">
                    {/* Brand Header */}
                    <div className="text-center mb-4">
                        <h2 className="fw-bold mb-1" style={{ 
                            background: 'linear-gradient(135deg, #0284c7, #059669, #ca8a04)', 
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.03em'
                        }}>
                            Workasana
                        </h2>
                        <p className="text-muted mb-0 fs-6">Sign in to continue</p>
                    </div>

                    {/* Error Alert */}
                    {submitError && (
                        <div className="alert alert-danger d-flex align-items-center mb-4 rounded-pill px-4 py-2" role="alert">
                            <svg className="bi flex-shrink-0 me-2" width="20" height="20" fill="currentColor"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                            <span className="small">{submitError}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogIn}>
                        <div className="mb-4">
                            <label htmlFor="emailInput" className="form-label fw-medium text-secondary small">Email Address</label>
                            <input
                                id="emailInput"
                                type="email"
                                className="form-control glass-input rounded-pill px-4 py-3"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="passwordInput" className="form-label fw-medium text-secondary small">Password</label>
                            <input
                                id="passwordInput"
                                type="password"
                                className="form-control glass-input rounded-pill px-4 py-3"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn gradient-btn w-100 rounded-pill py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Signing in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="text-center mt-4 pt-3 border-top">
                        <span className="text-muted small">Don't have an account? </span>
                        <Link to="/signup" className="link-hover fw-semibold text-decoration-none">
                            Create One →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer 
                position="bottom-right" 
                theme="colored"
                toastStyle={{ borderRadius: '12px', fontWeight: 500 }}
            />
        </>
    );
}

export default Login;