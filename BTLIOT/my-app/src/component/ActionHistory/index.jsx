import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import fetchGet from '../Fetch/fetchGet';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import { convertTimeFormat, SerializerDBSensor2 } from '../../utils';
import { Typography } from 'antd';
import { FaSort } from 'react-icons/fa';

export default function DenseTable2() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    const [sort5, setSort5] = React.useState(false);
    React.useEffect(() => {
        (
            async () => {
                let params = '';
                params += `currentPage=${state.currentPageAction}`;
                params += `&pageSize=${state.pageSizeAction}`;
                //
                if (state.timeFilterLatest2 !== '') params += `&time=${state.timeFilterLatest2.trim()}`;
                const data = await fetchGet(`http://localhost:8888/mqtt/history-actions?${params}`);
                dispatch(IsActiveActions.changeDataAction(SerializerDBSensor2(data, state.currentPageAction, state.pageSizeAction)));
                dispatch(IsActiveActions.changeTotalAction(data.total));
            }
        )();
    }, [state.pageSizeAction, state.currentPageAction, state.flagReloadPage2]);

    const sortt = () => {
        if (!sort5) dispatch(IsActiveActions.changeDataAction([...state.dataAction].sort((a, b) => convertTimeFormat(a.Time) - convertTimeFormat(b.Time)).reverse()));
        else dispatch(IsActiveActions.changeDataAction([...state.dataAction].sort((a, b) => convertTimeFormat(a.Time) - convertTimeFormat(b.Time))));
    }
    if (state?.dataAction.length === 0) return (
        <div style={{ paddingLeft: '400px' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: '17px' }} component="p" variant="h4">
                Không tìm thấy dữ liệu
            </Typography>
        </div>
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',  // Màu nền cho hàng
                        // Màu chữ cho hàng
                    }} >
                        <TableCell sx={{ color: 'inherit' }} align='center'>STT</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">ID</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Thiết bị </TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Hành động</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Time </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state?.dataAction?.map((row) => (
                        <TableRow
                            key={row.STT}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 }, padding: '7px',
                            }}
                        >
                            <TableCell component="th" scope="row" align='center' sx={{ padding: '7px' }}>
                                {row.STT}
                            </TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }}>{row.ID}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }} >{row.Device}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }} >{row.Action}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }}>{row.Time}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}
