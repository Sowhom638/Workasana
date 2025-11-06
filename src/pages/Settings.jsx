import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { ToastContainer, toast } from 'react-toastify';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';

function Settings() {
    const [submitError, setSubmitError] = useState(null);
    const { data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);
    const { data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const { data: me, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);

    const filteredTasks = tasks && tasks?.tasks?.length > 0 ? tasks.tasks.filter((task) => task.owners?.some((owner) => owner._id === me?.user?._id)) : [];

    async function handleDeleteProject(projectId) {

        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const headers = {
                'Content-Type': 'application/json'
            }
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`, {
                method: "DELETE",
                headers
            })
            if (response.status === 401) {
                // Token is expired/invalid → log out
                localStorage.removeItem('loginToken'); // Removing expired token from localstorage
                navigate('/login', { replace: true });
                return;
            }
            if (!response.ok) throw new Error("Error while deleting project");
            const data = await response.json();
            console.log(data);
            toast.success("Project is deleted!");
            setTimeout(() => window.location.reload(), 700);
        } catch (error) {
            setSubmitError(error);
            toast.warning(error);
        }
    }

    async function handleDeleteTask(taskId) {

        setSubmitError(null);
        try {
            const token = localStorage.getItem('loginToken');
            const headers = {
                'Content-Type': 'application/json'
            }
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "DELETE",
                headers
            })
            if (response.status === 401) {
                // Token is expired/invalid → log out
                localStorage.removeItem('loginToken'); // Removing expired token from localstorage
                navigate('/login', { replace: true });
                return;
            }
            if (!response.ok) throw new Error("Error while deleting task");
            const data = await response.json();
            console.log(data);
            toast.success("task is deleted!");
            setTimeout(() => window.location.reload(), 700);

        } catch (error) {
            setSubmitError(error);
            toast.warning(error);
        }
    }

    return (
        <>
            <div className="container mt-4">
                <Header />
                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Settings</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>

                                    <Link to={`/dashboard`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                                        <MdKeyboardArrowLeft />Back to Dashboard
                                    </Link>

                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                <h6 className="text-secondary fw-bold mb-3">project Names</h6>
                                {submitError && (
                                    <div className="alert alert-danger">{submitError}</div>
                                )}
                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <ul>
                                        {projects && projects?.projects?.length > 0 ? projects?.projects?.map((project) => (
                                            <li key={project._id} className="my-1">
                                                <b>{project.name}</b> - {project.description} - <button className="btn btn-danger" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                                            </li>
                                        )) : (
                                            <span className="badge fs-5 bg-light text-dark border">
                                                {projectLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {projectError && <p className="text-danger">{projectError}</p>}
                                                {'  '}No project</span>
                                        )}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">My Tasks:</h6>
                                    <ul className="ms-3">
                                        {filteredTasks?.length > 0 ? filteredTasks?.map((task) => (
                                            <li key={task._id} className="mb-1"> {task.name} - <span>{task.timeToComplete} days remained - </span> {task.owners.map((owner) => (<span className="mx-1"><u>{owner.name}</u></span>))} - <button className="btn btn-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button></li>
                                        )) : (
                                            <span className="badge fs-5 bg-light text-dark border">
                                                {taskLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {taskError && <p className="text-danger">{taskError}</p>}
                                                {'  '}No task</span>
                                        )}

                                    </ul>
                                </div>


                                <Link to="/createProject" className="btn btn-primary">
                                    + Add New project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default Settings
