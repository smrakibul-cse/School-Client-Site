import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/AxiosSecure";
import UseAuth from "./UseAuth";


const UseTeacher = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTeacher, isPending: isTeacherLoading } = useQuery({
        queryKey: [user?.email, 'isTeacher'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/teacher/${user.email}`);
            console.log(res.data);
            return res.data?.Teacher;
        }
    })
    return [isTeacher, isTeacherLoading]

};

export default UseTeacher;