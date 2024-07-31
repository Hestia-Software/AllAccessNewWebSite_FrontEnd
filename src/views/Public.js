// src/views/PublicRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserData from '../utils/User';
 
const PublicRoute = ({ children }) => {
  const { getUserLoginToken, getRoles } = UserData();
  const token = getUserLoginToken();
  const roles = getRoles();
  if (token && roles) {
    const defaultRoute = getDefaultRoute(roles);
    return <Navigate to={defaultRoute} />;
  }
 
  return children ? children : <Outlet />;
};
 
const getDefaultRoute = (roles) => {
  if (roles?.some(role => role?.roleName === 'Community Admin')) {
    return '/app/user/UserList';
  }
  if (roles?.some(role => role?.roleName === 'System Admin')) {
    return `/app/dashboard`;
  }
  if (roles?.some(role => role?.roleName === 'unit_user')) {
    return '/app/list';
  }
  return '/not-found';
};
 
export default PublicRoute;