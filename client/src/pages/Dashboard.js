import React from 'react'
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{ marginTop: "-100px" }}>
      <Link className='btn btn-outline-primary btn-lg' to="/dashboard/tasks">Go to tasks</Link>
    </div>
  )
}

export default Dashboard