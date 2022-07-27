import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import _ from '@lodash';
import FormHelperText from '@mui/material/FormHelperText';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import decode from 'jwt-decode';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Typography } from '@mui/material';
import { useCreateUserMutation } from '../../api';
import jwtService from '../../auth/services/jwtService';

const FormRealEstate = () => {
  const [performRegister, registerResult] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Ingrese un nombre'),
    cellPhone: yup
      .string()
      .max(10, 'Máximo 10 caracteres')
      .required('Debe ingresar un télefono móvil')
      .matches(/^\d+$/, 'Debe ingresar números')
      .min(10, 'Mínimo 10 caracteres'),
    NIT: yup
      .string()
      .matches(/(^[0-9]+-{1}[0-9]{1})/, 'Debe ser un NIT válido')
      .required('Dato requerido'),
    mail: yup.string().email('Debe ser un correo válido').required('Debe ingresar un correo'),
    password: yup
      .string()
      .required('Por favor ingrese su contraseña')
      .min(8, 'Contraseña es demasiado corta - debe ser de maximo 8 caracteres'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Contraseña debe ser igual'),
    acceptTermsConditions: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
  });
  const defaultValues = {
    name: '',
    mail: '',
    cellPhone: '',
    NIT: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false,
  };
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors, setError } = formState;
  useEffect(() => {
    if (registerResult.isUninitialized) return;
    if (registerResult.status === 'pending') return;

    if (registerResult.isSuccess) {
      const { token } = registerResult.data.createUser;
      jwtService.setSession(token);

      const { user } = decode(token);

      jwtService.emit('onLogin', {
        ...registerResult.data.createUser,
        role: 'admin',
        data: {
          displayName: `${user.name}`,
          photoURL: '',
        },
      });
      return;
    }

    if (registerResult.isError) {
      // Reemplazar por un componente de notificacion
      // eslint-disable-next-line no-alert
      alert('Register user failed');
    }
  }, [registerResult]);
  // eslint-disable-next-line camelcase
  function onSubmit({ cellPhone: cell_phone, mail, name, password, NIT }) {
    performRegister({
      variable: {
        cell_phone,
        mail,
        NIT,
        name,
        password,
      },
    });
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Nombre"
              autoFocus
              type="text"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
        <Controller
          name="NIT"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="NIT"
              type="text"
              error={!!errors.NIT}
              helperText={errors?.NIT?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
        <Controller
          name="mail"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Correo electrónico"
              type="email"
              error={!!errors.mail}
              helperText={errors?.mail?.message}
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

        <Controller
          name="passwordConfirm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Confirmar Contraseña"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
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
        <Controller
          control={control}
          name="cellPhone"
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono móvil"
              className="mb-24"
              placeholder="Teléfono móvil"
              variant="outlined"
              fullWidth
              error={!!errors.cellPhone}
              helperText={errors?.cellPhone?.message}
              InputProps={{
                startAdornment: (
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: _field }) => (
                      <InputAdornment position="start">
                        +57
                        {/* <CountryCodeSelector {..._field} /> */}
                      </InputAdornment>
                    )}
                  />
                ),
              }}
            />
          )}
        />
        <Controller
          name="acceptTermsConditions"
          control={control}
          render={({ field }) => (
            <FormControl className="items-center flex-row" error={!!errors.acceptTermsConditions}>
              <FormControlLabel
                className="mx-8 bg-white text-red-100"
                // label="Términos y condicines"
                control={<Checkbox size="small" {...field} />}
              />
              <a
                rel="noreferrer noopener"
                href="https://pruebas.netpropi.com/col/politicas_privacidad"
                target="_blank"
                style={{ textDecoration: 'none', backgroundColor: 'white' }}
              >
                <Typography className="mx-8 bg-white text-red-100">
                  Términos y condicines
                </Typography>
              </a>
              <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
            </FormControl>
          )}
        />
        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Crear Cuenta
        </Button>
      </form>
    </>
  );
};
export default FormRealEstate;
