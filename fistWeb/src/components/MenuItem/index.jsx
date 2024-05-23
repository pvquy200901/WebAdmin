import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function NestedMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ width: '300px', height: "100vh", bgcolor: 'primary.main' }}>
      {/* <nav aria-label="main mailbox folders">
        <List>
          <ListItemButton>
            <ListItemText primary="Trang chủ" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Yêu cầu" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Tài khoản" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Thiết lập" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Cửa hàng" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </nav> */}
    </Box>
  );
}
