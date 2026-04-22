import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function TeamDetails() {
    const { teamId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortFilter, setSortFilter] = useState('');
    const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
    
    const {  data: team, loading: teamLoading } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams/${teamId}`);
    const {  data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const {  data: users, loading: userLoading, error: userError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);

    const currentStatus = searchParams.get('status') || 'All';
    const currentOwner = searchParams.get('owner') || 'All';

    let filteredTasks = [];
    if (tasks?.tasks) {
        filteredTasks = tasks.tasks
            .filter((task) => task.team?._id === teamId)
            .filter((task) => {
                if (currentStatus !== 'All' && task.status !== currentStatus) return false;
                if (currentOwner !== 'All' && !task.owners?.some((owner) => owner.name === currentOwner)) return false;
                return true;
            });
    }
    if (filteredTasks.length > 0) {
        if (sortFilter === "HighToLow") {
            filteredTasks = [...filteredTasks].sort((a, b) => b.timeToComplete - a.timeToComplete);
        } else {
            filteredTasks = [...filteredTasks].sort((a, b) => a.timeToComplete - b.timeToComplete);
        }
    }

    const updateFilter = (newParams) => {
        const updated = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === 'All') updated.delete(key);
            else updated.set(key, value);
        });
        setSearchParams(updated);
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'bg-success-subtle text-success border border-success-subtle';
            case 'In Progress': return 'bg-warning-subtle text-warning border border-warning-subtle';
            case 'Blocked': return 'bg-danger-subtle text-danger border border-danger-subtle';
            default: return 'bg-secondary-subtle text-secondary border border-secondary-subtle';
        }
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
                .gradient-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.45);
                    color: white !important;
                }
                .task-item {
                    background: rgba(248, 250, 252, 0.6);
                    border-left: 4px solid #10b981; /* Green for team context */
                    transition: all 0.2s ease;
                }
                .task-item:hover {
                    background: #ffffff;
                    transform: translateX(4px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                .filter-badge {
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 2px solid transparent;
                }
                .filter-badge:hover, .filter-badge.active {
                    background: linear-gradient(135deg, #0ea5e9, #10b981) !important;
                    color: white !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35);
                }
                .owner-badge.active {
                    background: #334155 !important;
                    color: white !important;
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
                                {teamLoading ? (
                                    <span className="loading-skeleton rounded-pill" style={{ width: '180px', display: 'inline-block' }}></span>
                                ) : team?.team?.name || 'Team Details'}
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">Track tasks assigned to this team</p>
                        </div>

                        <div className="card-body p-0">
                            <div className="row g-3 g-md-4">
                                
                                {/* Sidebar */}
                                <div className="col-lg-3">
                                    <div className="glass-sidebar p-3 h-100">
                                        <h6 className="text-secondary fw-bold mb-3 small text-uppercase" style={{ letterSpacing: '0.05em' }}>Navigation</h6>
                                        <Link to="/teams" className="sidebar-link text-decoration-none p-3 rounded-3">
                                            <MdKeyboardArrowLeft className="fs-5" />
                                            <span className="fw-medium">Back to Teams</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="col-lg-9">
                                    
                                    {/* Filters Section */}
                                    <div className="mb-4 pb-3 border-bottom">
                                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                            <strong className="text-secondary small text-uppercase">Status:</strong>
                                            <span className={`badge rounded-pill filter-badge py-2 px-3 ${currentStatus === 'All' ? 'active' : 'bg-primary-subtle text-primary'}`} onClick={() => updateFilter({ status: 'All' })}>All</span>
                                            {statuses.map((status) => (
                                                <span key={status} className={`badge rounded-pill filter-badge py-2 px-3 ${currentStatus === status ? 'active' : 'bg-primary-subtle text-primary'}`} onClick={() => updateFilter({ status })}>{status}</span>
                                            ))}
                                        </div>

                                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                                            <strong className="text-secondary small text-uppercase">Owners:</strong>
                                            <span className={`badge rounded-pill filter-badge py-2 px-3 ${currentOwner === 'All' ? 'active' : 'bg-secondary-subtle text-secondary'}`} onClick={() => updateFilter({ owner: 'All' })}>All</span>
                                            {userLoading ? (
                                                <span className="loading-skeleton rounded-pill px-3 py-2" style={{ width: '80px', display: 'inline-block' }}></span>
                                            ) : userError ? (
                                                <small className="text-danger">Failed to load</small>
                                            ) : users?.users?.map((owner) => (
                                                <span key={owner._id} className={`badge rounded-pill filter-badge owner-badge py-2 px-3 ${currentOwner === owner.name ? 'active' : 'bg-secondary-subtle text-secondary'}`} onClick={() => updateFilter({ owner: owner.name })}>{owner.name}</span>
                                            ))}
                                        </div>

                                        <div className="d-flex flex-wrap align-items-center gap-3">
                                            <strong className="text-secondary small text-uppercase">Sort By:</strong>
                                            <div className="btn-group gap-3" role="group">
                                                <input type="radio" className="btn-check" name="sort" id="LowToHigh" autoComplete="off" checked={sortFilter === 'LowToHigh'} onChange={() => setSortFilter('LowToHigh')} />
                                                <label className="btn btn-outline-primary btn-sm rounded-pill" htmlFor="LowToHigh">Low → High</label>
                                                <input type="radio" className="btn-check" name="sort" id="HighToLow" autoComplete="off" checked={sortFilter === 'HighToLow'} onChange={() => setSortFilter('HighToLow')} />
                                                <label className="btn btn-outline-primary btn-sm rounded-pill" htmlFor="HighToLow">High → Low</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task List */}
                                    <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Team Tasks</h6>
                                    <div className="list-group list-group-flush rounded-3 overflow-hidden mb-4">
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
                                                <Link key={task._id} to={`/tasks/${task._id}`} className="list-group-item list-group-item-action task-item border-0 py-3 px-4 text-decoration-none">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <h6 className="mb-1 fw-semibold text-dark">{task.name}</h6>
                                                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                                                <span className={`badge rounded-pill small fw-medium ${getStatusColor(task.status)}`}>{task.status}</span>
                                                                <small className="text-muted">⏱️ {task.timeToComplete} days</small>
                                                            </div>
                                                        </div>
                                                        <div className="text-end">
                                                            {task.owners?.slice(0, 2).map((owner, idx) => (
                                                                <span key={owner._id} className="d-block small text-muted">{owner.name}{idx === 0 && task.owners.length > 2 && ' +...'}</span>
                                                            ))}
                                                            <MdKeyboardArrowRight className="fs-5 text-secondary mt-1" />
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-center py-5 text-muted">
                                                <p className="mb-2 fs-5">📝 No tasks match your filters</p>
                                                <small>Try adjusting status, owner, or sort options</small>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamDetails;