import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import FuseUtils from '@fuse/utils';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
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

const defaultValues = {
  imgDescription: '',
  imgName: ''
};

const schema = yup.object().shape({
  imgName: yup.string().required('Dato Requerido'),
  imgDescription: yup.string().required('Dato Requerido')
});

function Step2PropertyImages({ property, onSubmit }) {
  
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
    <Root>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        <form onSubmit={handleSubmit(submitHandler)} className="px-0 sm:px-24">
          <div className="mb-24">
            <Typography color="text.secondary">Nombre de imágen</Typography>
          </div>
          <div className="space-y-20">
            <Controller
              control={control}
              name="imgName"
              render={({ field }) => (
                <TextField
                  className="w-full"
                  {...field}
                  label="Ingrese nombre asociado a la propiedad"
                  placeholder="Ingrese nombre asociado a la propiedad"
                  error={!!errors.imgName}
                  helperText={errors?.imgName?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <div className="mb-24">
              <Typography color="text.secondary">Descripción de imagen*</Typography>
            </div>

            <Controller
              control={control}
              name="imgDescription"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-16 w-full"
                  label="Descripción de imagen"
                  placeholder="Descripción de imagen"
                  variant="outlined"
                  fullWidth
                  error={!!errors.imgDescription}
                  helperText={errors?.imgDescription?.message}
                />
              )}
            />
          </div>
          
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
                  // sx={{
                  //   backgroundColor: (theme) =>
                  //     theme.palette.mode === 'light'
                  //       ? lighten(theme.palette.background.default, 0.4)
                  //       : lighten(theme.palette.background.default, 0.02),
                  // }}
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
          
          {/* <div className="mb-32  mt-12 md:mt-32 text-4xl sm:text-xl font-extrabold tracking-tight leading-tight text-center">
            Imágenes de propiedad
          </div> */}
          {/* <div className="flex justify-center sm:justify-center flex-wrap -mx-16">
            <Controller
              name="featuredImageId"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) =>
                images.map((media, i) => (
                  <div
                    key={i}
                    onClick={() => onChange(media.id)}
                    onKeyDown={() => onChange(media.id)}
                    role="button"
                    tabIndex={0}
                    className={clsx(
                      'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                      media.id === value && 'featured'
                    )}
                  >
                    <FuseSvgIcon className="productImageFeaturedStar">
                      heroicons-solid:star
                    </FuseSvgIcon>
                    <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
                  </div>
                ))
              }
            />
          </div> */}
          <div className="flex items-center justify-between mt-32 p-24">
            <Button
              className="text-blue-900"
              component={Link}
              to="/properties"
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              className="mx-8"
              variant="contained"
              color="secondary"
              type="submit"
            >
              Guardar
            </Button>
          </div>
        </form>
      </Paper>
    </Root>
  );
}

export default Step2PropertyImages;
