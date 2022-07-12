import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Link } from 'react-router-dom';

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function Price() {
  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  function onSubmit(data) {
    console.log(data);
  }

  if (_.isEmpty(form)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Paper className="mt-12 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography color="text.secondary">Precio total</Typography>
            </div>
            <div className="space-y-20">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Ingrese valor del canon de arriendo"
                    placeholder="Ingrese valor del canon de arriendo"
                    id="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <div className="mb-24">
                <Typography color="text.secondary">Valor de administración</Typography>
              </div>

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Ingrese valor de administración
                    "
                    placeholder="Ingrese valor de administración
                    "
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                  />
                )}
              />
              <div className="mb-24">
                <Typography color="text.secondary">Otros costos relacionados</Typography>
              </div>
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Otros costos relacionados"
                    placeholder="Otros costos relacionados"
                    variant="outlined"
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    required
                  />
                )}
              />
            </div>
          </form>
          <div className="mb-12  mt-12 md:mt-24 md:text-lg   sm:leading-10 text-center">
            <Button className="mx-8 " variant="text" component={NavLinkAdapter} to="new/edit">
              <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
              <span className="mx-8   font-extrabold tracking-tight leading-tight text-center">
                {' '}
                Agregar otro costo relacionado
              </span>
            </Button>
          </div>
          <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20   mt-32 ">
            <Button
              className="  text-blue-900 "
              component={Link}
              to="/properties"
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              aria-label="Register"
              type="submit"
              size="large"
              color="secondary"
              variant="contained"
            >
              Guardar
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Price;
