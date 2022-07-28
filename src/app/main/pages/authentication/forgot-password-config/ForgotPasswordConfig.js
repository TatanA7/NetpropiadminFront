import { authRoles } from 'src/app/auth';
import ForgotPasswordPageNetpropi from './ForgotPasswordPageNetpropi';
// import authRoles from '../../auth/authRoles';
// import SignInPage from './SignInPage';
// import authRoles from '../../auth/authRoles';

const ForgotPasswordConfig = {
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
      path: 'forgot-password',
      element: <ForgotPasswordPageNetpropi />,
    },
  ],
};

export default ForgotPasswordConfig;
