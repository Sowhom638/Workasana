import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Cell, Pie, PieChart, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';

function Reports() {
    const {  data: tasks, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const {  data: teams, loading: teamsLoading, error: teamsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);
    const {  data: owners, loading: ownerLoading, error: ownerError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);

    // ✅ Pie Chart Data: Completed vs In Progress
    const pieChart1_Data = [
        {
            name: "Completed",
            value: tasks?.tasks?.filter((task) => task.status === 'Completed')?.length || 0
        },
        {
            name: "In Progress",
            value: tasks?.tasks?.filter((task) => task.status !== 'Completed')?.length || 0
        }
    ];

    // ✅ Bar Chart: Tasks closed by Team
    const closedByteam_BarChartData = teams?.teams?.map((team) => ({
        name: team.name,
        value: tasks?.tasks?.filter((task) => task.team?._id === team._id && task.status === 'Completed')?.length || 0
    })) || [];

    // ✅ Bar Chart: Tasks closed by Owner
    const closedByOwner_BarChartData = owners?.users?.map((owner) => ({
        name: owner.name,
        value: tasks?.tasks?.filter((task) => task.owners?.some((user) => user._id === owner._id) && task.status === 'Completed')?.length || 0
    })) || [];

    // ✅ Gradient colors matching your design system
    const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#6366f1', '#ec4899'];

    // ✅ Custom tooltip style for glass effect
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-panel px-3 py-2" style={{ borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <p className="mb-0 fw-medium small">{label}</p>
                    <p className="mb-0 text-primary fw-bold">{payload[0].value} tasks</p>
                </div>
            );
        }
        return null;
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
                .chart-card {
                    background: rgba(248, 250, 252, 0.5);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    transition: all 0.2s ease;
                }
                .chart-card:hover {
                    background: rgba(255, 255, 255, 0.7);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
                /* Recharts tooltip override for glass effect */
                .recharts-default-tooltip {
                    background: rgba(255, 255, 255, 0.95) !important;
                    border: 1px solid rgba(148, 163, 184, 0.3) !important;
                    border-radius: 0.75rem !important;
                    backdrop-filter: blur(8px) !important;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
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
                                Reports
                            </h4>
                            <p className="text-muted mb-0 mt-1 fs-6">Visualize task progress, team performance, and owner contributions</p>
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
                                    
                                    <h6 className="fw-bold text-secondary mb-4 small text-uppercase text-center">Reports Overview</h6>

                                    {/* 🥧 Pie Chart: Task Status */}
                                    <div className="chart-card mb-4">
                                        <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Task Status Distribution</h6>
                                        {loading ? (
                                            <div className="d-flex justify-content-center align-items-center py-5">
                                                <div className="loading-skeleton rounded-circle" style={{ width: '200px', height: '200px' }}></div>
                                            </div>
                                        ) : error ? (
                                            <div className="alert alert-danger d-flex align-items-center rounded-pill px-4 py-2">
                                                <span className="small">{error}</span>
                                            </div>
                                        ) : tasks?.tasks?.length > 0 ? (
                                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
                                                <ResponsiveContainer width={280} height={280}>
                                                    <PieChart>
                                                        <Pie
                                                            dataKey="value"
                                                            data={pieChart1_Data}
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={90}
                                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                            labelLine={false}
                                                        >
                                                            {pieChart1_Data.map((entry, index) => (
                                                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip content={<CustomTooltip />} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                                <div className="text-center text-md-start">
                                                    <h3 className="fw-bold mb-2" style={{ 
                                                        background: 'linear-gradient(135deg, #0284c7, #059669)', 
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent'
                                                    }}>
                                                        {pieChart1_Data[0].value + pieChart1_Data[1].value} Total Tasks
                                                    </h3>
                                                    <p className="text-muted mb-0">Completed vs. In Progress</p>
                                                    <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start mt-3">
                                                        {pieChart1_Data.map((entry, index) => (
                                                            <span key={entry.name} className="d-flex align-items-center gap-2 small">
                                                                <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: COLORS[index] }}></span>
                                                                <span className="fw-medium">{entry.name}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-muted">
                                                <p className="mb-0">📊 No task data available</p>
                                                <small>Create tasks to see analytics</small>
                                            </div>
                                        )}
                                    </div>

                                    <hr className="my-4 opacity-25" />

                                    {/* 📊 Bar Chart: Tasks Closed by Team */}
                                    <div className="chart-card mb-4">
                                        <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Tasks Closed by Team</h6>
                                        {teamsLoading ? (
                                            <div className="d-flex justify-content-center align-items-center py-5">
                                                <div className="loading-skeleton rounded" style={{ width: '100%', height: '200px' }}></div>
                                            </div>
                                        ) : teamsError ? (
                                            <div className="alert alert-danger d-flex align-items-center rounded-pill px-4 py-2">
                                                <span className="small">{teamsError}</span>
                                            </div>
                                        ) : closedByteam_BarChartData.length > 0 ? (
                                            <div style={{ width: '100%', height: '280px' }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={closedByteam_BarChartData} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
                                                        <XAxis 
                                                            dataKey="name" 
                                                            angle={-45} 
                                                            textAnchor="end" 
                                                            height={60}
                                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                                            interval={0}
                                                        />
                                                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} width={30} />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                                        <Bar 
                                                            dataKey="value" 
                                                            name="Completed Tasks"
                                                            fill="url(#teamGradient)" 
                                                            radius={[4, 4, 0, 0]}
                                                        />
                                                        <defs>
                                                            <linearGradient id="teamGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#0ea5e9" />
                                                                <stop offset="100%" stopColor="#10b981" />
                                                            </linearGradient>
                                                        </defs>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-muted">
                                                <p className="mb-0">👥 No team data available</p>
                                                <small>Create teams and assign tasks to see breakdown</small>
                                            </div>
                                        )}
                                    </div>

                                    <hr className="my-4 opacity-25" />

                                    {/* 👤 Bar Chart: Tasks Closed by Owner */}
                                    <div className="chart-card mb-4">
                                        <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Tasks Closed by Owner</h6>
                                        {ownerLoading ? (
                                            <div className="d-flex justify-content-center align-items-center py-5">
                                                <div className="loading-skeleton rounded" style={{ width: '100%', height: '200px' }}></div>
                                            </div>
                                        ) : ownerError ? (
                                            <div className="alert alert-danger d-flex align-items-center rounded-pill px-4 py-2">
                                                <span className="small">{ownerError}</span>
                                            </div>
                                        ) : closedByOwner_BarChartData.length > 0 ? (
                                            <div style={{ width: '100%', height: '280px' }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={closedByOwner_BarChartData} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
                                                        <XAxis 
                                                            dataKey="name" 
                                                            angle={-45} 
                                                            textAnchor="end" 
                                                            height={60}
                                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                                            interval={0}
                                                        />
                                                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} width={30} />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                                        <Bar 
                                                            dataKey="value" 
                                                            name="Completed Tasks"
                                                            fill="url(#ownerGradient)" 
                                                            radius={[4, 4, 0, 0]}
                                                        />
                                                        <defs>
                                                            <linearGradient id="ownerGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#6366f1" />
                                                                <stop offset="100%" stopColor="#ec4899" />
                                                            </linearGradient>
                                                        </defs>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4 text-muted">
                                                <p className="mb-0">👤 No owner data available</p>
                                                <small>Assign owners to tasks to see individual contributions</small>
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

export default Reports;