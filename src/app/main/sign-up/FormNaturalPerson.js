import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import _ from '@lodash';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import decode from 'jwt-decode';
import { useCreateUserMutation } from '../../../@gql-sdk/dist/api';
import jwtService from '../../auth/services/jwtService';

const FormNaturalPerson = () => {
  const [performRegister, registerResult] = useCreateUserMutation();

  const schema = yup.object().shape({
    name: yup.string().required('You must enter display name'),
    lastName: yup.string().required('You must enter your last name'),
    cellPhone: yup.string().required('You must enter your phone'),
    mail: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: yup
      .boolean()
      .oneOf([true], 'The terms and conditions must be accepted.'),
  });
  const defaultValues = {
    name: '',
    lastName: '',
    mail: '',
    cellPhone: '',
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
  function onSubmit({ cellPhone: cell_phone, lastName: last_name, mail, name, password }) {
    performRegister({
      variable: {
        cell_phone,
        last_name,
        mail,
        name,
        password,
      },
    });

    // JwtService.createUser({
    //   displayName,
    //   password,
    //   email,
    // })
    //   .then((user) => {
    //     // No need to do anything, registered user data will be set at app/auth/AuthContext
    //   })
    //   .catch((_errors) => {
    //     _errors.forEach((error) => {
    //       setError(error.type, {
    //         type: 'manual',
    //         message: error.message,
    //       });
    //     });
    //   });
  }
  // const responseGoogle = (response) => {
  //   console.log(response);
  // };
  // const responseFacebook = (response) => {
  //   console.log(response);
  // };

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
              label="Name"
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
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Last name"
              autoFocus
              type="text"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="cellPhone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Cell phone"
              autoFocus
              type="text"
              error={!!errors.cellPhone}
              helperText={errors?.cellPhone?.message}
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
              label="Email"
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
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              required
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
              label="Password (Confirm)"
              type="password"
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="acceptTermsConditions"
          control={control}
          render={({ field }) => (
            <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
              <FormControlLabel
                label="I agree to the Terms of Service and Privacy Policy"
                control={<Checkbox size="small" {...field} />}
              />
              <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Button
          variant="contained"
          color="secondary"
          className="w-full mt-24 mb-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Create your free account
        </Button>
        {/* <GoogleLogin
          clientId="143735181960-lldkclfjo0c0qh4a1u07rgtfv0f8n7lc.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        /> */}
        {/* <FacebookLogin
          appId="1027278951512859"
          autoLoad
          fields="name,email,picture"
          textButton="Login"
          callback={responseFacebook}
          icon="fa-facebook"
        /> */}
      </form>
    </>
  );
};

export default FormNaturalPerson;
