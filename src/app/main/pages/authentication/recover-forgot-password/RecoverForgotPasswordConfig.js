import { authRoles } from 'src/app/auth';
import ForgotPasswordPageNetpropi from './RecoverForgotPasswordNetpropi';

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
      path: 'recover-forgot-password',
      element: <ForgotPasswordPageNetpropi />,
    },
  ],
};

export default ForgotPasswordConfig;
