import * as React from 'react';
import './spin.css';
import './Home.css';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotiMenu from '../NotiMenu';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import FanSwitch from '../Switch/FanSwitch';
import OpacityIcon from '@mui/icons-material/Opacity';
import BulbSwitch from '../Switch/BulbSwitch';
import AirConditionalSwitch from '../Switch/AirConditionalSwitch';
import ControlTable from '../Switch/ControlTable';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Button, Link } from '@mui/material';
import TemperatureChart from '../Chart/ChartTemperature';
import LightChart from '../Chart/ChartLight';
import { useSelector, useDispatch } from "react-redux";
import HumidChart from '../Chart/ChartHumid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import HistoryIcon from '@mui/icons-material/History';
import { IsActiveActions } from '../../Reducers/IsActiveReducer';
import DenseTable from '../DataHistory';
import Filter from '../Filter';
import Filter2 from '../Filter/ActionHistory';
import DenseTable2 from '../ActionHistory';
import PaginationHistory from '../PaginationHistory';
import { Github } from '../Profile/github';
import { SiWeightsandbiases } from "react-icons/si";
import fetchGet from '../Fetch/fetchGet';
import { convertDataChart } from '../../utils';
import PaginationAction from '../PaginationAction';
import JoinChart from '../Chart/JoinChart';
import DustChart from '../Chart/ChartDust';
import { notification } from 'antd';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} height={120}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/NgocYen15012003">
        PTIT2024
      </Link>
    </Typography>
  );
}
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'tiwrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [timeState, setTimeState] = React.useState(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
  const [noti, setNoti] = React.useState(false);
  const [typeChart, setTypeChart] = React.useState(1);
  const [tempColor, setTempColor] = React.useState('success');
  const [lightColor, setLightColor] = React.useState('inherit');
  const [humidColor, setHumidColor] = React.useState('inherit');
  const [joinColor, setJoinColor] = React.useState('inherit');
  const [dustColor, setDustColor] = React.useState('inherit');
  const [currentTempValue, setCurrentTempValue] = React.useState(35);
  const [currentLightValue, setCurrentLightValue] = React.useState(100);
  const [currentHumidValue, setCurrentHumidValue] = React.useState(50);
  const [currentDustValue, setCurrentDustValue] = React.useState(50);
  const [currentTempBackground, setCurrentTempBackground] = React.useState('#e34f5c');
  const [currentLightBackground, setCurrentLightBackground] = React.useState('#cfb520');
  const [currentHumidBackground, setCurrentHumidBackground] = React.useState('#1b7fd9');
  const [currentDustBackground, setCurrentDustBackground] = React.useState('#94312d');
  const [api, contextHolder] = notification.useNotification();
  const [isAlert, setAlert] = React.useState(false);
  const state = useSelector(state => state.IsActiveReduce);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      setTimeState(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }));
      setTimeout(() => setTimeState(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })), 1000);

      const currentTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      const sentence = currentTime.toString();
      const words = sentence.split(":");
      const second = Number(words[2].slice(0, 2));
      if (second % 2 === 1) {
        const data = await fetchGet('http://localhost:8888/mqtt/top-latest-status');
        dispatch(IsActiveActions.changeDataChart(convertDataChart(data)));
      }
    };
    fetchData();
  }, [timeState]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const newTemp = state?.dataChart?.temperature?.[11];
      const newHumid = state?.dataChart?.humid?.[11];
      const newLight = state?.dataChart?.light?.[11];

      let newDust = (newLight % 30) + (newLight % 30) * 30 / 48;
      // if (!isAlert && newDust >= 10) openNotification();
      // Đổi màu background dựa trên giá trị nhiệt độ
      let coTemp = 'rgb(224 121 121)';
      if (newTemp >= 10) coTemp = ('rgb(224 121 121)');
      if (newTemp >= 30) coTemp = ('rgb(246 90 90)');
      if (newTemp >= 50) coTemp = ('rgb(217 47 47)');
      if (newTemp >= 70) coTemp = ('rgb(210 14 14)');
      if (newTemp >= 90) coTemp = ('rgb(255 0 0)');
      setCurrentTempBackground(coTemp);

      let coLight = '#2a2a1c';
      if (newLight >= 0) coLight = ('#484826');
      if (newLight >= 100) coLight = ('#7e7e48');
      if (newLight >= 200) coLight = ('rgb(224 225 68)');
      setCurrentLightBackground(coLight);

      let coDust = '#94312d';
      if (newDust >= 0) coDust = ('#94312d');
      if (newDust >= 15) coDust = ('brown');
      setCurrentDustBackground(coDust);

      let coHumid = '#b6e8ff';
      if (newHumid >= 10) coHumid = ('#58b9e6');
      if (newHumid >= 30) coHumid = ('#7db8d3');
      if (newHumid >= 50) coHumid = ('#588ba3');
      if (newHumid >= 70) coHumid = ('#39667b');
      if (newHumid >= 90) coHumid = ('#215770');
      setCurrentHumidBackground(coHumid);
      // Cập nhật giá trị mới
      setCurrentTempValue(newTemp);
      setCurrentHumidValue(newHumid);
      setCurrentLightValue(newLight);
      setCurrentDustValue(newDust);
    }, 1200); // Gọi lại sau mỗi 1200 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi component unmount
  }, [state.dataChart]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handlePage = (i) => {
    dispatch(IsActiveActions.changePage(i));
    dispatch(IsActiveActions.changeColorPage1('white'));
    dispatch(IsActiveActions.changeColorPage2('white'));
    dispatch(IsActiveActions.changeColorPage3('white'));
    dispatch(IsActiveActions.changeColorPage4('white'));
    if (i === 1) dispatch(IsActiveActions.changeColorPage1('#c4ccd5'));
    if (i === 2) dispatch(IsActiveActions.changeColorPage2('#c4ccd5'));
    if (i === 3) dispatch(IsActiveActions.changeColorPage3('#c4ccd5'));
    if (i === 4) dispatch(IsActiveActions.changeColorPage4('#c4ccd5'));

  }
  const changeTypeChart = (i) => {
    setTypeChart(i);
    setHumidColor('inherit');
    setTempColor('inherit');
    setLightColor('inherit');
    setDustColor('inherit');
    if (i === 1) setTempColor('success');
    if (i === 2) setLightColor('success');
    if (i === 3) setHumidColor('success');
    if (i === 4) setJoinColor('success');
    if (i === 5) setDustColor('success');
  }
  // const openNotification = () => {
  //   api.error({
  //     message: 'Cảnh báo',
  //     description: 'Độ bụi vượt mức cho phép',
  //     onClose: () => {
  //       console.log('Notification closed');
  //       setTimeout(() => setAlert(false), 1000);
  //     }
  //   });
  //   setAlert(true);
  // };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{
        display: 'flex',  // Thêm font chữ mềm mại hơn
      }}
      >
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
            </IconButton>
            {/* NotiHandle */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <img style={{ width: '260px', height: '64px', borderRadius: '5px' }} src="https://th.bing.com/th/id/OIP.lR976csHynDITy6AJf7jTgHaEK?w=309&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="aaa" />
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{ transform: 'scale(1.5)' }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
              <ListItemButton sx={{ backgroundColor: state.colorPage1 }} onClick={() => handlePage(1)}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton sx={{ backgroundColor: state.colorPage2 }} onClick={() => handlePage(2)}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Data Sensor" />
              </ListItemButton>
              <ListItemButton sx={{ backgroundColor: state.colorPage3 }} onClick={() => handlePage(3)}>
                <ListItemIcon>
                  <ManageHistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Action History" />
              </ListItemButton>
              <ListItemButton sx={{ backgroundColor: state.colorPage4 }} onClick={() => handlePage(4)}>
                <ListItemIcon>
                  <Person2Icon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {/* Main Container */}
          {
            state.page === 1 ? <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {contextHolder} {/* Đảm bảo contextHolder có mặt để hiển thị thông báo */}

              {/* Now Time */}

              <Grid container spacing={0} marginBottom={8} marginTop={8}>

                <Grid item xs={12} md={4} lg={2.5}>{/*2.5*/}
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
                    <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{timeState}</span>
                  </Paper>
                </Grid>
              </Grid>


              {/* Current status */}
              <Grid container spacing={7}>
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentTempBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}> Nhiệt độ</span>
                    <ThermostatAutoIcon style={{ color: 'white', transform: 'scale(1.8)' }} />
                    <span style={{ fontSize: '20px' }}>{currentTempValue?.toFixed(2)} °C</span>
                  </Paper>
                </Grid> */}

                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentTempBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}> Nhiệt độ</span>
                    <ThermostatAutoIcon style={{ color: 'white', transform: 'scale(1.8)' }} />
                    <span style={{ fontSize: '20px' }}>{currentTempValue?.toFixed(2)} °C</span>
                  </Paper>
                </Grid>

                {/* Current Light */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentLightBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>  Ánh sáng</span>
                    <WbSunnyIcon style={{ color: 'white', transform: 'scale(1.8)' }} />
                    <span style={{ fontSize: '20px' }}> {currentLightValue?.toFixed(2)} Lux</span>
                  </Paper>
                </Grid> */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentLightBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>  Ánh sáng</span>
                    <WbSunnyIcon style={{ color: 'white', transform: 'scale(1.8)' }} />
                    <span style={{ fontSize: '20px' }}> {currentLightValue?.toFixed(2)} Lux</span>
                  </Paper>
                </Grid>

                {/* Current Humid */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentHumidBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'

                    }}
                  >
                    <span style={{ fontSize: '20px' }}> Độ ẩm </span>
                    <OpacityIcon style={{ color: 'white', transform: 'scale(1.8)', }} />
                    <span style={{ fontSize: '20px' }}> {currentHumidValue?.toFixed(2)} %</span>
                  </Paper>
                </Grid> */}
                <Grid item xs={12} md={4} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentHumidBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'

                    }}
                  >
                    <span style={{ fontSize: '20px' }}> Độ ẩm </span>
                    <OpacityIcon style={{ color: 'white', transform: 'scale(1.8)', }} />
                    <span style={{ fontSize: '20px' }}> {currentHumidValue?.toFixed(2)} %</span>
                  </Paper>
                </Grid>

                {/* Dust */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 200,
                      backgroundColor: `${currentDustBackground}`,
                      color: 'white',
                      gap: 3,
                      borderRadius: '30px'

                    }}
                  >
                    <span style={{ fontSize: '20px' }}> Độ bụi </span>
                    <SiWeightsandbiases style={{ color: 'white', transform: 'scale(1.8)', }} />
                    <span style={{ fontSize: '20px' }}> {currentDustValue?.toFixed(2)} %</span>
                  </Paper>
                </Grid> */}

              </Grid>

              {/* Type of Chart */}
              <Grid container spacing={0} marginBottom={8} marginTop={8}>

                {/* text */}
                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="outline" size='medium' sx={{ height: '40px' }}>Chọn loại biểu đồ</Button>
                </Grid> */}
                <Grid item xs={12} md={4} lg={2.3}>
                  <Button variant="outline" size='medium' sx={{ height: '40px' }}>Chọn loại biểu đồ</Button>
                </Grid>
                {/* Option */}

                {/* Nhiệt độ  */}
                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" size='medium' color={tempColor} sx={{ height: '40px' }} onClick={() => changeTypeChart(1)}>Nhiệt độ</Button>
                </Grid> */}
                <Grid item xs={12} md={4} lg={2.3}>
                  <Button variant="contained" size='medium' color={tempColor} sx={{ height: '40px' }} onClick={() => changeTypeChart(1)}>Nhiệt độ</Button>
                </Grid>

                {/* Ánh sáng  */}
                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" color={lightColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(2)}> Ánh sáng</Button>
                </Grid> */}

                <Grid item xs={12} md={4} lg={2.3}>
                  <Button variant="contained" color={lightColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(2)}> Ánh sáng</Button>
                </Grid>
                {/* Độ ẩm */}
                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" color={humidColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(3)} > Độ ẩm</Button>
                </Grid> */}

                <Grid item xs={12} md={4} lg={2.3}>
                  <Button variant="contained" color={humidColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(3)} > Độ ẩm</Button>
                </Grid>

                {/* Join */}

                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" color={joinColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(4)} > Tổng quan</Button>
                </Grid> */}

                <Grid item xs={12} md={4} lg={2.3}>
                  <Button variant="contained" color={joinColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(4)} > Tổng quan</Button>
                </Grid>

                {/* Dust */}
                {/* <Grid item xs={12} md={4} lg={2}>
                  <Button variant="contained" color={dustColor} size='medium' sx={{ height: '40px' }} onClick={() => changeTypeChart(5)} > Độ bụi</Button>
                </Grid> */}
              </Grid>

              {/* Chart Temperature */}
              <Grid container spacing={1}>
                <Grid item xs={12} md={8} lg={8.5}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 500,
                    }}
                  >
                    {typeChart === 1 ? <TemperatureChart /> : typeChart === 2 ? <LightChart /> : typeChart === 3 ? <HumidChart /> : typeChart === 4 ? <JoinChart /> : <DustChart />}
                    {/* <TemperatureChart /> */}
                  </Paper>
                </Grid>

                {/* Switch  */}
                <Grid item xs={12} md={8} lg={3} marginLeft={5}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 500,
                      gap: 3,
                    }}
                  >
                    <ControlTable />
                    <BulbSwitch />
                    <FanSwitch />
                    <AirConditionalSwitch />
                  </Paper>
                </Grid>
              </Grid>


              {/*  Footer */}
              <Copyright sx={{ pt: 4, }} />

              {/* Another Component */}

              {/* Noti Component */}

              {/* {noti ? <NotiMenu /> : <></>} */}
              {
                state?.loading1 ? <img className='spin-onn' style={{ position: 'relative', bottom: '480px', left: '985px', width: '30px', height: '30px' }} src='https://openclipart.org/image/2400px/svg_to_png/225151/Loading_icon_with_fade.png'></img> : <></>
              }
              {
                state?.loading2 ? <img className='spin-onn' style={{ position: 'relative', bottom: '355px', left: '985px', width: '30px', height: '30px' }} src='https://openclipart.org/image/2400px/svg_to_png/225151/Loading_icon_with_fade.png'></img> : <></>
              }
              {
                state?.loading3 ? <img className='spin-onn' style={{ zIndex: '99999999', position: 'relative', bottom: '235px', left: '985px', width: '30px', height: '30px' }} src='https://openclipart.org/image/2400px/svg_to_png/225151/Loading_icon_with_fade.png'></img> : <></>
              }
            </Container>
              : state.page === 2 ?
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                  {/* Title  */}
                  <Grid container spacing={1} alignItems='center' justifyContent='center' >

                    <Grid item xs={12} md={4} lg={11}  >
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: 70,
                        }}
                      >
                        <Typography
                          component="h1"
                          variant="h6"
                          color="inherit"
                          noWrap
                          sx={{ flexGrow: 1, fontWeight: 'bold' }}
                        >
                          DataHistory
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Filter */}

                  <Grid container spacing={1} alignItems='center' justifyContent='center' >

                    <Grid item xs={12} md={4} lg={11}  >
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 150,
                        }}
                      >
                        <Filter />
                      </Paper>
                    </Grid>
                  </Grid>

                  {/* Table */}
                  <Grid container spacing={1} alignItems='center' justifyContent='center'>

                    <Grid item xs={12} md={4} lg={11}  >
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          height: 'auto',
                        }}
                      >
                        <DenseTable />
                      </Paper>
                    </Grid>
                  </Grid>


                  {/* Pagination */}

                  <Grid container spacing={1} alignItems='center' justifyContent='center'>

                    <Grid item xs={12} md={4} lg={11} >
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          flexDirection: 'row',
                          height: 'auto',

                        }}
                      >
                        <PaginationHistory />
                      </Paper>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ pt: 4, }} />
                </Container>

                // Page 3

                : state.page === 3 ?
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

                    {/* Title  */}
                    <Grid container spacing={1} alignItems='center' justifyContent='center' >

                      <Grid item xs={12} md={4} lg={11}  >
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 70,
                          }}
                        >
                          <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: 'bold' }}
                          >
                            ActionHistory
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Filter */}

                    <Grid container spacing={1} alignItems='center' justifyContent='center' >

                      <Grid item xs={12} md={4} lg={11}  >
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 150,
                          }}
                        >
                          <Filter2 />
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Table */}
                    <Grid container spacing={1} alignItems='center' justifyContent='center'>

                      <Grid item xs={12} md={4} lg={11}  >
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',
                          }}
                        >
                          <DenseTable2 />
                        </Paper>
                      </Grid>
                    </Grid>


                    {/* Pagination */}

                    <Grid container spacing={1} alignItems='center' justifyContent='center'>

                      <Grid item xs={12} md={4} lg={11} >
                        <Paper
                          sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',

                          }}
                        >
                          <PaginationAction />
                        </Paper>
                      </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4, }} />
                  </Container>


                  : state.page === 4 ?
                    <Container maxWidth="lg" sx={{}}>

                      {/* Github */}

                      <Grid container spacing={1} alignItems='center' justifyContent='center'>

                        <Grid item xs={12} md={4} lg={11}  >
                          <Paper
                            sx={{
                              p: 2,
                              display: 'flex',
                              flexDirection: 'column',
                              height: 900,
                            }}
                          >
                            <Github />
                          </Paper>
                        </Grid>
                      </Grid>

                      {/* Profile */}


                      {/* Link bai tap*/}
                      {/* <Grid container spacing={1} alignItems='center' justifyContent='center' >

                        <Grid item xs={12} md={4} lg={11}  >
                          <Paper
                            sx={{
                              p: 2,
                              display: 'flex',
                              flexDirection: 'column',
                              height: 150,
                            }}
                          >
                            <Pdf />
                          </Paper>
                        </Grid>
                      </Grid> */}
                      <Copyright sx={{ pt: 4, }} />
                    </Container>
                    : <></>
          }
        </Box>
      </Box>
    </ThemeProvider >
  );
}