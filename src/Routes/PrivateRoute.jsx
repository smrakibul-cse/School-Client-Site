import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";

 

const PrivateRoute = ({ children }) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <span className="loading text-center loading-bars loading-lg flex justify-center mx-auto"></span>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;