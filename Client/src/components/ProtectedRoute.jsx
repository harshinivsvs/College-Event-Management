import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Not Logged In
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role Based Protection
    if (roles && !roles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;