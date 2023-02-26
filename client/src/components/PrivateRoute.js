import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth";
import UnauthorizedAccess from "./UnauthorizedAccess";
import axios from 'axios';

function PrivateRoute() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);

      if (!data.ok) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    };
    if (auth) authCheck();
  }, [auth]);

  return loading ? <UnauthorizedAccess /> : <Outlet />;

}

export default PrivateRoute