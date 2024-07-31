import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFound from '../views/CommonPages/NotFound';
 
const PrivateRoute = ({ allowedRoles, children,token }) => {
  //const token = useSelector(state => state?.auth?.token);
  const userRoles = useSelector(state => state?.GetUser?.GetUser?.data?.roles || []);
  if (!token) {
    return <Navigate to="/login" />;
  }
 
  const hasAccess = allowedRoles?.some(role => userRoles?.some(userRole => userRole?.roleName === role));
 
  if (!hasAccess) {
    return <PageNotFound />;
  }
 
  return children ? children : <Outlet />;
};
 
export default PrivateRoute;