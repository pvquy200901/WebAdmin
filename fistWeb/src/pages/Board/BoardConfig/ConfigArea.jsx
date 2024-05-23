import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, Input, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendDomain } from '../../../apis/configURL';
import axios from '../../../apis/custom_axios';



const columns = [
  { id: 'name', label: 'Tên cửa hàng', minWidth: 170, align: 'center', },
  { id: 'users', label: 'Chủ cửa hàng', minWidth: 100, align: 'center', },
  {
    id: 'des',
    label: 'Mô tả',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Thao tác',
    minWidth: 170,
    align: 'center',
  },

];

function ConfigArea() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [infoShop, setInfoShop] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [image1, setImage1] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      setImage1(file)
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('code', "");
    formData.append('name', name);
    formData.append('type', type);
    formData.append('image', image1);

    try {
      const response = await axios.post('api/User/createShop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token")
        }
      });
      // Xử lý phản hồi từ API
      console.log('Success:', response.data);
      // toast.success("Thành công");
    } catch (error) {
      // console.error('Error:', error); // Xử lý lỗi mạng
      // toast.error("Có lỗi xảy ra");
    }

  }

  const editShop = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('code', infoShop.code);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('image', image1);

    try {
      const response = await axios.put('api/User/editShop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token")
        }
      });
      // Xử lý phản hồi từ API
      console.log('Success:', response.data);
      if (response.status === 200) {
        toast.success("Thành công");
        fetchShop();
      }
      else {
        toast.error("Thất bại");

      }
      // toast.success("Thành công");
    } catch (error) {
      // console.error('Error:', error); // Xử lý lỗi mạng
      toast.error("Có lỗi xảy ra");
    }

  }

  async function fetchShop() {
    try {

      if (localStorage.getItem("role") === "admin") {
        const dataUser = await axios.get("api/User/getListShop")

        if (dataUser.status === 200) {
          // Lưu thông tin vào localStorage
          setRows(dataUser.data);


        } else {
          // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        }
      }
      else if (localStorage.getItem("role") === "manager") {
        const dataUser = await axios.get("api/User/getInfoShop", { headers: { token: localStorage.getItem("token") } })

        if (dataUser.status === 200) {
          // Lưu thông tin vào localStorage
          setInfoShop(dataUser.data);
        } else {
          // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        }
      }

    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {

        if (localStorage.getItem("role") === "manager") {
          const dataUser = await axios.get("api/User/getInfoShop", { headers: { token: localStorage.getItem("token") } })

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

    fetchData(),
      fetchShop()
  }, [])

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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const editShopV2 = async () => {
    const formData = new FormData();
    formData.append('code', selectedUser.code);
    formData.append('name', selectedUser.name);
    formData.append('type', type);
    formData.append('image', image1);

    try {
      const response = await axios.put('api/User/editShop', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: localStorage.getItem("token")
        }
      });
      // Xử lý phản hồi từ API
      console.log('Success:', response.data);
      if (response.status === 200) {
        toast.success("Thành công");
        fetchShop();
      }
      else {
        toast.error("Thất bại");

      }
      // toast.success("Thành công");
    } catch (error) {
      // console.error('Error:', error); // Xử lý lỗi mạng
      // toast.error("Có lỗi xảy ra");
    }

  }

  const handleSaveChanges = () => {
    // Đưa logic lưu thay đổi ở đây
    editShopV2()
    setOpenDialog(false);
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);
    // Reset bienso when role changes
  };

  return (
    (localStorage.getItem("role") === "admin" ?
      <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                          var value = row[column.id];
                          if (column.id === "users") {
                            if (row.users && row.users.length > 0) {
                              value = row.users[0].name
                            }
                            else {
                              value = "Chưa có chủ cửa hàng";
                            }
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'action' ? (
                                <>
                                  <IconButton aria-label="edit" onClick={() => handleEditUser(row)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                </>
                              ) : column.id === '1' ? (

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
            <DialogTitle>Chỉnh sửa cửa hàng</DialogTitle>
            <DialogContent>
              {/* Hiển thị thông tin người dùng và các trường chỉnh sửa ở đây */}
              {selectedUser && (
                <form>
                  <TextField
                    label="Mã cửa hàng"
                    value={selectedUser.code}
                    disabled
                    fullWidth
                    margin="normal"
                  />

                  <TextField
                    label="Tên cửa hàng"
                    value={selectedUser.name}
                    fullWidth
                    margin="normal"
                    onChange={(e) => (setSelectedUser({ ...selectedUser, name: e.target.value }))}

                  />
                  {/* <TextField
                label="Mô tả"
                value={selectedUser.des}
                fullWidth
                margin="normal"
                //onChange={(e) => (setSelectedUser({ ...selectedUser, des: e.target.value }), setDes(e.target.value))}

              /> */}
                  {/* <TextField
                label="Loại cửa"
                value={selectedUser.roleName}
                fullWidth
                disabled
                margin="normal"
              /> */}
                </form>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy</Button>
              <Button onClick={handleSaveChanges}>Lưu</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </> :
      <>
        {infoShop ?
          <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <label htmlFor="image-upload">
                    <Avatar
                      alt="User Avatar"
                      src={`${backendDomain}/api/File/image/${infoShop.image}` || image}
                      sx={{ width: 100, height: 100, cursor: 'pointer' }}
                    />
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    sx={{ display: 'none' }}
                  />
                  <form style={{ width: '100%', marginTop: '20px' }}>
                    <TextField
                      label="Tên cửa hàng"
                      fullWidth
                      margin="normal"
                      value={infoShop.name}
                      onChange={(e) => (setInfoShop({ ...infoShop, name: e.target.value }), setName(e.target.value))}
                    />
                    <FormControl fullWidth margin="normal">
                      <Select
                        onChange={handleTypeChange}
                        value={type}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Chọn loại</MenuItem>
                        <MenuItem value="food">Đồ ăn</MenuItem>
                        {/* Thêm các MenuItem khác tại đây nếu cần */}
                      </Select>
                    </FormControl>
                  </form>
                  <Button onClick={editShop}>Sửa</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
          :
          <Container>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
              <Grid item xs={12} sm={8} md={6}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <label htmlFor="image-upload">
                    <Avatar
                      alt="User Avatar"
                      src={image || "https://via.placeholder.com/150"}
                      sx={{ width: 100, height: 100, cursor: 'pointer' }}
                    />
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    sx={{ display: 'none' }}
                  />
                  <form style={{ width: '100%', marginTop: '20px' }}>
                    <TextField
                      label="Tên cửa hàng"
                      fullWidth
                      margin="normal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormControl fullWidth margin="normal">
                      <Select
                        onChange={handleTypeChange}
                        value={type}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Chọn loại</MenuItem>
                        <MenuItem value="food">Đồ ăn</MenuItem>
                        {/* Thêm các MenuItem khác tại đây nếu cần */}
                      </Select>
                    </FormControl>
                  </form>
                  <Button onClick={handleSubmit}>Tạo</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>

        }
      </>)
  );
}

export default ConfigArea