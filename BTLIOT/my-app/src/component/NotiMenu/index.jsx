import * as React from 'react';
import styles from './NotiMenu.module.css';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LightModeIcon from '@mui/icons-material/LightMode';
import ThermostatIcon from '@mui/icons-material/Thermostat';
export default function NotiMenu() {
  const paperRef = React.useRef(null);
  const handleScroll = () => {
    const scrollContainer = paperRef.current;
    if (scrollContainer) {
      // Kiểm tra nếu đã cuộn gần đến cuối
      if (
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + 50 // Margin 50px để gọi API sớm hơn
      ) {
        // Gọi API hoặc thực hiện hành động nào đó
        // console.log('Scrolled near the bottom, calling API...');
        // Thay console.log bằng hàm gọi API của bạn
      }
    }
  };

  return (
    <div className={styles['main']} >
      <Paper
        ref={paperRef}
        onScroll={handleScroll}
        sx={{ width: 320, maxWidth: '100%', height: 300, overflow: 'auto' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon><StickyNote2Icon fontSize="small" /></ListItemIcon>
            <ListItemText>Thông báo</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <InvertColorsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>10:00 :  độ ẩm cao 90% </ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘C
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <LightModeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>11:00 :  ánh sáng chói</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />
          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />
          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />
          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>

          <Divider />
          <MenuItem>
            <ListItemIcon>
              <ThermostatIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>12:00 : nhiệt độ cao</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ⌘V
            </Typography>
          </MenuItem>
        </MenuList>
      </Paper>
    </div>
  );
}
