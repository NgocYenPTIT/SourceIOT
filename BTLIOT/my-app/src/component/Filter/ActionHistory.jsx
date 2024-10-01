import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { validateDate } from '../../utils';
export default function Filter2() {
    const state = useSelector(state => state.IsActiveReduce);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const openNotification = (message) => {
        api.error({
            message: 'Có lỗi xảy ra',
            description: message,
        });
    };
    const handleChange = (event) => {
        dispatch(IsActiveActions.changeTimeFilter2(event.target.value));  // Cập nhật state khi người dùng nhập giá trị
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleExecute(); // Gọi hàm tìm kiếm
        }
    };
    const handleExecute = async () => {
        // validate
        let typeError = false;
        if (state.timeFilter2.trim() !== '' && !validateDate(state.timeFilter2.trim())) typeError = 'time';
        //Ant
        if (typeError) {
            let errorMessage = '';
            switch (typeError) {
                case 'time':
                    errorMessage = 'Thời gian không hợp lệ!';
                    break;
                default:
                    errorMessage = 'Có lỗi xảy ra!';
            }
            openNotification(errorMessage);
            return; // Dừng thực hiện nếu có lỗi
        }
        // Latest filter
        dispatch(IsActiveActions.changeTimeFilterLatest2(state.timeFilter2.trim()));

        dispatch(IsActiveActions.changeCurrentPageAction(1));
        dispatch(IsActiveActions.changeFlagReloadPage2(!state.flagReloadPage2));

    }

    return <div onKeyDown={handleKeyDown}>
        {contextHolder} {/* Đảm bảo contextHolder có mặt để hiển thị thông báo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Nhập thời gian</label>
            <TextField onChange={handleChange} value={state.timeFilter2} placeholder='ví dụ : 23/12/2003' size='small' sx={{ width: '200px' }} />
        </div>


        <Button onClick={handleExecute} variant="contained" sx={{ marginTop: '30px' }}>Tìm kiếm</Button>
    </div >
} 