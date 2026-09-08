import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>;
    }
    return children;
}

export default RequireAuth;
