import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../PanelControl/UseAuth";
import UseTeacher from "../PanelControl/UseTeacher";


const TeacherPrivate = ({children}) => {
    const { user, loading } = UseAuth();
    const [isTeacher, isTeacherLoading] = UseTeacher();
    const location = useLocation();

    if (loading || isTeacherLoading) {
        return <progress className="progress w-56 flex justify-center mx-auto"></progress>
    }

    if (user && isTeacher) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default TeacherPrivate;