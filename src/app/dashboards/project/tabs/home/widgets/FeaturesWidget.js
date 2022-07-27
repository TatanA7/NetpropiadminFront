import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectWidgets } from '../../../store/widgetsSlice';

function FeaturesWidget() {
  const widgets = useSelector(selectWidgets);
  const { data, title } = widgets?.features;

  return (
    <Paper className="flex flex-col w-full h-full shadow rounded-2xl overflow-hidden">
      <div className="text-center px-8 pt-16">
        <Typography className="px-16 text-lg font-medium tracking-tight leading-6 truncate text-red-100">
          {title}
        </Typography>
        {/* <IconButton aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton> */}
      </div>
      <div className="text-center mt-16 mb-24">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none  text-red-100">
          {data.count}
        </Typography>

        <Typography className="text-lg font-medium  text-red-100 mt-16">{data.name}</Typography>
      </div>
      {/* <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24"
        color="text.secondary"
      >
        <span className="truncate">{data.extra.name}</span>:
        <b className="px-8">{data.extra.count}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(FeaturesWidget);
