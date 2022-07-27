import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectWidgets } from '../../../store/widgetsSlice';

function SummaryWidget() {
  const widgets = useSelector(selectWidgets);
  const { data, title } = widgets?.summary;

  // const { data, ranges, currentRange: currentRangeDefault } = widgets?.summary;

  // const [currentRange, setCurrentRange] = useState(currentRangeDefault);

  // function handleChangeRange(ev) {
  //   setCurrentRange(ev.target.value);
  // }

  return (
    <Paper className="flex flex-col w-full h-full shadow rounded-2xl overflow-hidden   ">
      <div className="text-center px-8 pt-16">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          {title}
        </Typography>
        {/* <IconButton aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton> */}
      </div>
      {/* <div className="flex items-center justify-between px-8 pt-12">
        <Select
          className="mx-16"
          classes={{ select: 'py-0 flex items-center' }}
          value={currentRange}
          onChange={handleChangeRange}
          inputProps={{
            name: 'currentRange',
          }}
          variant="filled"
          size="small"
        >
          {Object.entries(ranges).map(([key, n]) => {
            return (
              <MenuItem key={key} value={key}>
                {n}
              </MenuItem>
            );
          })}
        </Select>
        <IconButton aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton>
      </div> */}
      <div className="text-center mt-16 mb-24">
        <Typography
          color="text.secondary"
          className="text-7xl sm:text-8xl font-bold tracking-tight leading-none mx-16"
        >
          {data.count}
        </Typography>
        <Typography color="text.secondary" className="text-lg font-medium  mt-16">
          {data.name}
        </Typography>
      </div>
      {/* <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24"
        color="text.secondary"
      >
        <span className="truncate">{data.extra.name}</span>:
        <b className="px-8">{data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(SummaryWidget);
