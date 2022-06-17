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
  area: yup.string().required('You must enter a subject'),
  lote: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function BasicInformation() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stratum, setStratum] = useState('');
  const [rooms, setRooms] = useState('');
  const [toilets, setToilets] = useState('');
  const [area, setArea] = useState('');
  const [lotInMeters, setLotInMeters] = useState('');
  const [parking, setParking] = useState('');
  const [garage, setGarage] = useState('');
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
  function handleSelectedStratum(event) {
    setStratum(event.target.value);
  }
  function handleSelectedRooms(event) {
    setRooms(event.target.value);
  }
  function handleSelectedToilets(event) {
    setToilets(event.target.value);
  }
  function handleSelectedArea(event) {
    setArea(event.target.value);
  }
  function handleSelectedLotInMeters(event) {
    setLotInMeters(event.target.value);
  }
  function handleSelectedParking(event) {
    setParking(event.target.value);
  }
  function handleSelectedGarage(event) {
    setGarage(event.target.value);
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-20 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Paper className="mt-12 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography color="text.secondary">Nombre de propiedad*</Typography>
            </div>
            <div className="space-y-20">
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
                name="name"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Descripción de propiedad
                    "
                    placeholder="Descripción de propiedad
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
                  <MenuItem value={40}>Casa Lote</MenuItem>
                  <MenuItem value={50}>Casa Campestre</MenuItem>
                  <MenuItem value={60}>Apartamento</MenuItem>
                  <MenuItem value={70}>Consultorio</MenuItem>
                  <MenuItem value={80}>Local</MenuItem>
                  <MenuItem value={90}>Bodega</MenuItem>
                  <MenuItem value={100}>Lote</MenuItem>
                  <MenuItem value={110}>Finca</MenuItem>
                  <MenuItem value={120}>Cabaña</MenuItem>
                  <MenuItem value={130}>Habitación</MenuItem>
                  <MenuItem value={140}>Parqueadero</MenuItem>
                </Select>
              </FormControl>
              <div className="mb-8">
                <Typography color="text.secondary">Dirección de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="subject"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 w-full"
                    label="Dirección de propiedad"
                    placeholder="Dirección de propiedad"
                    variant="outlined"
                    fullWidth
                    error={!!errors.subject}
                    helperText={errors?.subject?.message}
                    required
                  />
                )}
              />
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="demo-simple-select-label">Estrato</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={stratum}
                  label="Estrato"
                  onChange={handleSelectedStratum}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
              <div className="flex items-center justify-between">
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-label">Número de cuartos*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={rooms}
                    label="Número de cuartos"
                    onChange={handleSelectedRooms}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-label">Número de baños*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={toilets}
                    label="Número de baños"
                    onChange={handleSelectedToilets}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex items-center justify-between">
                <FormControl sx={{ minWidth: 300 }}>
                  {/* <InputLabel id="demo-simple-select-label">Área en metros*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={area}
                    label="Área en metros"
                    onChange={handleSelectedArea}
                  >
                    <MenuItem value={1}>mts</MenuItem>
                  
                  </Select> */}
                  <Controller
                    control={control}
                    name="area"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 w-full"
                        label="Área en mts2"
                        placeholder="Área en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.subject}
                        helperText={errors?.subject?.message}
                        required
                      />
                    )}
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 300 }}>
                  {/* <InputLabel id="demo-simple-select-label">Lote en metros*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lotInMeters}
                    label="Lote en metros"
                    onChange={handleSelectedLotInMeters}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select> */}
                  <Controller
                    control={control}
                    name="lote"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mt-8 w-full"
                        label="Lote en mts2"
                        placeholder="Lote en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.subject}
                        helperText={errors?.subject?.message}
                        required
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="flex items-center justify-between">
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-label">Parqueadero*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={parking}
                    label="parqueadero"
                    onChange={handleSelectedParking}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 300 }}>
                  <InputLabel id="demo-simple-select-label">Garaje*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={garage}
                    label="Garaje"
                    onChange={handleSelectedGarage}
                  >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-between mt-32 p-24">
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
