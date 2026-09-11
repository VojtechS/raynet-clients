import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { ClientsPage } from '../../pages/ClientsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/clients" replace /> },
      { path: 'clients', element: <ClientsPage /> },
    ],
  },
]);
