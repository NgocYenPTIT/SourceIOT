import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { isNumber, validateDate } from '../../utils';
import { notification } from 'antd';

export default function Filter() {
    const state = useSelector(state => state.IsActiveReduce);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const openNotification = (message) => {
        api.error({
            message: 'Có lỗi xảy ra',
            description: message,
        });
    };
    const handleChange1 = (event) => {
        dispatch(IsActiveActions.changeTempFilter(event.target.value));  // Cập nhật state khi người dùng nhập giá trị
    };
    const handleChange2 = (event) => {
        dispatch(IsActiveActions.changeHumidFilter(event.target.value));  // Cập nhật state khi người dùng nhập giá trị
    };
    const handleChange3 = (event) => {
        dispatch(IsActiveActions.changeLightFilter(event.target.value));  // Cập nhật state khi người dùng nhập giá trị
    };
    const handleChange4 = (event) => {
        dispatch(IsActiveActions.changeTimeFilter(event.target.value));  // Cập nhật state khi người dùng nhập giá trị
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleExecute(); // Gọi hàm tìm kiếm
        }
    };
    const handleExecute = async () => {
        // validate
        let typeError = false;
        if (state.tempFilter.trim() !== '' && !isNumber(state.tempFilter.trim())) typeError = 'temp';
        if (state.humidFilter.trim() !== '' && !isNumber(state.humidFilter.trim())) typeError = 'humid';
        if (state.lightFilter.trim() !== '' && !isNumber(state.lightFilter.trim())) typeError = 'light';
        if (state.timeFilter.trim() !== '' && !validateDate(state.timeFilter.trim())) typeError = 'time';
        //Ant
        if (typeError) {
            let errorMessage = '';
            switch (typeError) {
                case 'temp':
                    errorMessage = 'Nhiệt độ phải là số!';
                    break;
                case 'humid':
                    errorMessage = 'Độ ẩm phải là số!';
                    break;
                case 'light':
                    errorMessage = 'Ánh sáng phải là số!';
                    break;
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
        dispatch(IsActiveActions.changeTempFilterLatest(state.tempFilter.trim()));
        dispatch(IsActiveActions.changeHumidFilterLatest(state.humidFilter.trim()));
        dispatch(IsActiveActions.changeLightFilterLatest(state.lightFilter.trim()));
        dispatch(IsActiveActions.changeTimeFilterLatest(state.timeFilter.trim()));

        dispatch(IsActiveActions.changeCurrentPageHistory(1));
        dispatch(IsActiveActions.changeFlagReloadPage1(!state.flagReloadPage1));

    }
    return <div onKeyDown={handleKeyDown}>
        {contextHolder} {/* Đảm bảo contextHolder có mặt để hiển thị thông báo */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}  >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Nhiệt độ</label>
                <TextField onChange={handleChange1} value={state.tempFilter} placeholder='Chọn nhiệt độ' size='small' sx={{ width: '200px' }} />
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Độ ẩm</label>
                <TextField onChange={handleChange2} value={state.humidFilter} placeholder='Chọn độ ẩm' size='small' sx={{ width: '200px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Ánh sáng</label>
                <TextField onChange={handleChange3} value={state.lightFilter} placeholder='Chọn mức sáng' size='small' sx={{ width: '200px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 'bold', paddingLeft: '5px' }}>Nhập thời gian</label>
                <TextField onChange={handleChange4} value={state.timeFilter} placeholder='ví dụ : 23/12/2003' size='small' sx={{ width: '230px' }} />
            </div>
        </div>


        <Button onClick={handleExecute} variant="contained" sx={{ marginTop: '30px' }}>Tìm kiếm</Button>
    </div >
}