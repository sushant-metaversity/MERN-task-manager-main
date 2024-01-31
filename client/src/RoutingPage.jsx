import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserLoginPage from "./Components/UserLogin/UserLoginPage";
import SignUpPage from "./Components/UserSignUp/SignUpPage";
import HomePage from "./Components/HomePage/HomePage";
const NewTask = React.lazy(() => import("./Components/NewTask/NewTask"));
const SocketLayout= React.lazy(() => import("./Components/Socket/SocketLayout"))
// import Layout from "../layout";

// import Games from "../qTech/games/Games";

// import Aboutus from "./aboutus";
const Layout = React.lazy(() => import("./Components/Layout"));
const Dashboard = React.lazy(() => import("./Components/Dashboard/Dashboard"));


const RoutingPage = () => {
    return (
        <div>

            <Routes>

                <Route path="/" element={<Layout />} >
                    <Route path="Home" element={<HomePage />} />
                    <Route path="" element={<SocketLayout />}>
                        <Route path="Add-List" element={<Dashboard />} />
                        <Route path="NewTask" element={<NewTask />} />
                        <Route path="UpdateTask/:id" element={<NewTask />} />
                        <Route path="*" element={<Navigate to="/Home" />} />
                    </Route>
                    <Route path="auth/login" element={<UserLoginPage />} />
                    <Route path="auth/signUp" element={<SignUpPage />} />
                    <Route path="*" element={<Navigate to="/Home" />} />
                </Route>

            </Routes>

        </div>
    );
};

export default RoutingPage;
