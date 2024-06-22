import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Analytics, TaskWrapper } from 'src/pages/client';
import { ClientLayout as Layout } from 'src/layouts/client';

export const routes = [
  {
    path: '/client',
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
