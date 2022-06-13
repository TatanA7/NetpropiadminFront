import { orange } from '@mui/material/colors';
import { lighten, styled } from '@mui/material/styles';
import clsx from 'clsx';
import _ from '@lodash';

import FuseUtils from '@fuse/utils';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import { Button, Paper, TextField, Typography } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));
const images = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
];
const defaultValues = { name: '', email: '', subject: '', message: '' };
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  subject: yup.string().required('You must enter a subject'),
  message: yup.string().required('You must enter a message'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});
function ProductImagesTab(props) {
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
    <Root>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="px-0 sm:px-24">
          <div className="mb-24">
            <Typography color="text.secondary">Nombre de imágen</Typography>
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
              <Controller
                name="images"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Button
                    className="mx-8"
                    variant="contained"
                    color="secondary"
                    component="label"
                    htmlFor="button-file"
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? lighten(theme.palette.background.default, 0.4)
                          : lighten(theme.palette.background.default, 0.02),
                    }}
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
                    <span className="mx-8">Cargar</span>
                  </Button>
                )}
              />
            </div>
          </div>
        </form>
        {/* <div className="mb-32  mt-12 md:mt-32 md:text-6xl font-extrabold tracking-tight leading-7 sm:leading-10 text-center text-black">
          <Typography varian="h1">Imágenes de propiedad</Typography>
        </div> */}
        <div className="mb-32  mt-12 md:mt-32 text-4xl sm:text-xl font-extrabold tracking-tight leading-tight text-center">
          Imágenes de propiedad
        </div>
        <div className="flex justify-center sm:justify-center flex-wrap -mx-16">
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
        <div className="flex items-center justify-between mt-32 p-24">
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
    </Root>
  );
}

export default ProductImagesTab;
