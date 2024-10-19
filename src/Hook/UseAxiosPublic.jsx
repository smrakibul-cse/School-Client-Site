import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://rowmari-c-g-zaman-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;