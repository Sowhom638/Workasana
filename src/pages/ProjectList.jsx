import { Link } from 'react-router-dom';
import useFetch from '../useFetch';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function ProjectList() {
  const { data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);

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
        .project-item {
          background: rgba(248, 250, 252, 0.6);
          border-left: 4px solid #0ea5e9;
          transition: all 0.2s ease;
        }
        .project-item:hover {
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
      `}</style>

      <div className="dashboard-bg">
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* ✅ Header stays exactly where you placed it */}
          <Header />

          {/* ✅ Glass Panel Card (same structure as Dashboard) */}
          <div className="glass-panel p-3 p-md-4 mt-4 animate-in">
            
            {/* Card Header */}
            <div className="card-header bg-transparent border-0 text-center pb-3">
              <h4 className="mb-0 fw-bold" style={{ 
                background: 'linear-gradient(135deg, #0284c7, #059669, #ca8a04)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Projects
              </h4>
              <p className="text-muted mb-0 mt-1 fs-6">Manage and view all your active projects</p>
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
                  <h6 className="text-secondary fw-bold mb-3 small text-uppercase" style={{ letterSpacing: '0.05em' }}>Your Projects</h6>

                  <div className="list-group list-group-flush rounded-3 overflow-hidden mb-4">
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
                        <Link 
                          key={project._id} 
                          to={`/projects/${project._id}`} 
                          className="list-group-item list-group-item-action project-item border-0 py-3 px-4 text-decoration-none"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1 fw-semibold text-dark">{project.name}</h6>
                              <small className="text-muted">{project.description || 'No description provided'}</small>
                            </div>
                            <MdKeyboardArrowRight className="fs-4 text-secondary" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <p className="mb-2 fs-5">📁 No projects found</p>
                        <small>Get started by creating your first project!</small>
                      </div>
                    )}
                  </div>

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
  )
}

export default ProjectList;