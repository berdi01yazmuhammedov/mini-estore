import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom';
interface ProtectedRouteProps{
    children: JSX.Element;
}
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || "feardota15";
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const storedKey = localStorage.getItem("admin_key");

    if(storedKey === ADMIN_KEY){
        return children;
    }
  return <Navigate to="/admin-login" replace/>
}

export default ProtectedRoute