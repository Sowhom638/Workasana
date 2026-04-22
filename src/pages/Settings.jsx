import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch'
import { ToastContainer, toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDelete, MdWarning } from "react-icons/md";
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState(null);
    const [deletingProject, setDeletingProject] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    
    const {  data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);
    const {  data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const {  data: me } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);

    const filteredTasks = tasks?.tasks?.filter((task) => 
        task.owners?.some((owner) => owner._id === me?.user?._id)
    ) || [];

    async function handleDeleteProject(projectId, projectName) {
        // ✅ Confirmation dialog
        if (!window.confirm(`Are you sure you want to delete "${projectName}"?\n\nThis action cannot be undone.`)) {
            return;
        }
        
        setDeletingProject(projectId);
        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            
            if (response.status === 401) {
                localStorage.removeItem('loginToken');
                navigate('/login', { replace: true });
                throw new Error("Session expired");
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to delete project");
            }
            
            toast.success(`🗑️ "${projectName}" deleted!`, { theme: "colored" });
            setTimeout(() => window.location.reload(), 700);
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setDeletingProject(null);
        }
    }

    async function handleDeleteTask(taskId, taskName) {
        // ✅ Confirmation dialog
        if (!window.confirm(`Are you sure you want to delete "${taskName}"?\n\nThis action cannot be undone.`)) {
            return;
        }
        
        setDeletingTask(taskId);
        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            
            if (response.status === 401) {
                localStorage.removeItem('loginToken');
                navigate('/login', { replace: true });
                throw new Error("Session expired");
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to delete task");
            }
            
            toast.success(`🗑️ "${taskName}" deleted!`, { theme: "colored" });
            setTimeout(() => window.location.reload(), 700);
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setDeletingTask(null);
        }
    }

    return (
        <>
            {/* ✅ EXACT SAME STYLES AS DASHBOARD */}
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
                .gradient-btn {
                    background: linear-gradient(135deg, #0ea5e9, #10b981);
                    border: none;
                    color: white;
                    font-weight: 600;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35);
                }
                .gradient-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
                    color: white !important;
                }
                .danger-btn {
                    background: rgba(239, 68, 68, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.4);
                    color: #dc2626;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                }
                .danger-btn:hover:not(:disabled) {
                    background: rgba(239, 68, 68, 0.25);
                    color: #b91c1c;
                    transform: translateY(-1px);
                }
                .danger-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .project-item, .task-item {
                    background: rgba(248, 250, 252, 0.6);
                    border-left: 4px solid #0ea5e9;
                    transition: all 0.2s ease;
                }
                .task-item {
                    border-left-color: #10b981;
                }
                .project-item:hover, .task-item:hover {
                    background: #ffffff;
                    transform: translateX(4px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                .loading-skeleton {
                    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 0.5rem;
                    min-height: 1.5rem;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-in {
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .section-card {
                    background: rgba(248, 250, 252, 0.5);
                    border-radius: 1rem;
                    padding: 1.25rem;
                }
            `}</style>

            <div className="dashboard-bg">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    
                    {/* ✅ Header stays at top */}
                    <Header />

                    {/* ✅ Glass Panel Card */}
                    <div className="glass-panel p-3 p-md-4 mt-4 animate-in">
                        
                        {/* Card Header */}
                        <div className="card-header bg-transparent border-0 text-center pb-3">
                            <h4 className="mb-0 fw-bold" style={{ 
                                background: 'linear-gradient(135deg, #0284c7, #059669, #ca8a04)', 
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Settings
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">Manage and delete your projects and tasks</p>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-3 g-md-4">
                                
                                {/* Sidebar */}
                                <div className="col-lg-3">
                                    <div className="glass-sidebar p-3 h-100">
                                        <h6 className="text-secondary fw-bold mb-3 small text-uppercase" style={{ letterSpacing: '0.05em' }}>Navigation</h6>
                                        <Link to="/dashboard" className="sidebar-link text-decoration-none p-3 rounded-3">
                                            <MdKeyboardArrowLeft className="fs-5" />
                                            <span className="fw-medium">Back to Dashboard</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="col-lg-9">
                                    
                                    {/* Error Alert */}
                                    {submitError && (
                                        <div className="alert alert-danger d-flex align-items-center mb-4 rounded-pill px-4 py-2" role="alert">
                                            <MdWarning className="flex-shrink-0 me-2" />
                                            <span className="small">{submitError}</span>
                                        </div>
                                    )}

                                    {/* Projects Section */}
                                    <div className="section-card mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold text-secondary mb-0 small text-uppercase">Your Projects</h6>
                                            <Link to="/createProject" className="btn gradient-btn rounded-pill px-4 py-2 small fw-medium">
                                                + New Project
                                            </Link>
                                        </div>
                                        
                                        <div className="list-group list-group-flush">
                                            {projectLoading ? (
                                                Array.from({ length: 3 }).map((_, i) => (
                                                    <div key={i} className="list-group-item border-0 py-3">
                                                        <div className="loading-skeleton" style={{ height: '1.2rem', width: '70%' }}></div>
                                                    </div>
                                                ))
                                            ) : projectError ? (
                                                <div className="alert alert-danger d-flex align-items-center mb-0 rounded-pill px-4 py-2">
                                                    <span className="small">{projectError}</span>
                                                </div>
                                            ) : projects?.projects?.length > 0 ? (
                                                projects.projects.map((project) => (
                                                    <div key={project._id} className="list-group-item project-item border-0 py-3 px-4">
                                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                                            <div>
                                                                <h6 className="mb-1 fw-semibold text-dark">{project.name}</h6>
                                                                <small className="text-muted">{project.description || 'No description'}</small>
                                                            </div>
                                                            <button 
                                                                className="btn danger-btn rounded-pill px-3 py-1 small fw-medium"
                                                                onClick={() => handleDeleteProject(project._id, project.name)}
                                                                disabled={deletingProject === project._id}
                                                            >
                                                                {deletingProject === project._id ? (
                                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                ) : (
                                                                    <><MdDelete className="fs-6" /> Delete</>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-4 text-muted">
                                                    <p className="mb-0">📁 No projects found</p>
                                                    <small>Create a project to get started</small>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tasks Section */}
                                    <div className="section-card">
                                        <h6 className="fw-bold text-secondary mb-3 small text-uppercase">My Tasks</h6>
                                        
                                        <div className="list-group list-group-flush">
                                            {taskLoading ? (
                                                Array.from({ length: 3 }).map((_, i) => (
                                                    <div key={i} className="list-group-item border-0 py-3">
                                                        <div className="loading-skeleton" style={{ height: '1.2rem', width: '75%' }}></div>
                                                    </div>
                                                ))
                                            ) : taskError ? (
                                                <div className="alert alert-danger d-flex align-items-center mb-0 rounded-pill px-4 py-2">
                                                    <span className="small">{taskError}</span>
                                                </div>
                                            ) : filteredTasks?.length > 0 ? (
                                                filteredTasks.map((task) => (
                                                    <div key={task._id} className="list-group-item task-item border-0 py-3 px-4">
                                                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                                            <div>
                                                                <h6 className="mb-1 fw-semibold text-dark">{task.name}</h6>
                                                                <small className="text-muted">
                                                                    ⏱️ {task.timeToComplete} days • 
                                                                    {task.owners?.map((owner, idx) => (
                                                                        <span key={owner._id} className="mx-1">
                                                                            {idx > 0 && '•'} <u>{owner.name}</u>
                                                                        </span>
                                                                    ))}
                                                                </small>
                                                            </div>
                                                            <button 
                                                                className="btn danger-btn rounded-pill px-3 py-1 small fw-medium"
                                                                onClick={() => handleDeleteTask(task._id, task.name)}
                                                                disabled={deletingTask === task._id}
                                                            >
                                                                {deletingTask === task._id ? (
                                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                ) : (
                                                                    <><MdDelete className="fs-6" /> Delete</>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-4 text-muted">
                                                    <p className="mb-0">📝 No tasks assigned to you</p>
                                                    <small>Tasks you own will appear here</small>
                                                </div>
                                            )}
                                        </div>
                                    </div>

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
    )
}

export default Settings;