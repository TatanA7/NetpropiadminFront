import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import jwtService from '../../auth/services/jwtService';
import FormNatutalPerson from './FormNaturalPerson';
import FormRealEstate from './FormRealEstate';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  displayName: yup.string().required('You must enter display name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function SignUpPage() {
  const [currentTab, setCurrentTab] = useState('0');
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ displayName, password, email }) {
    jwtService
      .createUser({
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

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
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
          {/* <img className="w-64" src="assets/images/logo/logo-netpropi.svg" alt="logo" /> */}

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
            Regístrate
          </Typography>
          <Typography className="mx-8 text-center" color="text.secondary">
            Llena la información
          </Typography>
          <Tabs
            selectionFollowsFocus
            value={currentTab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="0" label="Persona Natural" />
            <Tab value="1" label="Inmobiliaria" />
          </Tabs>
          {currentTab === '0' ? <FormNatutalPerson /> : <FormRealEstate />}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between  mt-16">
            <Typography className="mx-8">Ya tienes cuenta?</Typography>
            <Link style={{ textDecoration: 'none' }} className="ml-4" to="/sign-in">
              <Typography className="mx-8 text-red-100">Loguéate</Typography>
            </Link>
          </div>
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

export default SignUpPage;
