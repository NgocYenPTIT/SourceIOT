import { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import { GiPositionMarker } from "react-icons/gi";

export const Github = () => {
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 850,
                gap: '30px',
                fontSize: '19px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#327c7b',

            }}
        >
            <a href="https://github.com/NgocYenPTIT/BTLIOT" target="_blank">
                <img src={profileData?.avatar_url} alt="avatar" width='300px' height='300px' style={{ borderRadius: '200px' }} />
            </a>
            <div >
                <span> Lương Ngọc Yên </span>
            </div>
            <span style={{ fontStyle: 'italic', fontSize: '18px' }}>B21DCCN809 - CNPM4 </span>
            <div>
                <SchoolIcon style={{ marginRight: '10px', transform: 'scale(1.3)' }} />
                <span> Posts and Telecomunications Institute of Technology HaNoi - PTIT</span>
            </div>
            {/* <div>
                <Button style={{ borderRadius: ' 12px' }} variant="contained" href="https://github.com/NgocYenPTIT/BTLIOT" target="_blank" >
                    Visit my Github repository FE
                </Button>
            </div> */}
            <div>
                <Button style={{ borderRadius: ' 12px' }} variant="contained" href="https://github.com/NgocYenPTIT/backendiot" target="_blank" >
                    Visit my Github
                </Button>
            </div>
            <div>
                <Button style={{ borderRadius: ' 12px' }} variant="contained" href="http://127.0.0.1:8888/swagger-api/" target="_blank" >
                    Visit my Swagger document
                </Button>
            </div>
            <div>
                <Button style={{ borderRadius: ' 12px' }} variant="contained" href="https://drive.google.com/file/d/1of8Ka8T0hqB1W2D-Xge6SkvzMDYP9Mym/view?usp=sharing" target="_blank" >
                    View my project document
                </Button>
            </div>

        </Paper>
    );
};
