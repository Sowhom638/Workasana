import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import { useState } from 'react';

function TeamManagement() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [teamName, setTeamName] = useState("")
  const navigate = useNavigate();
  const { data: teams, loading: teamLoading, error: teamError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);
  async function handleTeamCreation(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const token = localStorage.getItem('loginToken');
      const headers = {
        'Content-Type': 'application/json'
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teams`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: teamName
        })
      })
      if (response.status === 401) {
        // Token is expired/invalid → log out
        localStorage.removeItem('loginToken'); // Removing expired token from localstorage
        navigate('/login', { replace: true });
        throw new Error("Error while creating new team");
      }
      if (!response.ok) throw new Error("Error while creating new team");
      const data = await response.json();
      console.log(data);
      toast.success("New team is created.");
      setTimeout(() =>window.location.reload() , 700);
    } catch (error) {
      setSubmitError(error);
      toast.warning(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div className="container mt-4">
        <Header />
        <div className="card shadow-sm border rounded-3">
          <div className="card-header bg-white text-center py-3">
            <h5 className="mb-0 fw-bold text-primary text-center">Team Management</h5>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              {/* Sidebar */}
              <div className="col-md-3 border-end bg-light">
                <div className="p-3">
                  <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                  <Link to={`/dashboard`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                    <MdKeyboardArrowLeft /> Back to Dashboard
                  </Link>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9 p-4">
                <h6 className="text-secondary fw-bold mb-3">Team List</h6>
                {submitError && (
                  <div className="alert alert-danger">{JSON.stringify(submitError)}</div>
                )}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <ul>
                    {teams && teams?.teams?.length > 0 ? teams?.teams?.map((team) => (
                      <li key={team._id} className="my-1">
                        <Link to={`/teams/${team._id}`} className="text-decoration-none text-dark"><b>{team.name}</b> <MdKeyboardArrowRight /></Link>
                      </li>
                    )) : (
                      <span className="badge fs-5 bg-light text-dark border">
                        {teamLoading && <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>}
                        {teamError && <p className="text-danger">{teamError}</p>}
                        {'  '}No team</span>
                    )}
                  </ul>
                </div>

                <form onSubmit={handleTeamCreation}>
                  <div className="form-group my-2">
                    <label htmlFor="teamName">New Team Name</label>
                    <input
                      type="text"
                      id="teamName"
                      className="form-control w-50"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                    />
                  </div>
                  <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Team"
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  )
}

export default TeamManagement;
