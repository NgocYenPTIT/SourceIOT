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
import { calculateTimeDifference, convertTimeFormat, SerializerDBSensor } from '../../utils';
import { Typography } from 'antd';
import { FaSort } from "react-icons/fa";


export default function DenseTable() {
    const state = useSelector(state => state.IsActiveReduce);
    const dispatch = useDispatch();
    const [sort1, setSort1] = React.useState(false);
    const [sort2, setSort2] = React.useState(false);
    const [sort3, setSort3] = React.useState(false);
    const [sort4, setSort4] = React.useState(false);
    // const [sort5, setSort5] = React.useState(false);
    React.useEffect(() => {
        (
            async () => {
                let params = '';
                params += `currentPage=${state.currentPageHistory}`;
                params += `&pageSize=${state.pageSizeHistory}`;
                //
                if (state.tempFilterLatest !== '') params += `&temperature=${state.tempFilterLatest.trim()}`;
                if (state.humidFilterLatest !== '') params += `&humid=${state.humidFilterLatest.trim()}`;
                if (state.lightFilterLatest !== '') params += `&light=${state.lightFilterLatest.trim()}`;
                if (state.timeFilterLatest !== '') params += `&time=${state.timeFilterLatest.trim()}`;
                const data = await fetchGet(`http://localhost:8888/mqtt/history-sensors?${params}`);
                dispatch(IsActiveActions.changeDataHistory(SerializerDBSensor(data, state.currentPageHistory, state.pageSizeHistory)));
                dispatch(IsActiveActions.changeTotalHistory(data.total));
            }
        )();
    }, [state.pageSizeHistory, state.currentPageHistory, state.flagReloadPage1]);
    
    const sortt = (index) => {
        if (index === 1) {
            if (!sort1) dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => a.ID - b.ID)));
            else dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => b.ID - a.ID)));
            setSort1(!sort1);
        }
        if (index === 2) {
            if (!sort2) dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => a.Temp - b.Temp)));
            else dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => b.Temp - a.Temp)));
            setSort2(!sort2);
        }
        if (index === 3) {
            if (!sort3) dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => a.Humid - b.Humid)));
            else dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => b.Humid - a.Humid)));
            setSort3(!sort3);
        }
        if (index === 4) {
            if (!sort4) dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => a.Light - b.Light)));
            else dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => b.Light - a.Light)));
            setSort4(!sort4);
        }
        // if (index === 5) {
        //     if (!sort5) dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => convertTimeFormat(a.Time) - convertTimeFormat(b.Time)).reverse()));
        //     else dispatch(IsActiveActions.changeDataHistory([...state.dataHistory].sort((a, b) => convertTimeFormat(a.Time) - convertTimeFormat(b.Time))));

        //     setSort5(!sort5);
        // }
    }

    if (state?.dataHistory.length === 0) return (
        <div style={{ paddingLeft: '400px' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: '20px' }} component="p" variant="h4">
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
                        <TableCell sx={{ color: 'inherit' }} align="center">ID {<FaSort onClick={() => sortt(1)} />}</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Nhiệt độ {<FaSort onClick={() => sortt(2)} />}</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Độ ẩm {<FaSort onClick={() => sortt(3)} />} </TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Ánh sáng {<FaSort onClick={() => sortt(4)} />}</TableCell>
                        <TableCell sx={{ color: 'inherit' }} align="center">Time </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state?.dataHistory?.map((row) => (
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
                            <TableCell align="center" sx={{ padding: '4px' }} >{row.Temp}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }} >{row.Humid}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }}>{row.Light}</TableCell>
                            <TableCell align="center" sx={{ padding: '4px' }}>{row.Time}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        </TableContainer >
    );
}
