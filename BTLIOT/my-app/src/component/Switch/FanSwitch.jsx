import * as React from 'react';
import './spin.css';
import Switch from '@mui/material/Switch';
import { LuFan } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";

import fetchPost from '../Fetch/fetchPost';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
export default function FanSwitch() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();

    const handleChange = async (event) => {
        try {
            setTimeout(() => dispatch(IsActiveActions.changeLoading2(true)), 0);
            setTimeout(() => dispatch(IsActiveActions.changeLoading2(false)), 1000);
            setTimeout(() => dispatch(IsActiveActions.changeStatusFan(!state.statusFan)), 1000);
            if (!state.statusFan) await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'fan', status: 'on' });
            else await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'fan', status: 'off' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{
            border: '1px solid white', gap: '10px', width: '195px', height: '100px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center',
            backgroundColor: `${state.statusFan ? '#5ea55e' : 'rgb(234 59 59)'}`

        }} onClick={handleChange}>
            <div style={{ paddingRight: '60px' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', position: 'relative', left: '25px' }}>Quạt</span>
            </div>
            {
                state.statusFan
                    ?
                    <LuFan className='spin-on' size={40} style={{ color: 'white' }} />
                    :
                    <LuFan className='spin-off' size={35} style={{ color: 'white' }} />
            }
        </div>
    );
}
