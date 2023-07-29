import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    // user
    const navigate = useNavigate()
    return (
        <>
            {loading === false && (
                    (isAuthenticated ? <Outlet /> : navigate("/login"))
            )}
            

        </>
    )
}
export default ProtectedRoute;