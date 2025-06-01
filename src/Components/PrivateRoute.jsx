import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("authenticated"))?.data || false
    // console.log(typeof auth)
    // console.log(auth)
    if (auth === true) {
      // navigate(location?.pathname || "/")
    }else{
      navigate("/login", { state: { from: location }, replace: true }); // Store the previous route
    }
  }, [navigate, location]);


  return <Outlet />;
};

export default PrivateRoute;
