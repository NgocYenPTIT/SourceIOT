import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { MenuItem, Select } from '@mui/material';

export default function PaginationHistory() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    const handleChange = (event, value) => {
        dispatch(IsActiveActions.changeCurrentPageHistory(value));
    };
    const handlePageSizeChange = (event) => {
        dispatch(IsActiveActions.changeCurrentPageHistory(1));
        dispatch(IsActiveActions.changePageSizeHistory(event.target.value));
        dispatch(IsActiveActions.changeFlagReloadPage1(!state.flagReloadPage1));
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '55px' }}>
            <label style={{ position: 'relative', left: '160px' }}>page size</label>
            <Select onChange={handlePageSizeChange} value={state.pageSizeHistory} size='small' sx={{ width: '65px', height: '30px', position: 'relative', left: '130px' }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={25}>25</MenuItem>
            </Select>
            <Pagination sx={{ position: 'relative', left: '220px' }} count={Math.floor(state.totalHistory / state.pageSizeHistory) + 1} page={state.currentPageHistory} onChange={handleChange} color="primary" />
        </div >
    );
}