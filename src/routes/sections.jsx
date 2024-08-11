import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { AuthLayout } from 'src/sections/auth';

// -- ADMIN --
import { routes as adminRoutes } from './proctectedRoutes/admin';
// -- COMPANY --
import { routes as companyRoutes } from './proctectedRoutes/company';

export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthLayout />,
    },
    ...adminRoutes,
    ...companyRoutes,
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
