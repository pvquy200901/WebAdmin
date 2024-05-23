
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../../apis/custom_axios';
import AddConfirmationDialog from './DialogAddUser';
import DeleteConfirmationDialog from './DialogDelete';

const columns = [
  { id: 'user', label: 'Mã nhân viên', minWidth: 170 },
  { id: 'username', label: 'Tên đăng nhập', minWidth: 100 },
  {
    id: 'displayName',
    label: 'Họ và tên',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'numberPhone',
    label: 'Số điện thoại',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'roleName',
    label: 'Vai trò',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Thao tác',
    minWidth: 170,
    align: 'right',
  },

];

export default function BoardUser() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [des, setDes] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    timestamp: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem("role") === "admin") {
          const dataUser = await axios.get("api/User/getListUser", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);


          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
          }
        }
        else if (localStorage.getItem("role") === "manager") {
          const dataUser = await axios.get("api/User/getListUserShop", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);


          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
          }
        }

      } catch (error) {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const timestamp = new Date(position.timestamp).toLocaleTimeString();

          if (accuracy <= 10) { // Đảm bảo độ chính xác dưới 10 mét
            setLocation({ latitude, longitude, timestamp });
          }
        },
        (error) => {
          setError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };
  async function editUser() {
    try {
      const mUser = {
        "user": selectedUser.user,
        "username": selectedUser.username,
        "password": password,
        "des": des,
        "displayName": displayName,
        "numberPhone": numberPhone,
      };
      const dataUser = await axios.put("api/User/editUser", mUser, { headers: { token: localStorage.getItem("token") } })

      if (dataUser.status === 200) {
        //
        const newDataUser = await axios.get("api/User/getListUser", { headers: { token: localStorage.getItem("token") } });
        if (newDataUser.status === 200) {
          // Cập nhật lại danh sách rows
          setRows(newDataUser.data);
          // const filtered = rows.filter(row => row.displayName.toLowerCase().includes(searchKeyword.toLowerCase()) || row.code.toLowerCase().includes(searchKeyword.toLowerCase()));
          // setFilteredRows(filtered);
          toast("Chỉnh sửa thành công");

        }
      } else {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        toast("Có lỗi xảy ra");

      }
    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      toast("Có lỗi xảy ra");
    }
  }
  async function deleteUser(code) {
    try {
      const dataUser = await axios.delete(`api/User/${code}/delete`, { headers: { token: localStorage.getItem("token") } })

      if (dataUser.status === 200) {

        if (localStorage.getItem("role") === "admin") {
          const dataUser = await axios.get("api/User/getListUser", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);
            toast("Xóa thành công");


          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
          }
        }
        else if (localStorage.getItem("role") === "manager") {
          const dataUser = await axios.get("api/User/getListUserShop", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);
            toast("Xóa thành công");


          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
            toast("Có lỗi xảy ra");

          }
        }

      } else {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        toast("Có lỗi xảy ra");

      }
    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      toast("Có lỗi xảy ra");

    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
    editUser();
    setOpenDialog(false);
    setPassword('')
  };

  async function addUser(data) {
    try {
      const dataUser = await axios.post("api/User/createUser", data, { headers: { token: localStorage.getItem("token") } })

      if (dataUser.status === 200) {

        if (localStorage.getItem("role") === "admin") {
          const dataUser = await axios.get("api/User/getListUser", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);

            toast("Tạo thành công");

          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
            toast("Có lỗi xảy ra");

          }
        }
        else if (localStorage.getItem("role") === "manager") {
          const dataUser = await axios.get("api/User/getListUserShop", { headers: { token: localStorage.getItem("token") } })

          if (dataUser.status === 200) {
            // Lưu thông tin vào localStorage
            setRows(dataUser.data);
            toast("Tạo thành công");


          } else {
            // Xử lý lỗi (ví dụ: thông báo cho người dùng)
            toast("Có lỗi xảy ra");

          }
        }
      } else {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        toast("Có lỗi xảy ra");

      }
    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <AddConfirmationDialog onConfirm={addUser} />
        </Grid>

      </Grid>
      {/* <div>
        <h1>Theo dõi vị trí của bạn</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <div id="location">
            Latitude: <span id="latitude">{location.latitude}</span><br />
            Longitude: <span id="longitude">{location.longitude}</span><br />
            Timestamp: <span id="timestamp">{location.timestamp}</span>
          </div>
        )}
      </div> */}
      <TableContainer sx={{ maxHeight: 510 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <>
                              <IconButton aria-label="edit" onClick={() => handleEditUser(row)}>
                                <EditIcon />
                              </IconButton>
                              <DeleteConfirmationDialog code={row.user} onConfirm={deleteUser} />

                            </>
                          ) : column.id === 'area' ? (
                            <IconButton aria-label="menu">
                              <MenuIcon />
                            </IconButton>
                          ) : (
                            column.format && typeof value === 'number' ? (
                              column.format(value)
                            ) : (
                              value
                            )
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          {/* Hiển thị thông tin người dùng và các trường chỉnh sửa ở đây */}
          {selectedUser && (
            <form>
              <TextField
                label="Mã nhân viên"
                value={selectedUser.user}
                disabled
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tên đăng nhập"
                value={selectedUser.username}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Họ và tên"
                value={selectedUser.displayName}
                fullWidth
                margin="normal"
                onChange={(e) => (setSelectedUser({ ...selectedUser, displayName: e.target.value }), setDisplayName(e.target.value))}

              />
              <FormControl sx={{ width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Mật khẩu *</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  required
                  value={password}
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
              </FormControl>
              <TextField
                label="Số điện thoại"
                value={selectedUser.numberPhone}
                fullWidth
                margin="normal"
                onChange={(e) => (setSelectedUser({ ...selectedUser, numberPhone: e.target.value }), setNumberPhone(e.target.value))}

              />
              <TextField
                label="Mô tả"
                value={selectedUser.des}
                fullWidth
                margin="normal"
                onChange={(e) => (setSelectedUser({ ...selectedUser, des: e.target.value }), setDes(e.target.value))}

              />
              <TextField
                label="Vai trò"
                value={selectedUser.roleName}
                fullWidth
                disabled
                margin="normal"
              />
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveChanges}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
