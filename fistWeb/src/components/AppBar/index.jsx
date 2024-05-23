// MenuAppBar.jsx
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import NestedMenu from '../MenuItem'; // Import the MenuItems component
import BoadContent from '../../pages/Board/BoardContent';


export default function MenuAppBar() {

const [menuOpen, setMenuOpen] = useState(true);

const navigate = useNavigate()

  const handleMenuIconClick = () => {
    setMenuOpen(!menuOpen); // Toggle trạng thái của menu
  };
  const clean = () => {

    localStorage.clear()
    navigate("/login")
}

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == null) {
        navigate("/login")
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height:"50px", display:"flex", justifyContent:"center"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuIconClick}
          >
            <MenuIcon />
          </IconButton>
         
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
       <BoadContent props = {menuOpen}/>
       <button onClick={clean}>Clean</button>
    </Box> 
  );
}
