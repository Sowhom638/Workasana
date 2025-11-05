import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function Dashboard() {
  const [searchStatus, setSearchStatus] = useSearchParams()
  const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
  const { data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);
  const { data: tasks, loading: taskLoading, error: taskError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
  const { data: me, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`);

  let filteredTasks = [];
  if (tasks?.tasks) {
    const currentStatus = searchStatus.get('status') || 'All';
    if (currentStatus === 'All') {
      filteredTasks = tasks.tasks.filter((task)=> task.owners?.some((owner)=> owner._id === me?.user?._id));
    } else {
      filteredTasks = tasks.tasks.filter(project => project.status === currentStatus);
    }
  }

  return (
    <>
      <div className="container mt-4">
        <Header />
        <div className="card shadow-sm border rounded-3">
          <div className="card-header bg-white text-center py-3">
            <h5 className="mb-0 fw-bold text-primary text-center">Dashboard</h5>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              {/* Sidebar */}
              <div className="col-md-3 border-end bg-light">
                <div className="p-3">
                  <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                  <ul className="list-unstyled mb-0">
                    {['Projects', 'Teams', 'Reports', 'Settings'].map((item) => (
                      <li key={item} className="mb-2">
                        <Link to={`/${item.toLowerCase()}`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                          {item}<MdKeyboardArrowRight />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9 p-4">
                <h6 className="text-secondary fw-bold mb-3">project Names</h6>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {projects && projects?.projects?.length > 0 ? projects?.projects?.map((project) => (
                    <span key={project._id} className="fs-5 bg-light text-dark rounded-pill px-2 py-1" style={{ border: `1px solid #b40b51ff` }}>
                      <Link to={`/projects/${project._id}`} className="text-decoration-none text-dark" >{project.name}</Link>
                    </span>
                  )) : (
                    <span className="badge fs-5 bg-light text-dark border">
                      {projectLoading && <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>}
                      {projectError && <p className="text-danger">{projectError}</p>}
                      {'  '}No project</span>
                  )}
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold mb-2">My Tasks:</h6>
                  <ul className="ms-3">
                    {filteredTasks?.length > 0 ? filteredTasks?.map((task) => (
                      <li key={task._id} className="mb-1"><Link to={`/tasks/${task._id}`} className='text-decoration-none text-dark'> {task.name} - <span>{task.timeToComplete} days remained - </span> {task.owners.map((owner)=>( <span className="mx-1"><u>{owner.name}</u></span> ))}</Link><MdKeyboardArrowRight /></li>
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

                <div className="mb-4">
                  <strong>Quick Filters:</strong>
                  <span className="badge bg-primary ms-2" onClick={() => setSearchStatus({ status: 'All' })} style={{ cursor: 'pointer' }}>All</span>
                  {statuses.map((status) => (
                    <span onClick={() => setSearchStatus({ status: status })} className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>{status}</span>
                  ))}
                </div>

                <Link to="/createProject" className="btn btn-primary">
                  + Add New project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
