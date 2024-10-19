import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Page/Footer/Footer";
import Header from "../Shared/Header/Header";

const Root = () => {



    return (
        <div className="mx-auto font-poppins bg-white">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
