import { yupResolver } from '@hookform/resolvers/yup';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import jwtService from '../../auth/services/jwtService';
import { useLoginMutation } from '../../api';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo válido').required('Debe ingresar un correo'),
  password: yup
    .string()
    .required('Por favor ingrese su contraseña')
    .min(8, 'Contraseña es demasiado corta - debe ser de maximo 8 caracteres'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};
function SignInPage() {
  const { t } = useTranslation('mailApp');
  const [login, loginResult] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  useEffect(() => {
    setValue('email', 'admin@netpropi.com', { shouldDirty: true, shouldValidate: true });
    setValue('password', '12345678', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  useEffect(() => {
    if (loginResult.isUninitialized) return;
    if (loginResult.status === 'pending') return;

    if (loginResult.isSuccess) {
      jwtService.setSession(loginResult.data.login.token);

      const { user } = decode(loginResult.data.login.token);

      jwtService.emit('onLogin', {
        ...loginResult.data.login,
        role: 'admin',
        data: {
          ...user,
          displayName: `${user.name}`,
          photoURL: '',
        },
      });
      return;
    }

    if (loginResult.isError) {
      // eslint-disable-next-line no-alert
      alert(loginResult.error.name);
    }
  }, [loginResult]);

  const onSubmit = async ({ email, password }) => {
    login({
      loginVariables: {
        mail: email,
        password,
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-2/3 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <div className="flex items-center mt-32">
            <div className="flex-auto mt-px border-t" />

            <img
              className="w-164 items-center md:justify-center"
              src="assets/images/logo/netpropi-sidebar.svg"
              alt="logo"
            />
            <div className="flex-auto mt-px border-t" />
          </div>
          <Typography className="mx-8 text-center" color="text.secondary">
            Dashboard inmobiliaria
          </Typography>

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
            Bienvenido
          </Typography>
          <Typography className="mx-8 text-center" color="text.secondary">
            Ingrese su correo y contraseña
          </Typography>

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
                  label="Correo electrónico"
                  placeholder="Correo electrónico"
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña"
                  placeholder="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Recuerdame"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link
                style={{ textDecoration: 'none' }}
                className="text-md font-medium text-red-100"
                to="/forgot-password"
              >
                <Typography className="mx-8 text-red-100">Olvidaste tu contraseña?</Typography>
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
              Entrar
            </Button>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between  mt-16">
              <Typography className="mx-8">No tienes cuenta?</Typography>
              <Link style={{ textDecoration: 'none' }} className="ml-4" to="/sign-up">
                <Typography className="mx-8 text-red-100">Regístrate</Typography>
              </Link>
            </div>
          </form>
        </div>
      </Paper>

      <Box className="relative hidden md:flex flex-auto items-center justify-center h-full overflow-hidden">
        <img
          src="assets/images/logo/netpropiBackground.jpg"
          alt="background"
          style={{ objectFit: 'cover', minWidth: '100%', minHeight: '100%' }}
        />
      </Box>
    </div>
  );
}

export default SignInPage;
