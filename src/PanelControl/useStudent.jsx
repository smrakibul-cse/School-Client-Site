import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/AxiosSecure";
import UseAuth from "./UseAuth";

const useStudent = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isStudent, error, isLoading } = useQuery({
        queryKey: [user?.email, 'isStudent'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/role/${user.email}`);
                console.log(res.data);
                return res.data?.student;
            } catch (error) {
                console.error("Error fetching student role:", error);
                throw new Error("Failed to fetch student role");
            }
        }
    });

    return { isStudent, isLoading, error };
};

export default useStudent;