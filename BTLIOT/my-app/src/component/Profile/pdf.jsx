import { useState, useEffect } from "react";
import { Paper } from "@mui/material";

export const Pdf = () => {
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
        <div className="profile">
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#02b2af',

                }}
            >
                <img src={profileData?.avatar_url} alt="avatar" width='200px' height='100px' />
            </Paper>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#02b2af',

                }}
            >
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Họ và tên</span>
                <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Lương Ngọc Yên</span>
            </Paper>
        </div>
    );
};
