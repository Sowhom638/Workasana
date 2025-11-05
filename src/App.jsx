import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Signup from './pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer position="bottom-right" />
    <Signup />
    </>
  )
}

export default App
