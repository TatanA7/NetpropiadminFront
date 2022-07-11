import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ModernForgotPasswordPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 md:p-32">
      <Paper className="flex w-full sm:w-auto min-h-full sm:min-h-auto md:w-full md:max-w-6xl rounded-0 sm:rounded-2xl sm:shadow overflow-hidden">
        <div className="w-full sm:w-auto py-32 px-16 sm:p-48 md:p-64 ltr:border-r-1 rtl:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img className="w-48" src="assets/images/logo/logo_netpropi.svg" alt="logo" />

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
              Restablecer contraseña?
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>Llena el formulario para restablecer contraseña</Typography>
            </div>

            <form
              name="registerForm"
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
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-4"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Enviar link
              </Button>

              <Typography className="mt-32 text-md font-medium" color="text.secondary">
                <span>Devolverse a</span>
                <Link className="ml-4" to="/sign-in">
                  sign in
                </Link>
              </Typography>
            </form>
          </div>
        </div>

        <Box className="relative hidden md:flex flex-auto items-center justify-center h-full overflow-hidden">
          <img
            src="assets/images/logo/netpropiBackground.jpg"
            alt="background"
            style={{ objectFit: 'cover', minWidth: '100%', minHeight: '100%' }}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default ModernForgotPasswordPage;
