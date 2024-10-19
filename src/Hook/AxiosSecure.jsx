
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://rowmari-c-g-zaman-server.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;