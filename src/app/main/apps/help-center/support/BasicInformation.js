import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormControl, InputLabel, Menu, MenuItem, Select, FormHelperText } from '@mui/material';
import { useCreateBuildsMutation } from '../../../../api';

function BasicInformation() {
  const [performBuild, buildingResult] = useCreateBuildsMutation();
  const schema = yup.object().shape({
    address: yup.string().required('Dato requerido'),
    description: yup.string().required('Dato requerido'),
    lotArea: yup.string().required('Dato requerido'),
    area: yup.string().required('Dato requerido'),
    name: yup.string().required('Dato requerido'),
    numberBathrooms: yup.string().required('Dato requerido'),
    numberRooms: yup.string().required('Dato requerido'),
    parkingLot: yup.string().required('Dato requerido'),
    propertyType: yup.string().required('Dato requerido'),
    stratum: yup.string().required('Dato requerido'),
    garages: yup.string().required('Dato requerido'),
    // imgDescription: yup.string().required('Dato requerido'),
    // imgName: yup.string().required('Dato requerido'),
    // managementValue: yup.string().required('Dato requerido'),
    // othersCost: yup.string().required('Dato requerido'),
    // price: yup.string().required('Dato requerido'),
  });
  const defaultValues = {
    address: '',
    description: '',
    lotArea: '',
    name: '',
    numberBathrooms: '',
    numberRooms: '',
    parkingLot: '',
    propertyType: '',
    stratum: '',
    garages: '',
    area: '',
  };
  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  
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
  function onSubmit(data) {
    const { area, garages, ...variables } = data
    performBuild({
      variables
    });
  }

  const propertiesTypesOptions = [
    { value: 'Casa Nueva', label: 'Casa Nueva' },
    { value: 'Casa Usada', label: 'Casa Usada' },
    { value: 'Casa Lote', label: 'Casa Lote' },
    { value: 'Casa Campestre', label: 'Casa Campestre' },
    { value: 'Apartamento Nuevo', label: 'Apartamento Nuevo' },
    { value: 'Apartamento Usado', label: 'Apartamento Usado' },
    { value: 'Apartaestudio Nuevo', label: 'Apartaestudio Nuevo' },
    { value: 'Apartaestudio Usado', label: 'Apartaestudio Usado' },
    { value: 'Oficina', label: 'Oficina' },
    { value: 'Consultorio', label: 'Consultorio' },
    { value: 'Local', label: 'Local' },
    { value: 'Bodega', label: 'Bodega' },
    { value: 'Lote', label: 'Lote' },
    { value: 'Finca', label: 'Finca' },
    { value: 'Caba??a', label: 'Caba??a' },
    { value: 'Habitaci??n', label: 'Habitaci??n' },
    { value: 'Parqueadero', label: 'Parqueadero' },
    { value: 'Edificio', label: 'Edificio' },
  ]
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
                    fullWidth
                  />
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Descripci??n de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    className="mt-16 w-full"
                    label="Descripci??n de propiedad"
                    placeholder="Descripci??n de propiedad"
                    variant="outlined"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors?.description?.message}
                  />
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Tipo de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.propertyType}>
                    <InputLabel id="propertytype-label">Tipo de propiedad</InputLabel>
                    <Select
                      {...field}
                      labelId="propertytype-label"
                      label="Tipo de propiedad"
                      id="propertyType"
                      error={!!errors.propertyType}
                      fullWidth
                    >
                      {propertiesTypesOptions.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
                    </Select>
                    <FormHelperText>{errors?.propertyType?.message}</FormHelperText>
                  </FormControl>
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Direcci??n de propiedad*</Typography>
              </div>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-8 w-full"
                    label="Direcci??n de propiedad"
                    placeholder="Direcci??n de propiedad"
                    variant="outlined"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors?.address?.message}
                  />
                )}
              />
              <div className="mb-8">
                <Typography color="text.secondary">Estrato*</Typography>
              </div>
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl fullWidth className="md:max-w-320" error={!!errors.stratum}>
                  <InputLabel id="stratum-label">Estrato</InputLabel>
                  <Controller
                    control={control}
                    name="stratum"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Estrato"
                        labelId="stratum-label"
                        id="stratum"
                        fullWidth
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.stratum?.message}</FormHelperText>
                </FormControl>
              </div>
              <div className=" flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20 ">
                <FormControl fullWidth className="md:max-w-320" error={!!errors.numberRooms}>
                  <InputLabel id="number-rooms-label">N??mero de cuartos</InputLabel>
                  <Controller
                    control={control}
                    name="numberRooms"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="N??mero de cuartos"
                        labelId="number-rooms-label"
                        id="stratum"
                        fullWidth
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.numberRooms?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth className="md:max-w-320" error={!!errors.numberBathrooms}>
                  <InputLabel id="number-bathrooms-label">N??mero de ba??os</InputLabel>
                  <Controller
                    control={control}
                    name="numberBathrooms"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="N??mero de ba??os"
                        labelId="number-bathrooms-label"
                        id="stratum"
                        fullWidth
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.numberBathrooms?.message}</FormHelperText>
                </FormControl>
              </div>
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl className="sm:w-full md:max-w-320">
                  <Controller
                    control={control}
                    name="area"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="??rea en mts2"
                        placeholder="??rea en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.area}
                        helperText={errors?.area?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl className="sm:w-full md:max-w-320">
                  <Controller
                    control={control}
                    name="lotArea"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Lote en mts2"
                        placeholder="Lote en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.lotArea}
                        helperText={errors?.lotArea?.message}
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl fullWidth className="md:max-w-320" error={!!errors.parkingLot}>
                  <InputLabel id="number-parkingLot-label">Parqueaderos*</InputLabel>
                  <Controller
                    control={control}
                    name="parkingLot"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Parqueaderos"
                        labelId="number-parkingLot-label"
                        id="stratum"
                        fullWidth
                        variant="outlined"
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.parkingLot?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth className="md:max-w-320" error={!!errors.garages}>
                  <InputLabel id="number-Garages-label">Garages*</InputLabel>
                  <Controller
                    control={control}
                    name="garages"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Garages"
                        labelId="number-Garages-label"
                        id="stratum"
                        variant="outlined"
                        fullWidth
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.garages?.message}</FormHelperText>
                </FormControl>
              </div>
            </div>
            <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20   mt-32">
              <Button className="text-blue-900 " variant="outlined">
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

export default BasicInformation;
