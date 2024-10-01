import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { MenuItem, Select } from '@mui/material';

export default function PaginationAction() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    const handleChange = (event, value) => {
        dispatch(IsActiveActions.changeCurrentPageAction(value));
    };
    const handlePageSizeChange = (event) => {
        dispatch(IsActiveActions.changeCurrentPageAction(1));
        dispatch(IsActiveActions.changePageSizeAction(event.target.value));
        dispatch(IsActiveActions.changeFlagReloadPage2(!state.flagReloadPage2));
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <label style={{ position: 'relative', right: '130px' }}>page size</label>
            <Select value={state.pageSizeAction} onChange={handlePageSizeChange} // Xử lý sự kiện khi thay đổi
                size='small' sx={{ width: '65px', height: '30px', position: 'relative', right: '130px' }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
            <Pagination sx={{ position: 'relative', right: '50px' }} count={Math.floor(state.totalAction / state.pageSizeAction) + 1} page={state.currentPageAction} onChange={handleChange} color="primary" />
        </div>
    );
}