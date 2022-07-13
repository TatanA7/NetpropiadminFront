import i18next from 'i18next';

import ProjectDashboardApp from 'src/app/dashboards/project/ProjectDashboardApp';
import Properties from 'src/app/properties/properties/Properties';
import PropertyForm from 'src/app/properties/propertyForm/PropertyForm';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
// import Example from './Example';
// import SplitScreenSignUpPage from '../pages/authentication/sign-up/SplitScreenSignUpPage';
// import HelpCenterSupport from '../apps/help-center/support/HelpCenterSupport';
import ModernForgotPasswordPage from '../pages/authentication/forgot-password/ModernForgotPasswordPage';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards',
      element: <ProjectDashboardApp />,
    },
    {
      path: 'properties',
      element: <Properties />,
    },
    {
      path: 'properties/new',
      element: <PropertyForm />,
    },
    {
      path: 'properties/:id',
      element: <PropertyForm />,
    },
    {
      path: 'forgot-password',
      element: <ModernForgotPasswordPage />,
    },
  ],
};

export default ExampleConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
