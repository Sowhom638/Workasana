import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function ProjectMangement() {
    const { projectId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortFilter, setSortFilter] = useState('');
    const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
    const { data: project, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`);
    const { data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const { data: users, loading: userLoading, error: userError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);

    const currentStatus = searchParams.get('status') || 'All';
    const currentOwner = searchParams.get('owner') || 'All';

    let filteredTasks = [];
    if (tasks?.tasks) {
        filteredTasks = tasks.tasks.filter((task)=> task.project?._id === projectId).filter(task => {

            if (currentStatus !== 'All' && task.status !== currentStatus) {
                return false;
            }

            if (currentOwner !== 'All' && task.owners?.some((owner) => owner.name !== currentOwner)) {
                return false;
            }
            return true;
        });
    }
    if (filteredTasks.length > 0) {
        if(sortFilter === "HighToLow"){
            filteredTasks = [...filteredTasks].sort((a, b)=> b.timeToComplete - a.timeToComplete)
        }else{
            filteredTasks = [...filteredTasks].sort((a, b)=> a.timeToComplete - b.timeToComplete)
        }
    }

    const updateFilter = (newParams) => {
        const updated = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === 'All') {
                updated.delete(key);
            } else {
                updated.set(key, value);
            }
        });
        setSearchParams(updated);
    };


    return (
        <>
            <div className="container mt-4">
                <Header />
                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">{project?.project?.name}</h5>
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

                                <div className="mb-4">
                                    <h6 className="fw-bold mb-2">Task List:</h6>
                                    <ul className="ms-3">
                                        {filteredTasks?.length > 0 ? filteredTasks?.map((task) => (
                                            <li key={task._id} className="mb-1"> <strong>{task.name}</strong> - <span>{task.status} - </span> <span>{task.timeToComplete} days - </span> {task.owners.map((owner) => (<span className="mx-1"><u>{owner.name}</u></span>))}</li>
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
                                <Link to={`/createTask/${projectId}`} className="btn btn-primary">
                                    + Add New Task
                                </Link>
                                <hr />
                                <div className="mb-4">
                                    <strong>Statuses:</strong>
                                    <span className="badge bg-primary ms-2" onClick={() => updateFilter({ status: 'All' })} style={{ cursor: 'pointer' }}>All</span>
                                    {statuses.map((status) => (
                                        <span key={status} onClick={() => updateFilter({ status: status })} className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>{status}</span>
                                    ))}

                                    <br />
                                    <strong>Owners:</strong>
                                    <span className="badge bg-secondary ms-2" onClick={() => updateFilter({ owners: 'All' })} style={{ cursor: 'pointer' }}>All</span>
                                    {users?.users && users?.users?.length > 0 ? users?.users?.map((owner) => (
                                        <span key={owner._id} onClick={() => updateFilter({ owners: owner.name })} className="badge bg-secondary ms-2" style={{ cursor: 'pointer' }}>{owner.name}</span>
                                    )) : (
                                        <span className="badge bg-secondary ms-2">
                                            {userLoading && <div className="spinner-border text-light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>}
                                            {userError && <p className="text-danger">{userError}</p>}
                                            {'  '}No sales Agent is listed</span>
                                    )}
                                </div>
                                <div className="d-flex gap-3">
                                    <b>Sort By:</b>
                                    <div className="form-group d-flex gap-2">
                                        <label htmlFor="LowToHigh">less time to close</label>
                                        <input type="radio" name="sortFilter" value="LowToHigh" id="LowToHigh" onChange={(e) => setSortFilter(e.target.value)} />
                                    </div>
                                    <div className="form-group d-flex gap-2">
                                        <label htmlFor="HighToLow">enough time to close</label>
                                        <input type="radio" name="sortFilter" value="HighToLow" id="HighToLow" onChange={(e) => setSortFilter(e.target.value)} />
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

export default ProjectMangement
