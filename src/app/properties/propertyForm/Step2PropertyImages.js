import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { red } from 'tailwindcss/colors';
import { Button, Paper } from '@mui/material';
import { uploadFiles } from '../../api';

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: red[400],
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

const defaultValues = {
  imgsUrl: []
};

const schema = yup.object().shape({
  imgsUrl: yup.array().of(yup.string()).min(1, 'Al menos una imagen').required('Dato Requerido'),
});

function Step2PropertyImages({ property, onSubmit }) {
  const { control, handleSubmit, formState, reset, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const images = watch('imgsUrl');

  useEffect(() => {
    if (!property) return;

    reset({
      imgsUrl: property.imgs?.map(img => img.url) || [],
    });
  }, [property]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.error(errors);
    }
  }, [errors]);

  const submitHandler = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };
  const cleanImageHandler = (i) => {
    setValue(
      'imgsUrl',
      images.filter((_, index) => index !== i)
    );
  }

  return (
    <Root>
      <Paper className="mt-32 sm:mt-48 p-24 pb-28 sm:p-40 sm:pb-28 rounded-2xl">
        <form onSubmit={handleSubmit(submitHandler)} className="px-0 sm:px-24">
          <div className="mb-12  mt-12 md:mt-96 md:text-6xl   sm:leading-10 text-center">
            <Controller
              name="imgsUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Button
                  className="mx-8"
                  variant="contained"
                  color="secondary"
                  component="label"
                  htmlFor="button-file"
                >
                  <input
                    accept="image/*"
                    className="hidden"
                    id="button-file"
                    type="file"
                    multiple
                    onChange={async (e) => {

                      const newImageUrls = await uploadFiles(Array.from(e.target.files))

                      onChange([...newImageUrls, ...images]);
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

          <div className="mb-32  mt-12 md:mt-32 text-4xl sm:text-xl font-extrabold tracking-tight leading-tight text-center">
            Imágenes de propiedad
          </div>
          {errors?.imgsUrl?.message && <span className="text-red-500">{errors?.imgs?.message}</span>}
          <div className="flex justify-center sm:justify-center flex-wrap -mx-16">
            {images?.map((urlImage, i) => (
              <div
                key={i}
                onKeyDown={() => {
                  cleanImageHandler(i)
                }}
                onClick={() => {
                  cleanImageHandler(i)
                }}
                role="button"
                tabIndex={0}
                className={clsx(
                  'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
                )}
              >
                <FuseSvgIcon className="productImageFeaturedStar">
                  heroicons-solid:trash
                </FuseSvgIcon>
                <img className="max-w-none w-auto h-full" src={urlImage} alt="product" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-32 p-24">
            <Button className="text-blue-900" component={Link} to="/properties" variant="outlined">
              Cancelar
            </Button>
            <Button className="mx-8" variant="contained" color="secondary" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </Paper>
    </Root>
  );
}

export default Step2PropertyImages;
