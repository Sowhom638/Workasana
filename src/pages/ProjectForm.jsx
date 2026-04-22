import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function ProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const navigate = useNavigate();

    async function handleProjectCreation(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: projectName,
                    description: projectDescription
                })
            });
            if (response.status === 401) {
                localStorage.removeItem('loginToken');
                navigate('/login', { replace: true });
                throw new Error("Session expired. Please log in again.");
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to create project");
            }
            toast.success("🎉 Project created successfully!", { theme: "colored" });
            setProjectName("");
            setProjectDescription("");
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
            {/* ✅ EXACT SAME STYLES AS DASHBOARD - Copy/paste ready */}
            <style>{`
                .dashboard-bg {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #f59e0b 100%);
                    padding: 1.5rem 1rem;
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
                }
                .glass-sidebar {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    border-radius: 1.25rem;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .sidebar-link {
                    color: #334155;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .sidebar-link:hover {
                    background: rgba(14, 165, 233, 0.1);
                    color: #0ea5e9;
                    transform: translateX(4px);
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
                    outline: none;
                }
                .glass-textarea {
                    background: rgba(248, 250, 252, 0.6);
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    transition: all 0.2s ease;
                    min-height: 120px;
                    resize: vertical;
                }
                .glass-textarea:focus {
                    background: #ffffff;
                    border-color: #0ea5e9;
                    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
                    outline: none;
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
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-in {
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>

            {/* ✅ EXACT SAME STRUCTURE AS DASHBOARD */}
            <div className="dashboard-bg">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    
                    {/* ✅ Header stays at top (same as Dashboard) */}
                    <Header />

                    {/* ✅ Glass Panel Card (same class as Dashboard) */}
                    <div className="glass-panel p-3 p-md-4 mt-4 animate-in">
                        
                        {/* Card Header */}
                        <div className="card-header bg-transparent border-0 text-center pb-3">
                            <h4 className="mb-0 fw-bold" style={{ 
                                background: 'linear-gradient(135deg, #0284c7, #059669, #ca8a04)', 
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Create New Project
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">Fill in the details to get started</p>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-3 g-md-4">
                                
                                {/* ✅ Sidebar (same glass-sidebar class as Dashboard) */}
                                <div className="col-lg-3">
                                    <div className="glass-sidebar p-3 h-100">
                                        <h6 className="text-secondary fw-bold mb-3 small text-uppercase tracking-wide">Navigation</h6>
                                        <ul className="list-unstyled mb-0">
                                            <li className="mb-2">
                                                <Link 
                                                    to="/dashboard" 
                                                    className="sidebar-link text-decoration-none p-3 rounded-3"
                                                >
                                                    <MdKeyboardArrowLeft className="fs-5" />
                                                    <span className="fw-medium">Back to Dashboard</span>
                                                </Link>
                                            </li>
                                            {/* Future nav items can go here */}
                                        </ul>
                                    </div>
                                </div>

                                {/* ✅ Main Form Content (same layout as Dashboard) */}
                                <div className="col-lg-9">
                                    
                                    {/* Error Alert */}
                                    {submitError && (
                                        <div className="alert alert-danger d-flex align-items-center mb-4 rounded-pill px-4 py-2" role="alert">
                                            <svg className="bi flex-shrink-0 me-2" width="20" height="20" fill="currentColor"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                                            <span className="small">{submitError}</span>
                                        </div>
                                    )}

                                    {/* Project Form */}
                                    <form onSubmit={handleProjectCreation}>
                                        
                                        {/* Project Name */}
                                        <div className="mb-4">
                                            <label htmlFor="projectName" className="form-label fw-medium text-secondary small">Project Name</label>
                                            <input
                                                id="projectName"
                                                type="text"
                                                className="form-control glass-input rounded-pill px-4 py-3"
                                                placeholder="e.g., Website Redesign, Mobile App Launch"
                                                value={projectName}
                                                onChange={(e) => setProjectName(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                                autoComplete="off"
                                                maxLength={100}
                                            />
                                            <small className="text-muted d-block mt-1 ps-1">{projectName.length}/100 characters</small>
                                        </div>

                                        {/* Project Description */}
                                        <div className="mb-4">
                                            <label htmlFor="projectDescription" className="form-label fw-medium text-secondary small">Description</label>
                                            <textarea
                                                id="projectDescription"
                                                className="form-control glass-textarea rounded-4 px-4 py-3"
                                                placeholder="Briefly describe the project goals, scope, and key deliverables..."
                                                value={projectDescription}
                                                onChange={(e) => setProjectDescription(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                                autoComplete="off"
                                                maxLength={500}
                                            />
                                            <small className="text-muted d-block mt-1 ps-1">{projectDescription.length}/500 characters</small>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-grid gap-3">
                                            <button
                                                type="submit"
                                                className="btn gradient-btn rounded-pill py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                                                disabled={isSubmitting || !projectName.trim() || !projectDescription.trim()}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Creating Project...
                                                    </>
                                                ) : (
                                                    "✨ Create Project"
                                                )}
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
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

export default ProjectForm;