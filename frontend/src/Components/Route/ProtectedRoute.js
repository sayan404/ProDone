import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = ({ isAdmin }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    const navigate = useNavigate()
    return (
        <>
            {loading === false && (
                (isAuthenticated === true) ? <Outlet /> : 
                    (isAdmin === true && user.role !== 'admin') ? navigate("/login") : <Outlet />
            )}


        </>
    )
}
export default ProtectedRoute;