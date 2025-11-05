import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Header from '../components/Header';

function ProjectList() {
  const { data: projects, loading: projectLoading, error: projectError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/projects`);

  return (
    <>
      <div className="container mt-4">
        <Header />
        <div className="card shadow-sm border rounded-3">
          <div className="card-header bg-white text-center py-3">
            <h5 className="mb-0 fw-bold text-primary text-center">Projects</h5>
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
                <h6 className="text-secondary fw-bold mb-3">project Names</h6>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <ul>
                  {projects && projects?.projects?.length > 0 ? projects?.projects?.map((project) => (
                    <li key={project._id} className="my-1">
                      <Link to={`/projects/${project._id}`} className="text-decoration-none text-dark" ><b>{project.name}</b> - {project.description} <MdKeyboardArrowRight/></Link>
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

export default ProjectList
