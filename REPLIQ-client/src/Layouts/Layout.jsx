import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";
import { useEffect } from "react";


const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({top:0});
    }, [pathname])

    return (
        <div className="max-w-screen-2xl mx-auto">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;