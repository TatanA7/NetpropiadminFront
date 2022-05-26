import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import _ from '@lodash';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import JwtService from 'src/app/auth/services/jwtService';

const FormRealEstate = () => {
  const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    nit: '',
    phone: '',
    acceptTermsConditions: false,
  };
  const schema = yup.object().shape({
    displayName: yup.string().required('You must enter display name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
      .string()
      .required('Please enter your password.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: yup
      .boolean()
      .oneOf([true], 'The terms and conditions must be accepted.'),
  });
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors, setError } = formState;
  function onSubmit({ displayName, password, email }) {
    JwtService.createUser({
      displayName,
      password,
      email,
    })
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }
  return (
    <>
      <form
        name="registerForm"
        noValidate
        className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Display name"
              autoFocus
              type="name"
              error={!!errors.displayName}
              helperText={errors?.displayName?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

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
          name="nit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Nit"
              type="nit"
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Phone"
              type="phone"
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
          className="w-full mt-24"
          aria-label="Register"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          type="submit"
          size="large"
        >
          Create your free account
        </Button>
      </form>
    </>
  );
};
export default FormRealEstate;
