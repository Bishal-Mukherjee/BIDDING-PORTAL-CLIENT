import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AdminLayout as Layout } from 'src/layouts/admin';
import { Analytics, TaskWrapper, ClientManagement, CompanyManagement } from 'src/pages/admin';

export const routes = [
  {
    path: '/admin',
    element: (
      <Layout>
        <Suspense>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      { element: <Analytics />, index: true },
      { path: 'analytics', element: <Analytics /> },
      { path: 'analytics/:taskId', element: <TaskWrapper /> },
      { path: 'clients', element: <ClientManagement /> },
      { path: 'companies', element: <CompanyManagement /> },
    ],
  },
];
