import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TaskForm from './pages/TaskForm.jsx'
import ProjectForm from './pages/ProjectForm.jsx';
import ProjectList from './pages/ProjectList.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import ProjectMangement from './pages/ProjectManagement.jsx'
import TaskDetails from './pages/TaskDetails.jsx'
import Settings from './pages/Settings.jsx'
import Reports from './pages/Reports.jsx'
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectList />
      </ProtectedRoute>
    )
  },
  {
    path: "/projects/:projectId",
    element: (
      <ProtectedRoute>
        <ProjectMangement />
      </ProtectedRoute>
    )
  },
  {
    path: "/teams",
    element: (
      <ProtectedRoute>
        <TeamManagement />
      </ProtectedRoute>
    )
  },
  {
    path: "/tasks/:taskId",
    element: (
      <ProtectedRoute>
        <TaskDetails />
      </ProtectedRoute>
    )
  },
  {
    path: "/createProject",
    element: (
      <ProtectedRoute>
        <ProjectForm />
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  },
  {
    path: "/reports",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    )
  },
  {
    path: "/createTask/:projectId",
    element: (
      <ProtectedRoute>
        <TaskForm />
      </ProtectedRoute>
    )
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
