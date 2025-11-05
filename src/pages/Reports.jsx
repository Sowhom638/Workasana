import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Cell, Pie, PieChart, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import Header from '../components/Header';
function Reports() {
    const { data: tasks, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`);
    const { data: teams, loading: teamsLoading, error: teamsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/teams`);
    const { data: owners, loading: ownerLoading, error: ownerError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/auth/users`);


    const pieChart1_Data = [
        {
            name: "Completed",
            value: tasks && tasks?.tasks?.length > 0 ? tasks?.tasks?.filter((task) => task.status === 'Completed')?.length : 0
        },
        {
            name: "In Progress",
            value: tasks && tasks?.tasks?.length > 0 ? tasks?.tasks?.filter((task) => task.status !== 'Completed')?.length : 0
        }
    ];
    const closedByteam_BarChartData = teams && teams?.teams?.length > 0 ? teams?.teams?.map((team) => ({
        name: team.name,
        value: tasks && tasks?.tasks?.length > 0 ? tasks?.tasks?.filter((task) => task.team?._id === team._id)?.filter((task) => task.status === 'Completed')?.length : 0
    })) : [];
    const closedByteam_BarChartData2 = owners && owners?.users?.length > 0 ? owners?.users?.map((owner) => ({
        name: owner.name,
        value: tasks && tasks?.tasks?.length > 0 ? tasks?.tasks?.filter((task) => task.owners?.some((user) => owner._id === user._id))?.filter((task) => task.status === 'Completed')?.length : 0
    })) : [];

    console.log(closedByteam_BarChartData);

    const COLORS = ['#314dccff', '#5a73e2ff', '#8599f1ff', '#abb8f3ff', '#ccd3f3ff']

    return (
        <>
            <div className="container mt-4">
                <Header />

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Reports</h5>
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
                                <h6 className="text-secondary fw-bold mb-3 fs-4 text-center">Reports Overview</h6>
                                {tasks && tasks?.tasks?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4'>
                                        <PieChart width={300} height={300}>
                                            <Pie
                                                dataKey='value'
                                                data={pieChart1_Data}
                                                cx={150}
                                                cy={150}
                                                fill='#763b5fff'
                                                label
                                            >
                                                {pieChart1_Data.map((entry, index) => (
                                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                        <h3>Total tasks Completed and In Progress</h3>
                                    </div>) : (
                                    <div className="py-3">
                                        {loading ? (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : error ? (
                                            <p className="text-danger">{error}</p>
                                        ) : (
                                            'No tasks found.'
                                        )}
                                    </div>
                                )}
                                <hr />

                                <h3 className='mb-2'>Tasks closed by Teams</h3>
                                {teams?.teams?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4 my-2'>
                                        <BarChart
                                            style={{ width: '100%', heighteight: '200px', aspectRatio: 2, overflowX: 'scroll' }}
                                            responsive
                                            data={closedByteam_BarChartData}
                                        >
                                            <XAxis dataKey="name" />
                                            <YAxis width="auto" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#4d6bf3ff" />
                                        </BarChart>
                                    </div>) : (
                                    <div className="py-3">
                                        {teamsLoading ? (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : teamsError ? (
                                            <p className="text-danger">{teamsError}</p>
                                        ) : (
                                            'No tasks found.'
                                        )}
                                    </div>
                                )}
                                <hr />

                                <h3 className='mb-2'>Tasks closed by Owners</h3>
                                {owners?.users?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4 my-2'>
                                        <BarChart
                                            style={{ width: '100%', heighteight: '200px', aspectRatio: 2, overflowX: 'scroll' }}
                                            responsive
                                            data={closedByteam_BarChartData2}
                                        >
                                            <XAxis dataKey="name" />
                                            <YAxis width="auto" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#8192dbff" />
                                        </BarChart>
                                    </div>) : (
                                    <div className="py-3">
                                        {ownerLoading ? (
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : ownerError ? (
                                            <p className="text-danger">{ownerError}</p>
                                        ) : (
                                            'No tasks found.'
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports
