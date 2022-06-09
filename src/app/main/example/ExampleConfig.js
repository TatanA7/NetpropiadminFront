import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
// import Example from './Example';
// import SplitScreenSignUpPage from '../pages/authentication/sign-up/SplitScreenSignUpPage';
import HelpCenterSupport from '../apps/help-center/support/HelpCenterSupport';

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
    // {
    //   path: 'example',
    //   element: <FullScreenSignInPage />,
    // },
    {
      path: 'properties',
      element: <HelpCenterSupport />,
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
