import { yupResolver } from '@hookform/resolvers/yup';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import {useTranslation} from 'react-i18next';
import jwtService from '../../auth/services/jwtService';
import { useLoginMutation } from '../../../@gql-sdk/dist/api'
import decode from 'jwt-decode'
import ShowPassword from './ShowPassword';


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function SignInPage() {
  const {t} = useTranslation('mailApp');
  const [login, loginResult] = useLoginMutation()
  
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // usuario
  useEffect(() => {
    setValue('email', 'admin@fusetheme.com', { shouldDirty: true, shouldValidate: true });
    setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);


  useEffect(() => {
    if (loginResult.isUninitialized) return
    if (loginResult.status === 'pending') return

    if (loginResult.isSuccess) {
      jwtService.setSession(loginResult.data.login.token)
      
      const { user } = decode(loginResult.data.login.token)

      jwtService.emit('onLogin', {
        ...loginResult.data.login,
        role: 'admin',
        data: {
          displayName: `${user.name}`,
          photoURL: ''
        }
      });
      return
    }

    if(loginResult.isError) {
      alert(loginResult.error.name)
    }

    
  }, [loginResult])

  const onSubmit = async ({ email, password }) => {
    login({
      loginVariables: {
        mail: email,
        password
      }
    })
  }
  const responseGoogle = (response) => {
    console.log(response);
  };
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-50" src="assets/images/logo/logo_netpropi.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                  />
                  )}
            />
            <ShowPassword />
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/pages/auth/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16 mb-10"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <GoogleLogin
                clientId="143735181960-lldkclfjo0c0qh4a1u07rgtfv0f8n7lc.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
              <FacebookLogin
                appId="1027278951512859"
                autoLoad
                fields="name,email,picture"
                textButton="Login"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </div>
            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex h-full overflow-hidden"
      >
            <img 
              src="assets/images/logo/netpropiBackground.jpg" 
              style={{ objectFit: 'cover'}}></img>
      </Box>
    </div>
  );
}

export default SignInPage;
