import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BoardUser from '../BoardUser/boardUser';
import BoardOrder from '../BoardOrder/BoardOrder';
import BoardGroup from '../BoardConfig/ConfigGroup';
import BoardArea from '../BoardConfig/ConfigArea';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// eslint-disable-next-line react/prop-types
const SlideList = ({ open, setOpen }) => {

    const [openList, setopenList] = useState(false);


    const handleClick = () => {
        setopenList(!openList);
    };
    const navigate = useNavigate()

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={() => { setOpen(false) }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItemButton onClick={() => { navigate("") }} >

                        <ListItemText primary="Trang chủ" />
                    </ListItemButton>
                    <ListItemButton onClick={() => { navigate("order") }}  >
                        <ListItemText primary="Yêu cầu" />
                    </ListItemButton>
                    <ListItemButton onClick={() => { navigate("user") }}>
                        <ListItemText primary="Tài khoản" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Thiết lập" />
                        {openList ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("config/area") }} >
                                <ListItemText primary="Cửa hàng" />
                            </ListItemButton>
                            {localStorage.getItem("role") === "manager" &&
                                <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate("config/group") }}>
                                    <ListItemText primary="Menu" />
                                </ListItemButton>
                            }
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Routes>
                    <Route path='user' element={<BoardUser />} />
                    <Route path='order' element={<BoardOrder />} />
                    <Route path='config/area' element={<BoardArea />} />
                    <Route path='config/group' element={<BoardGroup />} />
                </Routes>
            </Main>
        </>
    )
}

export default SlideList