import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function BasicInformation() {
  const [selectedCategory, setSelectedCategory] = useState('');
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
  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-20 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Paper className="mt-2 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-12">
              <Typography color="text.secondary">Nombre de propiedad*</Typography>
            </div>
            <div className="space-y-32">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextField
                    className="w-full"
                    {...field}
                    label="Ingrese nombre asociado a la propiedad"
                    placeholder="Ingrese nombre asociado a la propiedad"
                    id="name"
                    error={!!errors.name}
                    helperText={errors?.name?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Descripción de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Descripción de propiedad*
                    "
                    placeholder="Descripción de propiedad*
                    "
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                  />
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Tipo de propiedad*</Typography>
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo de propiedad*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCategory}
                  label="Tipo de propiedad"
                  onChange={handleSelectedCategory}
                >
                  <MenuItem value={10}>casa</MenuItem>
                  <MenuItem value={20}>Apartaestudio</MenuItem>
                  <MenuItem value={30}>Oficina</MenuItem>
                </Select>
              </FormControl>
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
          <div className="flex items-center justify-between mt-32">
            <Button className="mx-8">Cancelar</Button>
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Guardar
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default BasicInformation;
