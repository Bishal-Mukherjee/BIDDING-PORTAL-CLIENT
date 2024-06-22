import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Analytics, TaskWrapper } from 'src/pages/company';
import { CompanyLayout as Layout } from 'src/layouts/company';

export const routes = [
  {
    path: '/company',
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
    ],
  },
];
