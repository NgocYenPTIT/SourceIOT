import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Person2Icon from '@mui/icons-material/Person2';
import { FaHistory } from "react-icons/fa";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import HistoryIcon from '@mui/icons-material/History';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { useDispatch } from 'react-redux';
const handle = (i) => {
    // const dispatch = useDispatch();
    // dispatch(IsActiveActions.changePage(i));

}
export const mainListItems = (
    <React.Fragment>
        <ListItemButton onClick={() => handle(1)}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => handle(2)}>
            <ListItemIcon>
                <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Lịch sử dữ liệu" />
        </ListItemButton>
        <ListItemButton onClick={() => handle(3)}>
            <ListItemIcon>
                <ManageHistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Lịch sử thiết bị" />
        </ListItemButton>
        <ListItemButton onClick={() => handle(4)}>
            <ListItemIcon>
                <Person2Icon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemButton>
    </React.Fragment>
);
