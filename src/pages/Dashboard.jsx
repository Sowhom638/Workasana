import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch';
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function Dashboard() {
  const [searchStatus, setSearchStatus] = useSearchParams();
  const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
  
  const { data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);
  const { data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
  const { data: me } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);

  let filteredTasks = [];
  if (tasks?.tasks) {
    const currentStatus = searchStatus.get('status') || 'All';
    if (currentStatus === 'All') {
      filteredTasks = tasks.tasks.filter((task) => task.owners?.some((owner) => owner._id === me?.user?._id));
    } else {
      filteredTasks = tasks.tasks.filter((task) => task.status === currentStatus && task.owners?.some((owner) => owner._id === me?.user?._id));
    }
  }

  return (
    <>
      {/* Scoped styles for gradient & glass effects */}
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
          justify-content: space-between;
        }
        .sidebar-link:hover {
          background: rgba(14, 165, 233, 0.1);
          color: #0ea5e9;
          transform: translateX(4px);
        }
        .project-pill {
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid transparent;
          background-clip: padding-box;
          border-radius: 999px;
          transition: all 0.2s ease;
          position: relative;
        }
        .project-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 999px;
          padding: 2px;
          background: linear-gradient(135deg, #0ea5e9, #10b981, #f59e0b);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .project-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .task-item {
          background: rgba(248, 250, 252, 0.6);
          border-left: 4px solid #0ea5e9;
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
        .filter-badge:hover,
        .filter-badge.active {
          background: linear-gradient(135deg, #0ea5e9, #10b981) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35);
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
          {/* Header Component - Already styled with gradient */}
          <Header />

          {/* Main Dashboard Card */}
          <div className="glass-panel p-3 p-md-4 mt-4 animate-in">
            <div className="card-header bg-transparent border-0 text-center pb-3">
              <h4 className="mb-0 fw-bold" style={{ 
                background: 'linear-gradient(135deg, #0284c7, #059669, #ca8a04)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Dashboard
              </h4>
            </div>

            <div className="card-body p-0">
              <div className="row g-3 g-md-4">
                
                {/* Sidebar */}
                <div className="col-lg-3">
                  <div className="glass-sidebar p-3 h-100">
                    <h6 className="text-secondary fw-bold mb-3 small text-uppercase tracking-wide">Navigation</h6>
                    <ul className="list-unstyled mb-0">
                      {['Projects', 'Teams', 'Reports', 'Settings'].map((item) => (
                        <li key={item} className="mb-2">
                          <Link 
                            to={`/${item.toLowerCase()}`} 
                            className="sidebar-link text-decoration-none p-3 rounded-3"
                          >
                            <span className="fw-medium">{item}</span>
                            <MdKeyboardArrowRight className="fs-5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-lg-9">
                  
                  {/* Projects Section */}
                  <div className="mb-4">
                    <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Your Projects</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {projectLoading ? (
                        <>
                          {[1,2,3].map(i => (
                            <span key={i} className="loading-skeleton rounded-pill px-3 py-2" style={{ width: '120px' }}></span>
                          ))}
                        </>
                      ) : projectError ? (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                          Failed to load projects
                        </span>
                      ) : projects?.projects?.length > 0 ? (
                        projects.projects.map((project) => (
                          <span key={project._id} className="project-pill px-3 py-2">
                            <Link 
                              to={`/projects/${project._id}`} 
                              className="text-decoration-none text-dark fw-medium small d-block"
                            >
                              {project.name}
                            </Link>
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-secondary-subtle text-secondary border">
                          No projects yet
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tasks Section */}
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h6 className="fw-bold text-secondary mb-0 small text-uppercase">My Tasks</h6>
                      {searchStatus.get('status') && (
                        <small className="text-primary fw-medium">
                          Filtering: {searchStatus.get('status')}
                        </small>
                      )}
                    </div>
                    
                    <div className="list-group list-group-flush rounded-3 overflow-hidden">
                      {taskLoading ? (
                        <>
                          {[1,2,3].map(i => (
                            <div key={i} className="list-group-item border-0 py-3">
                              <div className="loading-skeleton rounded" style={{ height: '1.2rem', width: '80%' }}></div>
                            </div>
                          ))}
                        </>
                      ) : taskError ? (
                        <div className="alert alert-warning mb-0">
                          Failed to load tasks
                        </div>
                      ) : filteredTasks?.length > 0 ? (
                        filteredTasks.map((task) => (
                          <Link 
                            key={task._id} 
                            to={`/tasks/${task._id}`} 
                            className="list-group-item list-group-item-action task-item border-0 py-3 px-4"
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="mb-1 fw-semibold text-dark">{task.name}</h6>
                                <small className="text-muted">
                                  ⏱️ {task.timeToComplete} days left • 
                                  {task.owners?.map((owner, idx) => (
                                    <span key={owner._id} className="mx-1">
                                      {idx > 0 && '•'} <u>{owner.name}</u>
                                    </span>
                                  ))}
                                </small>
                              </div>
                              <span className={`badge rounded-pill small fw-medium ${
                                task.status === 'Completed' ? 'bg-success-subtle text-success' :
                                task.status === 'Blocked' ? 'bg-danger-subtle text-danger' :
                                task.status === 'In Progress' ? 'bg-warning-subtle text-warning' :
                                'bg-secondary-subtle text-secondary'
                              }`}>
                                {task.status}
                              </span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted">
                          <p className="mb-0">No tasks found for this filter</p>
                          <small>Try changing the status filter above</small>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="mb-4 pb-3 border-bottom">
                    <strong className="text-secondary small text-uppercase">Quick Filters:</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      <span 
                        className={`badge rounded-pill filter-badge py-2 px-3 ${!searchStatus.get('status') || searchStatus.get('status') === 'All' ? 'active' : 'bg-primary-subtle text-primary'}`}
                        onClick={() => setSearchStatus({ status: 'All' })}
                      >
                        All
                      </span>
                      {statuses.map((status) => {
                        const isActive = searchStatus.get('status') === status;
                        return (
                          <span 
                            key={status}
                            className={`badge rounded-pill filter-badge py-2 px-3 ${isActive ? 'active' : 'bg-primary-subtle text-primary'}`}
                            onClick={() => setSearchStatus({ status })}
                          >
                            {status}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to="/createProject" className="btn gradient-btn rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2">
                    <span className="fs-5">+</span> Add New Project
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;