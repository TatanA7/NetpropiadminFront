import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormControl, InputLabel, Menu, MenuItem, Select, FormHelperText, Autocomplete } from '@mui/material';
import { propertiesTypesOptions, propertyStatusOptions, cities, departments } from '../../mock'

const schema = yup.object().shape({
  address: yup.string().required('Dato requerido'),
  description: yup.string().required('Dato requerido'),
  lotArea: yup.string().required('Dato requerido'),
  lotMeters: yup.string(),
  name: yup.string().required('Dato requerido'),
  numberBathrooms: yup.string().required('Dato requerido'),
  numberRooms: yup.string().required('Dato requerido'),
  parkingLot: yup.string().required('Dato requerido'),
  propertyType: yup.string().required('Dato requerido'),
  stratum: yup.string().required('Dato requerido'),
  propertyStatus: yup.string().required('Dato requerido'),
  city: yup.string().required('Dato requerido'),
  department: yup.string().required('Dato requerido')
});

const defaultValues = {
  name: '',
  description: '',
  address: '',
  lotArea: '',
  lotMeters: '',
  numberBathrooms: '',
  numberRooms: '',
  parkingLot: '',
  propertyType: '',
  stratum: '',
  propertyStatus: '',
  city: '',
  department: ''
};

function BasicInformation({ property, onSubmit }) {
  
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

  // eslint-disable-next-line camelcase
  function handlerSubmit(data) {
    const {
      propertyStatus,
      city,
      department,
      ...restData } = data
    if (onSubmit) onSubmit(restData)
  }

  return (
    <div className="flex flex-col items-center p-24 sm:p-20 container">
      <div className="flex flex-col w-full max-w-4xl">
        <Paper className="mt-12 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(handlerSubmit)} className="px-0 sm:px-24">
            <div className="space-y-20">
              <Controller
                control={control}
                name="propertyStatus"
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.propertyStatus}>
                    <InputLabel id="propertytype-label">Disponibilidad</InputLabel>
                    <Select
                      {...field}
                      labelId="property-status-label"
                      label="Disponibilidad"
                      id="property-status"
                      error={!!errors.propertyStatus}
                      fullWidth
                    >
                      {propertyStatusOptions.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
                    </Select>
                    <FormHelperText>{errors?.propertyStatus?.message}</FormHelperText>
                  </FormControl>
                )}
              />
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
              {/* this line is for the label input */}
              {/* <div className="mb-8">
                <Typography color="text.secondary">Descripci??n de propiedad*</Typography>
              </div> */}
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
              <div className="flex gap-x-16 justify-between">
                <Controller
                  control={control}
                  name="department"
                  render={({ field: { onChange, value} }) => (
                    <FormControl fullWidth error={!!errors.department}>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue)
                        }}
                        disablePortal
                        id="autocomplete-city"
                        options={departments}
                        renderInput={(params) => <TextField {...params} label="Departamento" />}
                      />
                      <FormHelperText>{errors?.department?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="city"
                  render={({ field: { onChange, value } }) => (
                    <FormControl fullWidth error={!!errors.city}>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue)
                        }}
                        disablePortal
                        id="autocomplete-city"
                        options={cities}
                        renderInput={(params) => <TextField {...params} label="Ciudad" />}
                      />
                      <FormHelperText>{errors?.city?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
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
              {/* <div className="mb-8">
                <Typography color="text.secondary">Estrato*</Typography>
              </div> */}
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
                <FormControl fullWidth className="md:max-w-96 " error={!!errors.stratum}>
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
                <FormControl fullWidth className="md:max-w-96" error={!!errors.numberRooms}>
                  <InputLabel id="number-rooms-label">Cuartos</InputLabel>
                  <Controller
                    control={control}
                    name="numberRooms"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="N??mero de cuartos"
                        labelId="number-rooms-label"
                        id="numberRooms"
                        fullWidth
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.numberRooms?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth className="md:max-w-96" error={!!errors.numberBathrooms}>
                  <InputLabel id="number-bathrooms-label">Ba??os</InputLabel>
                  <Controller
                    control={control}
                    name="numberBathrooms"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="N??mero de ba??os"
                        labelId="number-bathrooms-label"
                        id="numberBathrooms"
                        fullWidth
                        variant="outlined"
                      >
                        {[1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.numberBathrooms?.message}</FormHelperText>
                </FormControl>
                <FormControl fullWidth className="sm:w-full md:max-w-96">
                  <Controller
                    control={control}
                    name="lotArea"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="??rea mts2"
                        placeholder="??rea en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.lotArea}
                        helperText={errors?.lotArea?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth className="sm:w-full md:max-w-96">
                  <Controller
                    control={control}
                    name="lotMeters"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Lote mts2"
                        placeholder="Lote en mts2"
                        variant="outlined"
                        fullWidth
                        error={!!errors.lotMeters}
                        helperText={errors?.lotMeters?.message}
                      />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth className="md:max-w-96" error={!!errors.parkingLot}>
                  <InputLabel id="number-parkingLot-label">Parqueaderos</InputLabel>
                  <Controller
                    control={control}
                    name="parkingLot"
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="N??mero de parqueaderos"
                        labelId="number-parkingLot-label"
                        id="parkingLot"
                        fullWidth
                        variant="outlined"
                      >
                        {[0,1, 2, 3, 4, 5, 6].map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors?.parkingLot?.message}</FormHelperText>
                </FormControl>

              </div>
              {/* <div className=" flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20 ">
               
              </div>
              <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20">
              
              </div> */}  
            </div>
            <div className="flex md:flex-row md:space-y-0 items-center justify-between sm:flex flex-col space-y-20   mt-32">
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

export default BasicInformation;
