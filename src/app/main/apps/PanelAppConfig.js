import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Tenant = lazy(() => import('./tenants/Tenant'));
const Transactions = lazy(() => import('./transactions/Transactions'));
const Affectations = lazy(() => import('./affectations/Affectations'));

const PanelAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'inquilinos',
      element: <Tenant />,
    },
    {
      path: 'transacciones',
      element: <Transactions />,
    },
    {
      path: 'afectaciones',
      element: <Affectations />,
    },
    {
      path: '/',
      element: <Navigate to="properties" />,
    },
  ],
};

export default PanelAppConfig;
