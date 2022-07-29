import { useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import history from '@history';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useRecoverPasswordMutation } from '../../../../api'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().required(),
  code: yup.string().required(),
  password: yup
    .string()
    .required('Porfavor poner contraseña.')
    .min(8, 'Contraseña es demasiado corta - debe ser de maximo 8 caracteres.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Contraseña debe ser igual'),
});

const defaultValues = {
  email: '',
  code: '',
  password: '',
  passwordConfirm: '',
};

function ClassicResetPasswordPage() {
  const location = useLocation()
  const [performRecoverForgotPassword, resultRequest] = useRecoverPasswordMutation()

  const { control, formState, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!location) return
    const params = new URLSearchParams(location.search)
    const email = params.get('mail')
    const code = params.get('code')
    if (!email && !code) history.push('/')

    setValue('email', email)
    setValue('code', code)
  }, [location])

  useEffect(() => {
    if (resultRequest.isUninitialized) return;
    if (resultRequest.status === 'pending') return;

    if (resultRequest.isSuccess) {
      alert('Contraseña cambiada con éxito.')
      setTimeout(() => {
        history.push('/')
      }, 1000)
    }

    if (resultRequest.isError) {
      // eslint-disable-next-line no-alert
      alert(resultRequest.error.name);
    }
  }, [resultRequest]);

  useEffect(() => {
    console.log(dirtyFields, isValid)
    if (!Object.keys(errors).length)
    console.log(errors)
  }, [errors, dirtyFields, isValid])

  function onSubmit({ code, email, password }) {
    performRecoverForgotPassword({
      recoverVariables: {
        mail: email,
        code,
        password
      },
    })
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo_netpropi.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Restablecer contraseña
          </Typography>
          <Typography className="font-medium">Crear una nueva contraseña</Typography>

          <form
            name="registerForm"
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Confirmar Contraseña"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Restablecer contraseña
            </Button>

            <Typography className="mt-32 text-md font-medium" color="text.secondary">
              <span>Regresar a</span>
              <Link className="ml-4" to="/sign-in">
                Ingresar
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicResetPasswordPage;
