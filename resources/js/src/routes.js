import React, { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import WebUser from "./pages/WebUser";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import User from "./pages/User";
import EmiCalculator from "./pages/EmiCalculator";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import Setting from "./pages/Setting";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/Page404";
import Query from "./pages/Query";
import Reviews from "./pages/Reviews";
import RejectedUsers from "./pages/RejectedUsers";

// ----------------------------------------------------------------------

export default function Router() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const token = sessionStorage.getItem("yx6b78*&lhg25$^axw");
    useEffect(() => {
        if (token === "im76axnr675p8_jdw*jhf_&8.{(c8r7ew)}") {
            setIsLoggedin(true);
        }
    }, []);

    return useRoutes([
        {
            path: "/",
            element: <LogoOnlyLayout />,
            children: [
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "404", element: <NotFound /> },
                { path: "/", element: <Landing /> },
                { path: "/privacypolicy", element: <PrivacyPolicy /> },
                { path: "/terms", element: <Terms /> },
                { path: "*", element: <Navigate to="/404" /> },
            ],
        },
        {
            path: "/dashboard",
            element:
                token === "im76axnr675p8_jdw*jhf_&8.{(c8r7ew)}" ? (
                    <DashboardLayout />
                ) : (
                    <Navigate to="*" />
                ),
            children: [
                { element: <Navigate to="/dashboard/app" replace /> },
                { path: "app", element: <DashboardApp /> },
                { path: "user", element: <User /> },
                { path: "webuser", element: <WebUser /> },
                { path: "admin", element: <Admin /> },
                { path: "query", element: <Query /> },
                { path: "reviews", element: <Reviews /> },
                { path: "setting", element: <Setting /> },
                { path: "emicalculator", element: <EmiCalculator /> },
                { path: "tasks", element: <Tasks /> },
                { path: "rejectedusers", element: <RejectedUsers /> },
            ],
        },
        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}
