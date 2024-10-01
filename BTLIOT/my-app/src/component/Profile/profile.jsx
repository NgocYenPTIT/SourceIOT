import { useState, useEffect } from "react";
import { Paper } from "@mui/material";

export const Profile = () => {
    const [profileData, setProfileData] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch("https://api.github.com/users/NGOCYENPTIT");
                let json = await response.json();

                let response2 = await fetch(
                    "https://api.github.com/users/NGOCYENPTIT/repos"
                );
                let json2 = await response2.json();

                setProfileData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Paper
            sx={{
                p: 2,
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',

                height: 500,
                gap: '20px',
                backgroundColor: '#327c7b',
                color: 'white'
            }}
        >
            <span style={{ fontWeight: 'bold', fontSize: '30px', alignContent: 'center', position: 'relative', left: '25vw' }}> Thông tin cơ bản</span>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', marginTop: '40px', fontWeight: '600', fontSize: '18px', paddingLeft: '50px' }}>
                <span style={{}}> < span  >Họ và tên</span>:    Lương Ngọc Yên</span>

                <span style={{}}> <span>Ngày sinh</span>: 15/01/2003</span>

                <span style={{}}> <span>Giới tính </span>: Nam</span>
                <span style={{}}> <span>Học vấn </span>: Học viện Công nghệ Bưu chính Viễn thông </span>

                <span style={{}}> <span>Lớp</span>: D21CQCN05-B</span>
                <span style={{}}> <span>Mã sinh viên </span>: B21DCCN809</span>
            </div>
        </Paper >
    );
};
