import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../views/Index';
import Component from '../components';
import PageNotFound from '../views/CommonPages/NotFound';
import UserData from '../utils/User';
import Login from '../views/auth-views/authentication/Maintenance';
import Disclaimer from '../views/auth-views/authentication/Disclaimer';
import AdditionalFee from '../views/auth-views/authentication/AdditionalFee';
import TenantRegistration from '../views/auth-views/authentication/TenantRegistration';
import PrivateRoute from '../views/PrivateRouting';
import PublicRoute from '../views/Public';
import Constants from '../config/AppConfig';

 
const getDefaultRoute = (roles) => {
  if (roles?.some(role => role?.roleName === 'Community Admin')) {
    return `${Constants.APP_PREFIX_PATH}/user/UserList`;
  }
  if (roles?.some(role => role?.roleName === 'System Admin')) {
    return `${Constants.APP_PREFIX_PATH}/dashboard`;
  }
  if (roles?.some(role => role?.roleName === 'unit_user')) {
    return `${Constants.APP_PREFIX_PATH}/list`;
  }
  return '/not-found';
};
 
const AppRoutes = () => {
  const { Spinner } = Component;
  const { getUserLoginToken, getRoles } = UserData();
  const roles = getRoles();
  const token = getUserLoginToken();
 
  const defaultRoute = roles?.length > 0 ? getDefaultRoute(roles) : '/not-found';
 
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/maintenance" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/disclaimer" element={
          <PublicRoute>
            <Disclaimer />
          </PublicRoute>
        } />
        <Route path="/additional" element={
          <PublicRoute>
            <AdditionalFee />
          </PublicRoute>
        } />
        <Route path="/tenant" element={
          <PublicRoute>
            <TenantRegistration />
          </PublicRoute>
        } />
        <Route
          path={`${Constants.APP_PREFIX_PATH}/*`}
          element={
            <PrivateRoute token={token} allowedRoles={["System Admin", "Community Admin", "HOA Admin", 'Unit User', 'Board Member', 'hoa_admin']}>
              <Routes>
                {routes.map((route, i) => {
                  const RouteComponent = route.component;
                  return (
                    <Route
                      key={i}
                      path={route.path.replace(Constants.APP_PREFIX_PATH, '')}
                      element={
                        route.isPrivate ? (
                          <PrivateRoute token={token} allowedRoles={route.Role}>
                            <RouteComponent />
                          </PrivateRoute>
                        ) : (
                          <RouteComponent />
                        )
                      }
                    />
                  );
                })}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to={token ? defaultRoute : "/maintenance"} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
 
export default AppRoutes;
 