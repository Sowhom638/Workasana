import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

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
            const headers = {
                'Content-Type': 'application/json'
            }
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
            })
            if (response.status === 401) {
                // Token is expired/invalid → log out
                localStorage.removeItem('loginToken'); // Removing expired token from localstorage
                navigate('/login', { replace: true });
                throw new Error("Error while creating new team");
            }
            if (!response.ok) throw new Error("Error while creating new project");
            const data = await response.json();
            console.log(data);
            toast.success("New project is created!");
            setProjectName("");
            setProjectDescription("");
            setTimeout(() => navigate("/projects"), 700)
        } catch (error) {
            submitError(error);
            toast.warning(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <>
            <div className="container mt-4">
                <Header />
                <div className="card w-auto shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Create New Project</h5>
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
                                {submitError && (
                                    <div className="alert alert-danger">{submitError}</div>
                                )}

                                <form onSubmit={handleProjectCreation}>
                                    <div className="form-group my-2">
                                        <label htmlFor="projectName">Project Name</label>
                                        <input
                                            type="text"
                                            id="projectName"
                                            className="form-control w-75"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="projectDescription">Project Description</label>
                                        <input
                                            type="text"
                                            id="projectDescription"
                                            className="form-control w-75"
                                            value={projectDescription}
                                            onChange={(e) => setProjectDescription(e.target.value)}
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
                                            "Create Project"
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

export default ProjectForm;
