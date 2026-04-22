import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import useFetch from '../useFetch';
import 'react-toastify/dist/ReactToastify.css';

function UpdateTaskForm() {
    const { taskId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [timeToComplete, setTimeToComplete] = useState(0);
    const [ownerName, setOwnerName] = useState([]);
    const [newTagName, setNewTagName] = useState('');
    const [tag, setTag] = useState([]);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    
    const {  teams, loading: teamLoading, error: teamError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);
    const {  tagsData, loading: tagLoading, error: tagError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    const {  users, loading: userLoading, error: userError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);
    const {  task, loading: taskLoading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`);

    // ✅ Pre-fill form when task data loads
    useEffect(() => {
        if (task?.task) {
            setTaskName(task.task.name || "");
            setTeamName(task.task.team?._id || task.task.team || "");
            setTimeToComplete(task.task.timeToComplete || 0);
            // Store owner IDs, not full objects
            setOwnerName(task.task.owners?.map(o => o._id) || []);
            setTag(task.task.tags || []);
            setStatus(task.task.status || "");
        }
    }, [task]);

    const tags = tagsData?.tags || [];
    const ownerList = users?.users || [];

    function handleTag(e) {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setTag(selectedValues);
    }

    function handleOwner(e) {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setOwnerName(selectedValues);
    }

    async function addNewTag(e) {
        e.preventDefault();
        if (!newTagName.trim()) return;
        
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tags`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                body: JSON.stringify({ name: newTagName })
            });
            
            if (response.status === 401) {
                localStorage.removeItem('loginToken');
                navigate('/login', { replace: true });
                throw new Error("Session expired");
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || "Failed to create tag");
            }
            
            toast.success("✨ Tag created!", { theme: "colored" });
            setNewTagName("");
            // Trigger tags refresh without full reload
            window.dispatchEvent(new Event('tagsUpdated'));
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleTaskUpdate(e) {
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
                    name: taskName,
                    team: teamName,
                    owners: ownerName,
                    tags: tag,
                    timeToComplete: Number(timeToComplete),
                    status
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
            
            toast.success("✅ Task updated successfully!", { theme: "colored" });
            setTimeout(() => navigate(`/tasks/${taskId}`), 700);
        } catch (error) {
            setSubmitError(error.message);
            toast.error(error.message, { theme: "colored" });
        } finally {
            setIsSubmitting(false);
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
                .glass-input, .glass-select {
                    background: rgba(248, 250, 252, 0.6);
                    border: 1px solid rgba(148, 163, 184, 0.4);
                    transition: all 0.2s ease;
                }
                .glass-input:focus, .glass-select:focus {
                    background: #ffffff;
                    border-color: #0ea5e9;
                    box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
                    outline: none;
                }
                .glass-select {
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
                    background-position: right 0.75rem center;
                    background-repeat: no-repeat;
                    background-size: 1.5em 1.5em;
                    padding-right: 2.5rem;
                }
                .glass-select[multiple] {
                    background-image: none;
                    padding-right: 1rem;
                    min-height: 120px;
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
                .loading-skeleton {
                    background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 0.5rem;
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
                .form-label-required::after {
                    content: " *";
                    color: #ef4444;
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
                                    <span className="loading-skeleton rounded-pill" style={{ width: '180px', height: '1.5rem', display: 'inline-block' }}></span>
                                ) : (
                                    `Edit Task '${task?.task?.name || 'Unknown'}'`
                                )}
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">Update task details, assignments, and status</p>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-3 g-md-4">
                                
                                {/* Sidebar */}
                                <div className="col-lg-3">
                                    <div className="glass-sidebar p-3 h-100">
                                        <h6 className="text-secondary fw-bold mb-3 small text-uppercase" style={{ letterSpacing: '0.05em' }}>Navigation</h6>
                                        <Link to={`/tasks/${taskId}`} className="sidebar-link text-decoration-none p-3 rounded-3">
                                            <MdKeyboardArrowLeft className="fs-5" />
                                            <span className="fw-medium">Back to Task</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Main Form Content */}
                                <div className="col-lg-9">
                                    
                                    {/* Error Alert */}
                                    {submitError && (
                                        <div className="alert alert-danger d-flex align-items-center mb-4 rounded-pill px-4 py-2" role="alert">
                                            <svg className="bi flex-shrink-0 me-2" width="20" height="20" fill="currentColor"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                                            <span className="small">{submitError}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleTaskUpdate}>
                                        
                                        {/* Task Name */}
                                        <div className="mb-4">
                                            <label htmlFor="taskName" className="form-label fw-medium text-secondary small form-label-required">Task Name</label>
                                            <input
                                                id="taskName"
                                                type="text"
                                                className="form-control glass-input rounded-pill px-4 py-3"
                                                placeholder="e.g., Design homepage mockup, Write API docs"
                                                value={taskName}
                                                onChange={(e) => setTaskName(e.target.value)}
                                                required
                                                disabled={isSubmitting || taskLoading}
                                                maxLength={100}
                                            />
                                            <small className="text-muted d-block mt-1 ps-1">{taskName.length}/100 characters</small>
                                        </div>

                                        {/* Team Select */}
                                        <div className="mb-4">
                                            <label htmlFor="teamName" className="form-label fw-medium text-secondary small">Assign to Team</label>
                                            <select 
                                                id="teamName" 
                                                className="form-control glass-select rounded-pill px-4 py-3"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                                disabled={isSubmitting || teamLoading}
                                            >
                                                <option value="" disabled>-- Select a team --</option>
                                                {teamLoading ? (
                                                    <option disabled>Loading teams...</option>
                                                ) : teamError ? (
                                                    <option disabled>Failed to load teams</option>
                                                ) : teams?.teams?.length > 0 ? (
                                                    teams.teams.map((team) => (
                                                        <option key={team._id} value={team._id}>{team.name}</option>
                                                    ))
                                                ) : (
                                                    <option disabled>No teams available</option>
                                                )}
                                            </select>
                                        </div>

                                        {/* Owners Multi-Select */}
                                        <div className="mb-4">
                                            <label htmlFor="ownerName" className="form-label fw-medium text-secondary small">Assign to Owners</label>
                                            <select 
                                                id="ownerName" 
                                                className="form-control glass-select rounded-4 px-4 py-3"
                                                value={ownerName}
                                                onChange={handleOwner}
                                                multiple
                                                disabled={isSubmitting || userLoading}
                                            >
                                                {userLoading ? (
                                                    <option disabled>Loading users...</option>
                                                ) : userError ? (
                                                    <option disabled>Failed to load users</option>
                                                ) : ownerList.length > 0 ? (
                                                    ownerList.map((owner) => (
                                                        <option key={owner._id} value={owner._id}>{owner.name}</option>
                                                    ))
                                                ) : (
                                                    <option disabled>No users available</option>
                                                )}
                                            </select>
                                            <small className="text-muted d-block mt-1 ps-1">
                                                💡 Hold <kbd className="bg-light border px-1 rounded">Ctrl</kbd> or <kbd className="bg-light border px-1 rounded">Cmd</kbd> to select multiple
                                            </small>
                                        </div>

                                        {/* Tags Section with Inline Add */}
                                        <div className="mb-4">
                                            <label htmlFor="tagName" className="form-label fw-medium text-secondary small">Tags</label>
                                            <select 
                                                id="tagName" 
                                                className="form-control glass-select rounded-4 px-4 py-3 mb-3"
                                                value={tag}
                                                onChange={handleTag}
                                                multiple
                                                disabled={isSubmitting || tagLoading}
                                            >
                                                {tagLoading ? (
                                                    <option disabled>Loading tags...</option>
                                                ) : tagError ? (
                                                    <option disabled>Failed to load tags</option>
                                                ) : tags.length > 0 ? (
                                                    tags.map((tagItem) => (
                                                        <option key={tagItem._id} value={tagItem.name}>{tagItem.name}</option>
                                                    ))
                                                ) : (
                                                    <option disabled>No tags available</option>
                                                )}
                                            </select>
                                            
                                            {/* Inline Add Tag */}
                                            <div className="d-flex gap-2 flex-wrap">
                                                <input
                                                    type="text"
                                                    className="form-control glass-input rounded-pill px-4 py-2 flex-grow-1"
                                                    placeholder="Create new tag..."
                                                    value={newTagName}
                                                    onChange={(e) => setNewTagName(e.target.value)}
                                                    disabled={isSubmitting}
                                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addNewTag(e))}
                                                />
                                                <button 
                                                    type="button"
                                                    className="btn secondary-btn rounded-pill px-4 py-2 fw-medium"
                                                    onClick={addNewTag}
                                                    disabled={isSubmitting || !newTagName.trim()}
                                                >
                                                    {isSubmitting ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : '+ Add'}
                                                </button>
                                            </div>
                                            <small className="text-muted d-block mt-1 ps-1">
                                                Press <kbd className="bg-light border px-1 rounded">Enter</kbd> to quickly add a tag
                                            </small>
                                        </div>

                                        {/* Time to Complete */}
                                        <div className="mb-4">
                                            <label htmlFor="timeToComplete" className="form-label fw-medium text-secondary small form-label-required">Time to Complete (days)</label>
                                            <input
                                                id="timeToComplete"
                                                type="number"
                                                className="form-control glass-input rounded-pill px-4 py-3"
                                                placeholder="e.g., 3, 7, 14"
                                                value={timeToComplete}
                                                onChange={(e) => setTimeToComplete(e.target.value)}
                                                min={0}
                                                max={365}
                                                required
                                                disabled={isSubmitting || taskLoading}
                                            />
                                        </div>

                                        {/* Status Select */}
                                        <div className="mb-4">
                                            <label htmlFor="status" className="form-label fw-medium text-secondary small form-label-required">Status</label>
                                            <select 
                                                id="status" 
                                                className="form-control glass-select rounded-pill px-4 py-3"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                required
                                                disabled={isSubmitting || taskLoading}
                                            >
                                                <option value="" disabled>-- Select status --</option>
                                                {['To Do', 'In Progress', 'Completed', 'Blocked'].map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="d-grid gap-3">
                                            <button
                                                type="submit"
                                                className="btn gradient-btn rounded-pill py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                                                disabled={isSubmitting || !taskName.trim() || !status || taskLoading}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Updating Task...
                                                    </>
                                                ) : (
                                                    "💾 Save Changes"
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

export default UpdateTaskForm;