import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { ToastContainer, toast } from 'react-toastify';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';

function TaskDetails() {
    const { taskId } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const { data: task, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`);

    const dueDate = new Date(task?.task?.createdAt);
    dueDate.setDate(dueDate.getDate() + task?.task?.timeToComplete);

    async function hadleMarkAsComplete(e) {
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    status: "Completed",
                    timeToComplete: 0
                })
            })
            if (response.status === 401) {
                // Token is expired/invalid → log out
                localStorage.removeItem('loginToken'); // Removing expired token from localstorage
                navigate('/login', { replace: true });
                return;
            }
            if (!response.ok) throw new Error("Error while marking as 'Completed'");
            const data = await response.json();
            console.log(data);
            toast.success("Marked as Completed!");
            setTimeout(() => window.location.reload(), 700);
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
                        <h5 className="mb-0 fw-bold text-primary text-center">Task: {task?.task?.name}</h5>
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
                                    <div className="alert alert-danger">{JSON.stringify(submitError)}</div>
                                )}
                                <div className="mb-2">
                                    <h6 className="fw-bold mb-2 fs-5">Task Details</h6>
                                    <hr />

                                    {task && task?.task ? (
                                        <div>
                                            <p><strong>Project Name: </strong>{task?.task?.project?.name}</p>
                                            <p><strong>Team Name: </strong>{task?.task?.team?.name}</p>
                                            <p><strong>Owners: </strong>{task?.task?.owners?.map((owner) => (
                                                <span key={owner._id} className="mx-1"><u>{owner.name}</u></span>
                                            ))}</p>
                                            <p><strong>Tags: </strong>{task?.task?.tags?.map((tag) => (
                                                <span key={tag} className="badge bg-info ms-2">{tag}</span>
                                            ))}</p>
                                            <p><strong>Due Date: </strong>{`${dueDate.getDate()}/${dueDate.getMonth()}/${dueDate.getFullYear()}`}</p>
                                            <p><strong>Status: </strong>{task?.task?.status}</p>
                                            <p><strong>Time Remaining: </strong>{task?.task?.timeToComplete} Days</p>
                                            <div className="d-flex gap-2">
                                                <button disabled={isSubmitting} className={`btn ${task?.task?.status === "Completed" ? "btn-secondary" : "btn-primary"}`} onClick={hadleMarkAsComplete}>
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            Marking as 'Completed'...
                                                        </>
                                                    ) : (
                                                        task?.task?.status === "Completed" ? "Completed" : " Mark as 'Completed"
                                                    )}
                                                </button>
                                                <Link className='text-decoration-none btn btn-dark' to={`/tasks/${taskId}/updateTask`}>Edit Task</Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="badge fs-5 bg-light text-dark border">
                                            {taskLoading && <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>}
                                            {taskError && <p className="text-danger">{taskError}</p>}
                                            {'  '}No task</span>
                                    )}


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    )
}

export default TaskDetails
