import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UnauthorizedAccess() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading text-center">Unauthorized Access!</h4>
              <p>We are sorry but we are not able to authenticate you. You have to subscribe to access these pages. If you are already subscribed, check you gave proper credential in the login step.</p>
              <p className="mt-3">Redirecting you to login page in {count} second or <Link to="/login">click here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedAccess