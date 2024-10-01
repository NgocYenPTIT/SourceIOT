import * as React from 'react';
import './spin.css';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AcUnitSharpIcon from '@mui/icons-material/AcUnitSharp';
import fetchPost from '../Fetch/fetchPost';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import fetchGet from '../Fetch/fetchGet';
export default function AirConditionalSwitch() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();

    React.useEffect(() => {
        try {
            (
                async () => {
                    setInterval(async () => {
                        const three = await fetchGet('http://localhost:8888/mqtt/status-devices');
                        dispatch(IsActiveActions.changeStatusAC(three.ac));
                        dispatch(IsActiveActions.changeStatusFan(three.fan));
                        dispatch(IsActiveActions.changeStatusLight(three.light));
                    }, 700);
                }
            )();
        } catch (error) {
            console.log(error);
        }
    }, []);
    const handleChange = async (event) => {
        try {
            setTimeout(() => dispatch(IsActiveActions.changeLoading3(true)), 0);
            setTimeout(() => dispatch(IsActiveActions.changeLoading3(false)), 1000);
            setTimeout(() => dispatch(IsActiveActions.changeStatusAC(!state.statusAC)), 1000);
             if (!state.statusAC) await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'ac', status: 'on' });
            else await fetchPost('http://localhost:8888/mqtt/change-status-device', { device: 'ac', status: 'off' });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{
            border: '1px solid white', width: '195px', height: '100px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center', gap: '10px',
            backgroundColor: `${state.statusAC ? '#5ea55e' : 'rgb(234 59 59)'}`, zIndex: '1000'
        }} onClick={handleChange}
        >
            <div style={{ paddingRight: '25px' }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', position: 'relative', left: '10px' }}> Điều hòa</span>
            </div>
            {
                state.statusAC
                    ?
                    <AcUnitSharpIcon className='spin-on' fontSize='large' style={{ color: 'white', }} />
                    :
                    <AcUnitSharpIcon className='spin-off' style={{ color: 'white', transform: 'scale(1.4)' }} />
            }
        </div>
    );
}
