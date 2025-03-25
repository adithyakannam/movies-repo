import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const [authenticated, setAuthenticated] = useState(null); // Start with null to avoid unnecessary redirects
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("authenticated"));
    
    if (auth) {
      setAuthenticated(true);
    } else {
      navigate("/login", { state: { from: location }, replace: true }); // Store the previous route
    }
  }, [navigate, location]);

  if (authenticated === null) return null; // Prevent flickering before authentication check completes

  return <Outlet />;
};

export default PrivateRoute;
