import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function TeamManagement() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [teamName, setTeamName] = useState("");
  const navigate = useNavigate();
  
  const { data: teams, loading: teamLoading, error: teamError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);

  async function handleTeamCreation(e) {
    e.preventDefault();
    if (!teamName.trim()) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const token = localStorage.getItem('loginToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ name: teamName })
      });
      
      if (response.status === 401) {
        localStorage.removeItem('loginToken');
        navigate('/login', { replace: true });
        throw new Error("Session expired");
      }
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to create team");
      }
      
      toast.success("🎉 Team created successfully!", { theme: "colored" });
      setTeamName("");
      setTimeout(() => window.location.reload(), 700);
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
        .team-item {
          background: rgba(248, 250, 252, 0.6);
          border-left: 4px solid #f59e0b; /* Amber for team context */
          transition: all 0.2s ease;
        }
        .team-item:hover {
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
                Team Management
              </h4>
              <p className="text-muted mb-0 mt-1 fs-6">Create and manage your teams</p>
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
                  
                  {/* Team List Section */}
                  <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Your Teams</h6>
                  <div className="list-group list-group-flush rounded-3 overflow-hidden mb-4">
                    {teamLoading ? (
                      // Skeleton loading state
                      Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="list-group-item border-0 py-3">
                          <div className="loading-skeleton" style={{ height: '1.2rem', width: '60%' }}></div>
                        </div>
                      ))
                    ) : teamError ? (
                      <div className="alert alert-danger d-flex align-items-center mb-0 rounded-pill px-4 py-2">
                        <span className="small">{teamError}</span>
                      </div>
                    ) : teams?.teams?.length > 0 ? (
                      teams.teams.map((team) => (
                        <Link 
                          key={team._id} 
                          to={`/teams/${team._id}`} 
                          className="list-group-item list-group-item-action team-item border-0 py-3 px-4 text-decoration-none"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-semibold text-dark">{team.name}</h6>
                            <MdKeyboardArrowRight className="fs-4 text-secondary" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <p className="mb-2 fs-5">👥 No teams yet</p>
                        <small>Create your first team to get started!</small>
                      </div>
                    )}
                  </div>

                  {/* Create Team Form */}
                  <div className="rounded-4 p-4" style={{ background: 'rgba(248, 250, 252, 0.5)' }}>
                    <h6 className="fw-bold text-secondary mb-3 small text-uppercase">Create New Team</h6>
                    
                    {/* Error Alert */}
                    {submitError && (
                      <div className="alert alert-danger d-flex align-items-center mb-4 rounded-pill px-4 py-2" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="20" height="20" fill="currentColor"><use xlinkHref="#exclamation-triangle-fill"/></svg>
                        <span className="small">{submitError}</span>
                      </div>
                    )}

                    <form onSubmit={handleTeamCreation}>
                      <div className="mb-4">
                        <label htmlFor="teamName" className="form-label fw-medium text-secondary small form-label-required">Team Name</label>
                        <input
                          id="teamName"
                          type="text"
                          className="form-control glass-input rounded-pill px-4 py-3"
                          placeholder="e.g., Design Team, DevOps, Marketing"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          required
                          disabled={isSubmitting}
                          maxLength={50}
                        />
                        <small className="text-muted d-block mt-1 ps-1">{teamName.length}/50 characters</small>
                      </div>

                      <button
                        type="submit"
                        className="btn gradient-btn rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2"
                        disabled={isSubmitting || !teamName.trim()}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Creating Team...
                          </>
                        ) : (
                          "✨ Create Team"
                        )}
                      </button>
                    </form>
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

export default TeamManagement;