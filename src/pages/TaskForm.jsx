import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Header from '../components/Header';
import { useState } from 'react';
import useFetch from '../useFetch';

function TaskForm() {
    const { projectId } = useParams()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [taskName, setTaskName] = useState("");
    const [teamName, setTeamName] = useState("");
    const [timeToComplete, setTimeToComplete] = useState(0);
    const [ownerName, setOwnerName] = useState([]);
    const [tag, setTag] = useState([]);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const { data: teams, loading: teamLoading, error: teamError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);
    const { data: tagsData, loading: tagLoading, error: tagError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    const { data: users, loading: userLoading, error: userError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);
    const { data: project, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects/${projectId}`);

    const tags = tagsData?.tags || [];
    function handleTag(e) {
        let selectedTagValues = Array.from(e.target.selectedOptions, option => option.value);
        setTag(selectedTagValues)
    }

    const owners = users?.users || [];
    function handleOwner(e) {
        let selectedTagValues = Array.from(e.target.selectedOptions, option => option.value);
        setOwnerName(selectedTagValues)
    }

    async function handleTaskCreation(e) {
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    name: taskName,
                    project: projectId,
                    team: teamName,
                    owners: ownerName,
                    tags: tag,
                    timeToComplete,
                    status
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

            setTaskName("");
            setTeamName("");
            setStatus("");
            setTimeToComplete(0);
            setTag([]);
            setOwnerName([]);
            setTimeout(() => navigate(`/projects/${projectId}`), 500)
        } catch (error) {
            submitError(error)
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
                        <h5 className="mb-0 fw-bold text-primary text-center">Create New Task for '{project?.project?.name}'</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                                    <Link to={`/projects/${projectId}`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                                        <MdKeyboardArrowLeft /> Back to Project
                                    </Link>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                {submitError && (
                                    <div className="alert alert-danger">{submitError}</div>
                                )}

                                <form onSubmit={handleTaskCreation}>
                                    <div className="form-group my-2">
                                        <label htmlFor="taskName">Task Name</label>
                                        <input
                                            type="text"
                                            id="taskName"
                                            className="form-control w-75"
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="teamName">Team</label>
                                        <select id="teamName" className='form-control w-75' value={teamName} onChange={(e) => setTeamName(e.target.value)}>
                                            <option value="" disabled>--Select Team--</option>
                                            {teamLoading ? (
                                                <option disabled>Loading owners...</option>
                                            ) : teamError ? (
                                                <option disabled>Error loading owners</option>
                                            ) : teams && teams?.teams?.length > 0 ? (
                                                teams?.teams?.map((team) => (
                                                    <option key={team._id} value={team._id}>
                                                        {team.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No teams available</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="ownerName">Owners</label>
                                        <select id="ownerName" className='form-control w-75' value={ownerName} onChange={handleOwner} multiple>
                                            <option disabled>--Select Owners--</option>
                                            {userLoading ? (
                                                <option disabled>Loading owners...</option>
                                            ) : userError ? (
                                                <option disabled>Error loading owners</option>
                                            ) : owners.length > 0 ? (
                                                owners.map((owner) => (
                                                    <option key={owner._id} value={owner._id}>
                                                        {owner.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No owners available</option>
                                            )}
                                        </select>
                                        <small className="form-text text-muted">
                                            Hold <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> to select multiple tags.
                                        </small>
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="tagName">Tags</label>
                                        <select id="tagName" className='form-control w-75' value={tag} onChange={handleTag} multiple>
                                            <option disabled>--Select Tags--</option>
                                            {tagLoading ? (
                                                <option disabled>Loading tags...</option>
                                            ) : tagError ? (
                                                <option disabled>Error loading tags</option>
                                            ) : tags.length > 0 ? (
                                                tags.map((tagItem) => (
                                                    <option key={tagItem._id} value={tagItem.name}>
                                                        {tagItem.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No tags available</option>
                                            )}
                                        </select>
                                        <small className="form-text text-muted">
                                            Hold <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> to select multiple tags.
                                        </small>
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="taskName">Time to Complete</label>
                                        <input
                                            type="number"
                                            id="taskName"
                                            className="form-control w-75"
                                            value={timeToComplete}
                                            min={0}
                                            onChange={(e) => setTimeToComplete(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="status">Status</label>
                                        <select className="form-control w-75" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                                            <option value="" disabled>--Select Status--</option>
                                            {['To Do', 'In Progress', 'Completed', 'Blocked'].map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            "Create task"
                                        )}
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskForm;
