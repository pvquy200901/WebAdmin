import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, ImageList, ImageListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendDomain } from '../../../apis/configURL';
import axios from '../../../apis/custom_axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

function ConfigGroup() {

  const columns = [
    { id: 'code', label: 'Mã sản phẩm', minWidth: 170, align: 'center', },
    { id: 'name', label: 'Tên sản phẩm', minWidth: 100, align: 'center', },
    { id: 'price', label: 'Giá sản phẩm', minWidth: 100, align: 'center', },
    { id: 'quantity', label: 'Số lượng', minWidth: 100, align: 'center', },
    {
      id: 'images',
      label: 'Hình ảnh',
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

  const [validation, setValidation] = useState({
    code: true,
    name: true,
    price: true,
    quantity: true
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [editImages, setEditImages] = useState([]);


  async function fetchData() {
    try {

      const dataUser = await axios.get("api/Customer/getListProductForUser", { headers: { token: localStorage.getItem("token") } })

      if (dataUser.status === 200) {
        // Lưu thông tin vào localStorage
        setRows(dataUser.data);
        console.log("row", dataUser.data)


      } else {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      }

    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {

        const dataUser = await axios.get("api/Customer/getListProductForUser", { headers: { token: localStorage.getItem("token") } })

        if (dataUser.status === 200) {
          // Lưu thông tin vào localStorage
          setRows(dataUser.data);


        } else {
          // Xử lý lỗi (ví dụ: thông báo cho người dùng)
        }

      } catch (error) {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      }
    }

    fetchData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditRow = (user) => {
    setSelectedRow(user);
    setOpenDialog(true);
  };
  const handleCloseDialogEdit = () => {
    setOpenDialog(false);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const validateInputs = () => {
    const updatedValidation = {
      code: !!code || !!selectedRow.code,
      name: !!name || !!selectedRow.code,
      price: !!price || !!selectedRow.code,
      quantity: !!quantity || !!selectedRow.code,

    };
    setValidation(updatedValidation);
    return Object.values(updatedValidation).every(value => value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSaveChanges = async () => {
    const isValid = validateInputs();
    if (isValid) {
      // Create FormData object
      const formData = new FormData();

      // Append each selected file to the formData
      images.forEach((image) => {
        formData.append("file", image);
      });

      const params = {
        code: code,
        name: name,
        quantity: quantity,
        price: price
      };
      try {
        await axios.post('api/User/createProduct', formData, {
          params: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem("token")
          }
        }).then(response => {
          toast.success("Thành công");
          fetchData()
          console.log('Success:', response.data);
        })
          .catch((error) => {
            toast.error("Có lỗi xảy ra");
            console.error('Error:', error);
          })
      } catch (error) {
        // console.error('Error:', error); // Xử lý lỗi mạng
        toast.error("Có lỗi xảy ra");
      }

      setOpen(false);
    }

   
  };
  const handleSaveEdit = async () => {
    const isValid = validateInputs();
    if (isValid) {
      // // Create FormData object
      // const formData = new FormData();

      // // Append each selected file to the formData
      // images.forEach((image) => {
      //   formData.append("file", image);
      // });

      const data = {
        code: selectedRow.code,
        name: selectedRow.name,
        quantity: selectedRow.quantity,
        price: selectedRow.price
      };
      try {
        await axios.put('api/User/editProduct', data, {
          headers: {

            token: localStorage.getItem("token")
          }
        }).then(response => {
          toast.success("Thành công");
          fetchData()
          console.log('Success:', response.data);
        })
          .catch((error) => {
            toast.error("Có lỗi xảy ra");
            console.error('Error:', error);
          })
      } catch (error) {
        // console.error('Error:', error); // Xử lý lỗi mạng
        toast.error("Có lỗi xảy ra");
      }

    }

    if(editImages.length > 0){
      //
      const formData = new FormData();

      // Append each selected file to the formData
      editImages.forEach((image) => {
        formData.append("file", image);
      });

      const params = {
        code: selectedRow.code,
      };
      try {
        await axios.put('api/User/addImagesProduct', formData, {
          params: params,
          headers: {
            'Content-Type': 'multipart/form-data',
            token: localStorage.getItem("token")
          }
        }).then(response => {
          toast.success("Thêm hình ảnh thành công");
          fetchData()
          console.log('Success:', response.data);
        })
          .catch((error) => {
            toast.error("Có lỗi xảy ra");
            console.error('Error:', error);
          })
      } catch (error) {
        // console.error('Error:', error); // Xử lý lỗi mạng
        toast.error("Có lỗi xảy ra");
      }
    }
    setOpenDialog(false);

  };

  const handleDeleteImage = async (image) => {
    try {
      const params = {
        code: selectedRow.code,
        image: image,
      };
        // Call your API to delete the image
        await axios.delete('api/User/deleteImageProduct',{
          params: params,
          headers: {
            token: localStorage.getItem("token")
          }
        }).then(response => {
          toast.success("Xóa hình thành công");
          fetchData()
          console.log('Success:', response.data);
        })
          .catch((error) => {
            toast.error("Có lỗi xảy ra");
            console.error('Error:', error);
          })
        // Update the images list
        setSelectedRow({
            ...selectedRow,
            images: selectedRow.images.filter((img) => img !== image)
        });
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }} onClick={handleOpen}>
            Thêm mới
          </Button>
        </Grid>

      </Grid>
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
                        if (column.id === "images") {
                          if (row.images && row.images.length > 0) {
                            value = row.images[0]
                          }
                          else {
                            value = "Không có hình ảnh";
                          }
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'action' ? (
                              <>
                                <IconButton aria-label="edit" onClick={() => handleEditRow(row)}>
                                  <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : column.id === 'images' ? (

                              <img src={`${backendDomain}/api/File/image/${value}` || value} alt="Selected" width="150" height="150"  style={{ objectFit: 'cover' }} />
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
          <DialogTitle>Chỉnh sửa hàng</DialogTitle>
          <DialogContent>
            {selectedRow && (
              <form>
                <TextField
                  label="Mã cửa hàng"
                  value={selectedRow.code}
                  disabled
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Tên hàng"
                  fullWidth
                  margin="normal"
                  value={selectedRow.name}
                  error={!validation.name}
                  helperText={!validation.name && "Tên hàng không được để trống"}
                  onChange={(e) => (setSelectedRow({ ...selectedRow, name: e.target.value }))}
                />
                <TextField
                  label="Số lượng"
                  fullWidth
                  margin="normal"
                  value={selectedRow.quantity}
                  error={!validation.quantity}
                  helperText={!validation.quantity && "Số lượng không được để trống"}
                  onChange={(e) => (setSelectedRow({ ...selectedRow, quantity: e.target.value }))}
                />
                <TextField
                  label="Giá cả"
                  fullWidth
                  margin="normal"
                  error={!validation.price}
                  value={selectedRow.price}
                  helperText={!validation.price && "Giá cả không để trống"}
                  onChange={(e) => (setSelectedRow({ ...selectedRow, price: e.target.value }))}
                />
                <div>
                  <h3>Hình ảnh hiện tại:</h3>
                  {selectedRow.images.length > 0 ? (
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                      {selectedRow.images.map((item) => (
                        <ImageListItem key={item.img}>
                          <div style={{ position: 'relative' }}>
                            <img
                              src={`${backendDomain}/api/File/image/${item}?w=164&h=164&fit=crop&auto=format`}
                              srcSet={`${backendDomain}/api/File/image/${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              alt={item}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                background: 'rgba(255, 255, 255, 0.4)'
                              }}
                              onClick={() => handleDeleteImage(item)}
                            >
                              <ClearIcon />
                            </IconButton>
                          </div>
                        </ImageListItem>
                      ))}
                    </ImageList>
                  ) : (
                    <p>Không có hình ảnh nào</p>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setEditImages(Array.from(e.target.files))}
                />

              </form>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogEdit}>Hủy</Button>
            <Button onClick={handleSaveEdit}>Lưu</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open} onClose={handleOpen}>
          <DialogTitle>Thêm mới</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Mã hàng"
                fullWidth
                margin="normal"
                error={!validation.code}
                helperText={!validation.code && "Mã hàng không được để trống"}
                onChange={(e) => setCode(e.target.value)}
              />
              <TextField
                label="Tên hàng"
                fullWidth
                margin="normal"
                error={!validation.name}
                helperText={!validation.name && "Tên hàng không được để trống"}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Số lượng"
                fullWidth
                margin="normal"
                error={!validation.quantity}
                helperText={!validation.quantity && "Số lượng không được để trống"}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                label="Giá cả"
                fullWidth
                margin="normal"
                error={!validation.price}
                helperText={!validation.price && "Giá cả không để trống"}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="file"
                multiple
                onChange={(e) => setImages(Array.from(e.target.files))}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy</Button>
            <Button onClick={handleSaveChanges}>Lưu</Button>
          </DialogActions>
        </Dialog>

      </Paper>
    </>

  )
}

export default ConfigGroup