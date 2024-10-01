import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

export default function JoinChart() {
    const state = useSelector(state => state.IsActiveReduce);
    const [dataset, setDataSet] = React.useState([
        { date: 1, temperature: 28129, humid: 26189, light: 25391 },
        { date: 2, temperature: 28619.805, humid: 25790.186, light: 27385.055 },
        { date: 3, temperature: 28907.977, humid: 27277.543, light: 28140.057 },
        { date: 4, temperature: 29736.645, humid: 28472.248, light: 29349.982 },
        { date: 5, temperature: 31323.078, humid: 30077.385, light: 31129.584 },
        { date: 6, temperature: 33409.68, humid: 31946.037, light: 33367.285 },
        { date: 7, temperature: 34152.773, humid: 33271.3, light: 34590.93 },
        { date: 8, temperature: 35093.824, humid: 34865.78, light: 35528.715 },
        { date: 9, temperature: 36166.16, humid: 36214.07, light: 38014.137 },
        { date: 10, temperature: 36761.793, humid: 36264.79, light: 40715.434 },
        { date: 11, temperature: 36086.727, humid: 34754.473, light: 41109.582 },
        { date: 12, temperature: 36571, humid: 35185, light: 43320 },
    ]);
    React.useEffect(() => {
        const f = async () => {
            const ans = [];
            for (let i = 0; i < 12; i++) {
                ans.push({ date: i + 1, temperature: state?.dataChart?.temperature[i], humid: state?.dataChart?.humid[i], light: state?.dataChart?.light[i] });
            }
            setDataSet(ans);
        }
        f();
    }, [state.dataChart]);
    return (
        <LineChart
            dataset={dataset}
            xAxis={[
                {
                    dataKey: 'date',
                    label: "Biểu đồ tổng quan ",
                    labelStyle: { fontSize: 17, fontWeight: "bold" }, // Thay đổi cỡ chữ tại đây
                    valueFormatter: (value) => {
                        if (value === 1) return '-22s';
                        if (value === 2) return '-20s';
                        if (value === 3) return '-18s';
                        if (value === 4) return '-16s';
                        if (value === 5) return '-14s';
                        if (value === 6) return '-12s';
                        if (value === 7) return '-10s';
                        if (value === 8) return '-8s'
                        if (value === 9) return '-6s';
                        if (value === 10) return '-4s';
                        if (value === 11) return '-2s';
                        if (value === 12) return 'Current';
                    }
                },
            ]}
            series={[
                {
                    label: 'Nhiệt độ',
                    dataKey: 'temperature',
                    stack: 'total',
                    area: true,
                    showMark: true,
                    color: '#ffbec5',
                    curve: 'linear'
                },

                {
                    label: 'Độ ẩm',
                    dataKey: 'humid',
                    stack: 'total',
                    area: true,
                    showMark: true,
                    color: '#b6e8ff',
                    curve: 'linear'
                },
                {
                    label: 'Ánh sáng',
                    dataKey: 'light',
                    stack: 'total',
                    area: true,
                    showMark: true,
                    color: '#e9d870',
                    curve: 'linear'
                },
            ]}
        />
    );
}