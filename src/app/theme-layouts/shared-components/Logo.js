import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <Link to="/dashboards">
        <img
          className="logo-icon    w-112   h-112"
          src="assets/images/logo/netpropi-sidebar.svg"
          alt="logo"
        />
      </Link>
    </Root>
  );
}

export default Logo;
