import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import TimelineItem from '@mui/lab/TimelineItem';
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import SummaryApi from "../../../apis";
import { backendDomain } from "../../../apis/configURL";
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
//import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import axios from '../../../apis/custom_axios'

function BoardOrder() {
  const columns = [
    { id: 'customer', label: 'Người đặt', minWidth: 170, align: 'center' },
    { id: 'detail', label: 'Chi tiết sản phẩm', minWidth: 50, align: 'center' },
    { id: 'state', label: 'Trạng thái', minWidth: 100, align: 'center' },
    // {
    //   id: 'quantity',
    //   label: 'Số lượng',
    //   minWidth: 100,
    //   align: 'right',
    // },
    {
      id: 'phone',
      label: 'Số điện thoại',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      minWidth: 200,
      align: 'center',
    },
    {
      id: 'total',
      label: 'Tổng tiền',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'note',
      label: 'Ghi chú',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'time',
      label: 'Thời gian',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 100,
      align: 'center',
    },


  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [shipper, setShipper] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [openDialogRow, setOpenDialogRow] = useState(false);
  const [openDialogShipper, setOpenDialogShipper] = useState(false);
  const [openDialogState, setOpenDialogState] = useState(false);
  const [selectedShipper, setSelectedShipper] = useState('working');

  const handleChange = (event) => {
    setSelectedShipper(event.target.value);
  };

  const currencies = [
    {
      value: 'working',
      label: 'Đang làm',
    },
    {
      value: 'shipping',
      label: 'Đang giao',
    },
    {
      value: 'done',
      label: 'Đã hoàn thành',
    }
  ];

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${SummaryApi.orders.url}`, {
        method: SummaryApi.orders.method,
        headers: {
          token: localStorage.getItem("token")
        }
      });
      if (response.ok) {
        const data = await response.json();
        setRows(data)
        // Sử dụng dữ liệu ở đây, ví dụ: setOrders(data.orders);
      } else {
        toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng");
    }
  };
  useEffect(() => {
    fetchOrders()
  }, [])


  const handleConfirmOrder = async (code) => {
    try {
      const response = await fetch(`${SummaryApi.confirmOrder.url}?code=${code}`, {
        method: SummaryApi.confirmOrder.method,
        headers: {
          "content-type": "application/json",
          token: localStorage.getItem("token")
        }
      });

      if (response.ok) {
        toast("Xác nhận đơn hàng thành công");
        fetchOrders();
      } else {
        toast("Đơn hàng đã được xác nhận");
      }
    } catch (error) {
      console.error('Error:', error); // Xử lý lỗi mạng
      toast("Có lỗi xảy ra");
    }
  }

  const handleSetStateOrder = async (code) => {
    const response = await fetch(SummaryApi.setStateOrder.url, {
      method: SummaryApi.setStateOrder.method,
      //credentials: 'include',
      headers: {
        "content-type": 'application/json',
        token: localStorage.getItem("token")
      },
      body: JSON.stringify(
        {
          user: "",
          code: code.code,
          state: ""
        }
      )
    })

    if (response.status === 200) {
      fetchOrders()
      toast("Cập nhật đơn hàng thành công");
    }
    else {
      toast("Có lỗi");
    }
    setOpenDialogShipper(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const handleDetailProduct = (product) => {
    setSelectedOrder(product)
    setOpenDialogDetail(true);
  };
  const handleDetailOrder = (order) => {
    setSelectedRow(order)
    setOpenDialogRow(true);
  };

  const handleShipper = async (order) => {
    try {
      const dataShipper = await axios.get("api/User/getListUserShipper", { headers: { token: localStorage.getItem("token") } })

      if (dataShipper.status === 200) {
        // Lưu thông tin vào localStorage
        setShipper(dataShipper.data);


      } else {
        // Xử lý lỗi (ví dụ: thông báo cho người dùng)
      }
    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
    }
    setSelectedRow(order)
    setOpenDialogShipper(true);
  };

  const handleChooseShipper = async (order, shipper) => {
    try {
      const response = await fetch(SummaryApi.setStateOrder.url, {
        method: SummaryApi.setStateOrder.method,
        //credentials: 'include',
        headers: {
          "content-type": 'application/json',
          token: localStorage.getItem("token")
        },
        body: JSON.stringify(
          {
            user: shipper,
            code: order.code,
            state: "shipping"
          }
        )
      })
  
      if (response.status === 200) {
        fetchOrders()
        toast("Đã giao cho shipper");
      }
      else {
        toast("Có lỗi");
      }
      setOpenDialogShipper(false);
    } catch (error) {
      // Xử lý lỗi (ví dụ: thông báo cho người dùng)
    }
    setSelectedRow(order)
    setOpenDialogShipper(false);
  };

  // const handleState = (order) => {
  //   setSelectedRow(order)
  //   setOpenDialogState(true);
  // };

  return (
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
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <>
                              <Tooltip title="Xác nhận đơn hàng">
                                <IconButton aria-label="edit" onClick={() => handleConfirmOrder(row['code'])}>
                                  <CheckIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Chi tiết đơn hàng">
                                <IconButton aria-label="detail" onClick={() => handleDetailOrder(row)}>
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Giao cho shipper">
                                <IconButton aria-label="ship" onClick={() => handleShipper(row)}>
                                  <LocalShippingIcon />
                                </IconButton>
                              </Tooltip>
                              {/* <Tooltip title="Cập nhật tình trạng đơn hàng">
                                <IconButton aria-label="setState" onClick={() => handleState(row)}>
                                  <ChangeCircleIcon />
                                </IconButton>
                              </Tooltip> */}

                            </>
                          ) : column.id === 'detail' ? (
                            <IconButton aria-label="menu">
                              <MenuIcon onClick={() => handleDetailProduct(row["cartProducts"])} />
                            </IconButton>
                          ) : (
                            value
                          )
                          }
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


      <Dialog open={openDialogDetail} onClose={() => setOpenDialogDetail(false)} fullWidth={true} maxWidth="md">
        <DialogTitle>Thông tin sản phẩm</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {selectedOrder && selectedOrder.map((product) => (
              <Card key={product.id} sx={{ minWidth: 345 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={product.product.images.length > 0 ? `${backendDomain}/api/File/image/${product.product.images[0]}` : ''}
                  title={product.product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá tiền: {product.product.price}

                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {product.quantity}

                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogDetail(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogRow} onClose={() => setOpenDialogRow(false)} fullWidth={true} maxWidth="md">
        <DialogTitle>Đơn hàng</DialogTitle>
        <DialogContent>
          <Timeline position="alternate">
            {selectedRow && selectedRow.logs.map((log) => (
              <>
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {log.time}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>Trạng thái: {log.state}</Typography>
                    {log.user !== "" ? <Typography>Shipper: {log.user}</Typography> : <></>}
                    {log.phone !== "" ? <Typography>Số điện thoại: {log.phone}</Typography> : <></>}
                  </TimelineContent>

                </TimelineItem>
              </>
            ))}


          </Timeline>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogRow(false)}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogState} onClose={() => setOpenDialogState(false)} >
        <DialogTitle>Cập nhật tình trạng đơn hàng</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            defaultValue="working"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogState(false)}>Hủy</Button>
          <Button onClick={() => handleSetStateOrder(selectedRow)}>Xác nhận</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialogShipper} onClose={() => setOpenDialogShipper(false)} fullWidth={true} maxWidth="md">
        <DialogTitle>Giao cho shipper</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            defaultValue="working"
            value={selectedShipper}
            onChange={handleChange}
          >
            {shipper.map((option) => (
              <MenuItem key={option.user} value={option.user}>
                {option.displayName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogShipper(false)}>Hủy</Button>
          <Button onClick={() => handleChooseShipper(selectedRow, selectedShipper)}>Xác nhận</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  )
}

export default BoardOrder