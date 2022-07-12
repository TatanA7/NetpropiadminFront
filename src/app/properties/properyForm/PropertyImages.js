import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import clsx from 'clsx';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Box, lighten } from '@mui/system';

const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

function PropertyImages(props) {
  const methods = useFormContext();
  const { watch1 } = methods;

  const { control, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const images = watch1('images');
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
        {/* <div className="sm:mt-32">
          <Button
            component={Link}
            to="/apps/help-center"
            color="secondary"
            startIcon={<FuseSvgIcon>heroicons-outline:arrow-narrow-left</FuseSvgIcon>}
          >
            Back to Help Center
          </Button>
        </div>
        <div className="mt-8 text-4xl sm:text-7xl font-extrabold tracking-tight leading-tight">
          Soy Properties
        </div> */}

        <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
            <div className="mb-24">
              <Typography color="text.secondary">Nombre de imágen</Typography>
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
              <div className="mb-24">
                <Typography color="text.secondary">Descripción de imagen*</Typography>
              </div>

              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mt-16 w-full"
                    label="Descripción de imagen
                    "
                    placeholder="Descripción de imagen
                    "
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    required
                  />
                )}
              />
              <div className="mb-12  mt-12 md:mt-96 md:text-6xl   sm:leading-10 text-center">
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  component={NavLinkAdapter}
                  to="new/edit"
                >
                  <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                  <span className="mx-8">Cargar</span>
                </Button>
              </div>
            </div>
          </form>
          <div className="mb-12  mt-12 md:mt-32 md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center text-black">
            <Typography varian="h1">Imágenes de propiedad</Typography>
          </div>
          <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
            <Controller
              name="images"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                  }}
                  component="label"
                  htmlFor="button-file"
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    onChange={async (e) => {
                      function readFileAsync() {
                        return new Promise((resolve, reject) => {
                          const file = e.target.files[0];
                          if (!file) {
                            return;
                          }
                          const reader = new FileReader();

                          reader.onload = () => {
                            resolve({
                              id: FuseUtils.generateGUID(),
                              url: `data:${file.type};base64,${btoa(reader.result)}`,
                              type: 'image',
                            });
                          };

                          reader.onerror = reject;

                          reader.readAsBinaryString(file);
                        });
                      }

                      const newImage = await readFileAsync();

                      onChange([newImage, ...value]);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                </Box>
              )}
            />
            <Controller
              name="featuredImageId"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) =>
                images.map((media) => (
                  <div
                    onClick={() => onChange(media.id)}
                    onKeyDown={() => onChange(media.id)}
                    role="button"
                    tabIndex={0}
                    className={clsx(
                      'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                      media.id === value && 'featured'
                    )}
                    key={media.id}
                  >
                    <FuseSvgIcon className="productImageFeaturedStar">
                      heroicons-solid:star
                    </FuseSvgIcon>
                    <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
                  </div>
                ))
              }
            />
          </div>
          <div className="flex items-center justify-between mt-32">
            <Button color="secondary" className="mx-8">
              Cancelar
            </Button>
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

export default PropertyImages;
