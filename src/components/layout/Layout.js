import { Outlet } from "react-router-dom";
import {Footer} from "../footer/Footer";
import {Header} from "../header/Header";
// import {useState} from "react";

export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

// export default Layout;