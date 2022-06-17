import i18next from 'i18next';
import { lazy } from 'react';
// import SignInPage from './SignInPage';
import en from './i18n/en';
import authRoles from '../../auth/authRoles';

const SignInPage = lazy(() => import('./SignInPage'));
i18next.addResourceBundle('en', 'signInPage', en);

const  SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'sign-in',
      element: <SignInPage />,
    },
  ],
};

export default SignInConfig;
