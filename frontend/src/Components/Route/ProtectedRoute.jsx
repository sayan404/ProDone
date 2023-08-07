import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = ({ isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
    console.log(user.role);
    const navigate = useNavigate()

    if (loading) {
        // Show a loading indicator or placeholder while waiting for the user data.
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If the user is not authenticated, navigate to the login page.
       return navigate("/login");
        // return null;
    }
    if (!user) {
         navigate("/login");
        // return null;
    }

    if (isAdmin && user && user.role !== 'admin') {
         navigate("/login");
        // return null;
    }
    if (isAdmin && !user) {
         navigate("/login");
        // return null;
    }

    // Render the protected content if the user is authenticated and has the correct role.
    return <Outlet />;

}
export default ProtectedRoute;