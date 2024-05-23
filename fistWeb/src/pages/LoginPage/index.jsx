import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, CircularProgress, Paper, Snackbar } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { green } from '@mui/material/colors';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../apis/custom_axios';



function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = React.useState(false);


    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate()


    // Sử dụng useEffect để xử lý chuyển hướng
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/dashboard")
        }
        else {
            navigate("/")
        }
    }, []);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [typeSnackbar, settypeSnackbar] = useState('');

    const mdata = {
        username: username,
        password: password
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            // Thay thế 'API_ENDPOINT' bằng endpoint thực tế của bạn
            const datalogin = await axios.post("api/User/login", mdata)

            if (datalogin.status === 200 && datalogin.data.token != "") {
                // Lưu thông tin vào localStorage
                localStorage.setItem('user', datalogin.data.user);
                localStorage.setItem('role', datalogin.data.role);
                localStorage.setItem('token', datalogin.data.token);
                // setOpenSnackbar(true);
                // settypeSnackbar("success")

                setSuccess(true);

                setTimeout(() => {
                    setLoading(false);
                    navigate("/dashboard");
                }, 500)

            } else {
                // Xử lý lỗi (ví dụ: thông báo cho người dùng)

                setTimeout(() => {
                    setOpenSnackbar(true);
                    settypeSnackbar("error")
                    setLoading(false);
                }, 500)


            }
        } catch (error) {

            setTimeout(() => {
                setOpenSnackbar(true);
                settypeSnackbar("error")
                setLoading(false);
            }, 500)
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
        settypeSnackbar("error")
    };

    return (
        <Grid container component="main" sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", height: "100vh",
        }} >
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={1}
                square
            >
                <Box sx={{ p: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: 'red', color: 'white' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                    <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                        Đăng nhập
                    </Typography>
                    <TextField
                            onChange={(event) => setUsername(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên đăng nhập"
                            name="username"
                            autoFocus
                        />
                        <FormControl sx={{width: '100%'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu *</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                required
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu *"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            //className={classes.submit}
                            onClick={handleLogin}
                            sx={buttonSx}
                            disabled={loading}
                        >
                            Đăng nhập
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={2000}
                            onClose={handleCloseSnackbar}
                        >
                            <Alert onClose={handleCloseSnackbar} severity={typeSnackbar}>

                                {typeSnackbar === "success" ? <Typography>Đăng nhập thành công </Typography> : <Typography>Đăng nhập thất bại</Typography>}
                            </Alert>
                        </Snackbar>
                      
                </Box>
            </Grid>
        </Grid>
    );
}

export default LoginPage;
