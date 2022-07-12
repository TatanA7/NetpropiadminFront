import { useState } from 'react';
import { selectUser } from 'app/store/userSlice';
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Badge, IconButton, ListItemIcon, ListItemText, MenuItem, Popover } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import reducer from './store';
import { selectNotifications } from './store/dataSlice';

function NotificationPanelToggleButton(props) {
  const notifications = useSelector(selectNotifications);
  const user = useSelector(selectUser);
  const [userMenu, setUserMenu] = useState(null);
  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };
  const userMenuClose = () => {
    setUserMenu(null);
  };

  // const dispatch = useDispatch();

  return (
    <>
      <IconButton className="w-40 h-40" onClick={userMenuClick} size="large">
        <Badge color="secondary" variant="dot" invisible={notifications.length === 0}>
          {props.children}
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText className="text-red-100" primary="Últimas notificaciones" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Nueva Propiedad disponible" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText className="text-red-100" primary="Contrato a vencer" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Contrato aprobado" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Reparación para realizar" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText className="text-red-100" primary="Pago a distribuidor" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );

  // return (
  //   <IconButton
  //     className="w-40 h-40"
  //     onClick={(ev) => dispatch(toggleNotificationPanel())}
  //     size="large"
  //   >
  //     <Badge color="secondary" variant="dot" invisible={notifications.length === 0}>
  //       {props.children}
  //     </Badge>
  //   </IconButton>
  // );
}

NotificationPanelToggleButton.defaultProps = {
  children: <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon>,
};

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
