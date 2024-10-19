import { Link } from "react-router-dom";
import img from '../../assets/slider/error.jpg';

const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-white">
            <img className="w-full max-w-md mb-8" src={img} alt="Error" />
            <h1 className="text-5xl font-bold mb-4">Oops!!!</h1>
            <p className="text-xl mb-8">Something went wrong. The page you're looking for doesn't exist.</p>
            <Link className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300" to={'/'}>
                Go back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
