import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { CompaniesPage } from '../../pages/CompaniesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/klienti" replace /> },
      { path: 'klienti', element: <CompaniesPage /> },
    ],
  },
]);
