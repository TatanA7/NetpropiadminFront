import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
// import { useCreateBuildsMutation } from 'src/@gql-sdk/api';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useCreateBuildsMutation } from 'src/@gql-sdk/dist/api';

function BasicInformation() {
  const [performBuild, buildingResult] = useCreateBuildsMutation();
  // const { is }= buildingResult
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stratum, setStratum] = useState('');
  const [rooms, setRooms] = useState('');
  const [toilets, setToilets] = useState('');
  const [area, setArea] = useState('');
  const [lotInMeters, setLotInMeters] = useState('');
  const [parking, setParking] = useState('');
  const [garage, setGarage] = useState('');
  const schema = yup.object().shape({
    id: yup.number().required('You must enter a id'),
    name: yup.string().required('You must enter a name'),
    estrato: yup.number().required('You must enter a stratum'),
    address: yup.string().required('You must enter address'),
    lontSize: yup.string().required('You must enter lont_sice'),
    squareFeet: yup.string().required('You must enter square_feet'),
  });
  const defaultValues = {
    id: 1,
    name: '',
    address: '',
    estrato: 2,
    lontSize: '',
    squareFeet: '',
  };
  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  // const defaultValues = { name: '', email: '', subject: '', message: '' };
  const { isValid, dirtyFields, errors } = formState;
  const form = watch();
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // useEffect(() => {
  //   if (buildingResult.isUninitialized) return;
  //   if (buildingResult.status === 'pending') return;

  //   if (buildingResult.isSuccess) {
  //     const building = buildingResult.data.createBuilds;

  //     building.emit('onLogin', {
  //       ...buildingResult.data.createBuilds,
  //       role: 'admin',
  //       data: {
  //         displayName: `${building.name}`,
  //         photoURL: '',
  //       },
  //     });
  //     return;
  //   }

  //   if (buildingResult.isError) {
  //     // Reemplazar por un componente de notificacion
  //     // eslint-disable-next-line no-alert
  //     alert('Register Build failed');
  //   }
  // }, [buildingResult]);

  // eslint-disable-next-line camelcase
  function onSubmit({ id, name, address, estrato, lontSize: lont_size, squareFeet: square_feet }) {
    performBuild({
      variables: {
        // acquired_in,
        id,
        name,
        address,
        // cost,
        // cupancy,
        estrato,
        // latitude,
        // loan_balance,
        // longitude,
        lont_size,
        // market_value,
        // property_records,
        // rent,
        square_feet,
        // units,
        // user_id,
        // year_built,
      },
    });
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
                name="id"
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
                    error={!!errors.id}
                    helperText={errors?.id?.message}
                    required
                  />
                )}
              />
              {/* <div className="mb-8">
                <Typography color="text.secondary">Descripción de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="estrato"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="estrato
                    "
                    placeholder="Estrato
                    "
                    variant="outlined"
                    fullWidth
                    error={!!errors.estrato}
                    helperText={errors?.estrato?.message}
                    required
                  />
                )}
              /> */}
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
                  <MenuItem value={1}>Casa Nueva</MenuItem>
                  <MenuItem value={2}>Casa Usada</MenuItem>
                  <MenuItem value={3}>Casa Lote</MenuItem>
                  <MenuItem value={4}>Casa Campestre</MenuItem>
                  <MenuItem value={5}>Apartamento Nuevo</MenuItem>
                  <MenuItem value={6}>Apartamento Usado</MenuItem>
                  <MenuItem value={20}>Apartaestudio Nuevo</MenuItem>
                  <MenuItem value={21}>Apartaestudio Usado</MenuItem>
                  <MenuItem value={30}>Oficina</MenuItem>
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
                name="address"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 w-full"
                    label="Dirección de propiedad"
                    placeholder="Dirección de propiedad"
                    variant="outlined"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors?.address?.message}
                    required
                  />
                )}
              />
              <div className=" flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20 ">
                <FormControl className=" sm: w-full md:   max-w-320">
                  <InputLabel id="demo-simple-select-label">Estrato</InputLabel>
                  <Select
                    // control={control}
                    // name="estrato"
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
              </div>
              <div className=" flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20 ">
                <FormControl className=" sm: w-full md:   max-w-320">
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
                <FormControl className=" sm: w-full md:   max-w-320">
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
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl className=" sm: w-full md:   max-w-320">
                  <Controller
                    control={control}
                    name="lontSize"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Área en mts2"
                        placeholder="Área en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.lontSize}
                        helperText={errors?.lontSize?.message}
                        required
                      />
                    )}
                  />
                </FormControl>
                <FormControl className=" sm: w-full md:   max-w-320">
                  <Controller
                    control={control}
                    name="squareFeet"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Lote en mts2"
                        placeholder="Lote en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.squareFeet}
                        helperText={errors?.squareFeet?.message}
                        required
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl className=" sm: w-full md:   max-w-320">
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
                <FormControl className=" sm: w-full md:   max-w-320">
                  <InputLabel id="demo-simple-select-label">Garaje*</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={garage}
                    label="Garaje"
                    className="mt-8"
                    onChange={handleSelectedGarage}
                  >
                    <MenuItem backgroundColor="secondary" value={0}>
                      0
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20   mt-32">
              <Button className="  text-blue-900 " variant="outlined">
                Cancelar
              </Button>
              <Button
                // variant="contained"
                aria-label="Register"
                type="submit"
                size="large"
                color="secondary"
                variant="contained"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
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

export default BasicInformation;
