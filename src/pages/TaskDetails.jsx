import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { ToastContainer, toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheckCircle, MdEdit } from "react-icons/md";
import Header from '../components/Header';
import 'react-toastify/dist/ReactToastify.css';

function TaskDetails() {
    const { taskId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const {  data: task, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`);

    // ✅ Safe date calculation with fallback
    const getDueDate = () => {
        if (!task?.task?.createdAt || !task?.task?.timeToComplete) return null;
        const due = new Date(task.task.createdAt);
        due.setDate(due.getDate() + task.task.timeToComplete);
        return due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    async function handleMarkAsComplete(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify({
                    status: "Completed",
                    timeToComplete: 0
                })
            });
            
            if (response.status === 401) {
                localStorage.removeItem('loginToken');
                navigate('/login', { replace: true });
                throw new Error("Session expired");
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to update task");
            }
            
            toast.success("✅ Task marked as Completed!", { theme: "colored" });
            setTimeout(() => window.location.reload(), 700);
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setIsSubmitting(false);
        }
    }

    const getStatusBadge = (status) => {
        const styles = {
            'Completed': 'bg-success-subtle text-success border border-success-subtle',
            'In Progress': 'bg-warning-subtle text-warning border border-warning-subtle',
            'Blocked': 'bg-danger-subtle text-danger border border-danger-subtle',
            'To Do': 'bg-secondary-subtle text-secondary border border-secondary-subtle'
        };
        return styles[status] || 'bg-secondary-subtle text-secondary';
    };

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
                .gradient-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
                    color: white !important;
                }
                .gradient-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .secondary-btn {
                    background: rgba(100, 116, 139, 0.15);
                    border: 1px solid rgba(100, 116, 139, 0.3);
                    color: #475569;
                    transition: all 0.2s ease;
                }
                .secondary-btn:hover:not(:disabled) {
                    background: rgba(14, 165, 233, 0.15);
                    color: #0ea5e9;
                    transform: translateY(-1px);
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.75rem 0;
                    border-bottom: 1px dashed rgba(148, 163, 184, 0.3);
                }
                .detail-row:last-child {
                    border-bottom: none;
                }
                .detail-label {
                    color: #64748b;
                    font-weight: 500;
                    font-size: 0.9rem;
                }
                .detail-value {
                    font-weight: 600;
                    color: #1e293b;
                    text-align: right;
                }
                .loading-skeleton {
                    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 0.5rem;
                    min-height: 1.2rem;
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
                .tag-pill {
                    background: rgba(14, 165, 233, 0.1);
                    color: #0284c7;
                    border: 1px solid rgba(14, 165, 233, 0.2);
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
                                {taskLoading ? (
                                    <span className="loading-skeleton rounded-pill" style={{ width: '220px', height: '1.5rem', display: 'inline-block' }}></span>
                                ) : (
                                    task?.task?.name || 'Task Details'
                                )}
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">View and manage this task</p>
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
                                            <svg className="bi flex-shrink-0 me-2" width="20" height="20" fill="currentColor"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                                            <span className="small">{submitError}</span>
                                        </div>
                                    )}

                                    {/* Task Details Card */}
                                    <div className="rounded-4 p-4 mb-4" style={{ background: 'rgba(248, 250, 252, 0.5)' }}>
                                        {taskLoading ? (
                                            // Skeleton loading state
                                            <div className="d-flex flex-column gap-3">
                                                {[1,2,3,4,5,6].map(i => (
                                                    <div key={i} className="detail-row">
                                                        <div className="loading-skeleton" style={{ width: '100px' }}></div>
                                                        <div className="loading-skeleton" style={{ width: '150px' }}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : taskError ? (
                                            <div className="alert alert-danger d-flex align-items-center rounded-pill px-4 py-2">
                                                <span className="small">{taskError}</span>
                                            </div>
                                        ) : task?.task ? (
                                            <div>
                                                {/* Project */}
                                                <div className="detail-row">
                                                    <span className="detail-label">Project</span>
                                                    <span className="detail-value">
                                                        <Link to={`/projects/${task.task.project?._id}`} className="text-decoration-none text-primary fw-medium">
                                                            {task.task.project?.name || '—'}
                                                        </Link>
                                                    </span>
                                                </div>

                                                {/* Team */}
                                                <div className="detail-row">
                                                    <span className="detail-label">Team</span>
                                                    <span className="detail-value">{task.task.team?.name || '—'}</span>
                                                </div>

                                                {/* Owners */}
                                                <div className="detail-row align-items-start">
                                                    <span className="detail-label pt-1">Owners</span>
                                                    <div className="text-end">
                                                        {task.task.owners?.map((owner, idx) => (
                                                            <span key={owner._id} className="d-block fw-medium">
                                                                {owner.name}{idx < task.task.owners.length - 1 && ','}
                                                            </span>
                                                        )) || '—'}
                                                    </div>
                                                </div>

                                                {/* Tags */}
                                                <div className="detail-row align-items-start">
                                                    <span className="detail-label pt-1">Tags</span>
                                                    <div className="text-end d-flex flex-wrap gap-2 justify-content-end">
                                                        {task.task.tags?.map((tag, idx) => (
                                                            <span key={idx} className="tag-pill px-3 py-1 rounded-pill small fw-medium">
                                                                {tag}
                                                            </span>
                                                        )) || <span className="text-muted small">None</span>}
                                                    </div>
                                                </div>

                                                {/* Due Date */}
                                                <div className="detail-row">
                                                    <span className="detail-label">Due Date</span>
                                                    <span className="detail-value">{getDueDate() || '—'}</span>
                                                </div>

                                                {/* Status */}
                                                <div className="detail-row">
                                                    <span className="detail-label">Status</span>
                                                    <span className={`badge rounded-pill small fw-medium px-3 py-2 ${getStatusBadge(task.task.status)}`}>
                                                        {task.task.status}
                                                    </span>
                                                </div>

                                                {/* Time Remaining */}
                                                <div className="detail-row">
                                                    <span className="detail-label">Time Remaining</span>
                                                    <span className="detail-value">
                                                        {task.task.timeToComplete > 0 
                                                            ? `${task.task.timeToComplete} days` 
                                                            : <span className="text-success fw-bold">✓ Completed</span>}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-5 text-muted">
                                                <p className="mb-2 fs-5">🔍 Task not found</p>
                                                <small>The task may have been deleted or moved</small>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex flex-wrap gap-3">
                                        <button 
                                            disabled={isSubmitting || task?.task?.status === "Completed"} 
                                            className={`btn rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2 ${
                                                task?.task?.status === "Completed" 
                                                    ? 'btn-secondary disabled' 
                                                    : 'gradient-btn'
                                            }`}
                                            onClick={handleMarkAsComplete}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Updating...
                                                </>
                                            ) : task?.task?.status === "Completed" ? (
                                                <>
                                                    <MdCheckCircle className="fs-5" /> Completed
                                                </>
                                            ) : (
                                                <>
                                                    <MdCheckCircle className="fs-5" /> Mark as Completed
                                                </>
                                            )}
                                        </button>
                                        
                                        <Link 
                                            to={`/tasks/${taskId}/updateTask`} 
                                            className="btn secondary-btn rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2"
                                        >
                                            <MdEdit className="fs-5" /> Edit Task
                                        </Link>
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

export default TaskDetails;