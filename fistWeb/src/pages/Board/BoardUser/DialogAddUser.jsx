import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AddConfirmationDialog = ({ onConfirm }) => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [role, setRole] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [numberPhone, setNumberPhone] = useState('');
    const [des, setDes] = useState('');
    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState({
        user: true,
        username: true,
        password: true,
        displayName: true,
        numberPhone: true,
        des: true,
        role: true
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        const isValid = validateInputs();
        if (isValid) {
            const mData = {
                user: code,
                username: username,
                password: password,
                role: role,
                displayName: displayName,
                des: des,
                numberPhone: numberPhone
            };
            onConfirm(mData);
            setOpen(false);
        }
    };

    const validateInputs = () => {
        const updatedValidation = {
            user: !!code,
            username: !!username,
            password: !!password,
            displayName: !!displayName,
            des: !!des,
            role: !!role,
            numberPhone: !!numberPhone
        };
        setValidation(updatedValidation);
        return Object.values(updatedValidation).every(value => value);
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);
        // Reset bienso when role changes
    };

    return (
        <>
            <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={handleOpen}>
                Thêm mới
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm mới</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label="Mã nhân viên"
                            fullWidth
                            margin="normal"
                            error={!validation.user}
                            helperText={!validation.user && "Mã nhân viên không được để trống"}
                            onChange={(e) => (setCode(e.target.value))}
                        />
                        <TextField
                            label="Tên đăng nhập"
                            fullWidth
                            margin="normal"
                            error={!validation.username}
                            helperText={!validation.username && "Tên đăng nhập không được để trống"}
                            onChange={(e) => (setUsername(e.target.value))}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined" error={!validation.password} margin="normal">
                            <InputLabel htmlFor="outlined-adornment-password">Mật khẩu</InputLabel>
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
                                label="Mật khẩu"
                            />
                            {!validation.password && <FormHelperText>Mật khẩu không được để trống</FormHelperText>}
                        </FormControl>
                        <TextField
                            label="Họ và tên"
                            fullWidth
                            margin="normal"
                            error={!validation.displayName}
                            helperText={!validation.displayName && "Họ và tên không được để trống"}
                            onChange={(e) => (setDisplayName(e.target.value))}
                        />
                         <TextField
                            label="Số điện thoại"
                            fullWidth
                            margin="normal"
                            error={!validation.numberPhone}
                            helperText={!validation.numberPhone && "Số điện thoại không để trống"}
                            onChange={(e) => (setNumberPhone(e.target.value))}
                        />
                        <TextField
                            label="Mô tả"
                            fullWidth
                            margin="normal"
                            error={!validation.des}
                            helperText={!validation.des && "Mô tả không để trống"}
                            onChange={(e) => (setDes(e.target.value))}
                        />
                        <FormControl fullWidth margin="normal" error={!validation.role}>
                            <Select
                                onChange={handleRoleChange}
                                value={role}
                            >
                                <MenuItem value="shipper">Shipper</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                            </Select>
                            {!validation.role && <FormHelperText>Vui lòng chọn vai trò</FormHelperText>}
                        </FormControl>

                       
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleConfirm}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

AddConfirmationDialog.propTypes = {
    onConfirm: PropTypes.func.isRequired,
};

export default AddConfirmationDialog;
