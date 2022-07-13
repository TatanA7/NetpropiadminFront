import { Link } from 'react-router-dom';
import { useEffect } from 'react';
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

const defaultValues = { price: '', othersCost: '', managementValue: '' };
const schema = yup.object().shape({
  price: yup.string().required('Dato requerido'),
  othersCost: yup.string().required('Dato requerido'),
  managementValue: yup.string().required('Dato requerido')
});

function Step3PropertyPrices({ property, onSubmit }) {
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (!property) return

    const formValues = Object.keys(defaultValues).reduce((acc, key) => {
      acc[key] = property[key]
      return acc
    }, {})

    reset(formValues)
  }, [property])

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.error(errors);
    }
  }, [errors]);

  const submitHandler = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-40 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Paper className="mt-12 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(submitHandler)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography color="text.secondary">Precio total</Typography>
            </div>
            <div className="space-y-20">
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Ingrese valor del canon de arriendo"
                    placeholder="Ingrese valor del canon de arriendo"
                    error={!!errors.price}
                    helperText={errors?.price?.message}
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
              <div className="mb-24">
                <Typography color="text.secondary">Valor de administración</Typography>
              </div>

              <Controller
                control={control}
                name="managementValue"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Ingrese valor de administración"
                    placeholder="Ingrese valor de administración"
                    variant="outlined"
                    fullWidth
                    error={!!errors.managementValue}
                    helperText={errors?.managementValue?.message}
                  />
                )}
              />
              <div className="mb-24">
                <Typography color="text.secondary">Otros costos relacionados</Typography>
              </div>
              <Controller
                control={control}
                name="othersCost"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Otros costos relacionados"
                    placeholder="Otros costos relacionados"
                    variant="outlined"
                    fullWidth
                    error={!!errors.othersCost}
                    helperText={errors?.othersCost?.message}
                  />
                )}
              />
            </div>
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
                className="text-blue-900"
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
          </form>
        </Paper>
      </div>
    </div>
  );
}

export default Step3PropertyPrices;
