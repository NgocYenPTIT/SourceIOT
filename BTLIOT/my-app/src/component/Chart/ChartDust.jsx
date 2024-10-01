import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { useSelector } from "react-redux";

const conv = (arr) => arr.map((value, index) => (value % 30) + (value % 30) * 30 / 48);
export default function DustChart() {
    const state = useSelector(state => state.IsActiveReduce);
    const [xAxisData, setXAxisData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return (
        <LineChart
            xAxis={[
                {
                    label: "Biểu đồ độ bụi hiện tại",
                    labelStyle: { fontSize: 17, fontWeight: "bold" }, // Thay đổi cỡ chữ tại đây
                    data: xAxisData,
                    tickInterval: xAxisData.length,
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
            yAxis={[{ label: "Đơn vị %" }]}
            series={[
                { data: conv(state.dataChart.light), area: true, color: '#94312d', curve: 'linear' },
            ]}
        />
    );
}