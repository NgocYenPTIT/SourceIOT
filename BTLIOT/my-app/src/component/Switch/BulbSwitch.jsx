import * as React from 'react';
import Switch from '@mui/material/Switch';
import TipsAndUpdatesSharpIcon from '@mui/icons-material/TipsAndUpdatesSharp';
import fetchPost from '../Fetch/fetchPost';
import { useSelector, useDispatch } from "react-redux";
import LightModeIcon from '@mui/icons-material/LightMode';

import { IsActiveActions } from '../../Reducers/IsActiveReducer';
export default function BulbSwitch() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    const handleChange = async (event) => {
        try {
            setTimeout(() => dispatch(IsActiveActions.changeLoading1(true)), 0);
            setTimeout(() => dispatch(IsActiveActions.changeLoading1(false)), 1000);
            setTimeout(() => dispatch(IsActiveActions.changeStatusLight(!state.statusLight)), 1000);
            if (!state.statusLight) await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'light', status: 'on' });
            else await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'light', status: 'off' });
        } catch (error) {
            console.log(error);
        }
    };


    // #eac92f
    return (
        <div style={{
            border: '1px solid white', gap: '10px', width: '195px', height: '100px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center',
            backgroundColor: `${state.statusLight ? '#5ea55e' : 'rgb(234 59 59)'}`
        }} onClick={handleChange}>
            <div style={{ paddingRight: '65px', paddingBottom: '10px' }}>

                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', position: 'relative', left: '25px' }}>Đèn</span>
            </div>
            {state.statusLight ?
                <LightModeIcon style={{ transform: 'scale(1.9)', color: 'yellow', paddingBottom: '3px' }} />
                :
                <LightModeIcon style={{ transform: 'scale(1.5)', color: 'white', paddingBottom: '3px' }} />
            }
        </div>
    );
}
