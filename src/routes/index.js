import React,{ Fragment, useEffect } from "react"
import { Route, Routes,Outlet, Navigate, useNavigate } from "react-router-dom"
import Login from "../components/auth/login"
import LayoutRoutes from "./LayoutRoutes"

const Routers =() =>{
	const history = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem("token")) {
           return history(`${process.env.PUBLIC_URL}/auth/login`);
        }
    }, [])
    
    return(
        <>
            <Routes>
                <Route path={`/*`} element={<LayoutRoutes />} />
                <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Login />} />
                <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} element={<Login />} />
            </Routes>
        </>
    )
}

export default Routers