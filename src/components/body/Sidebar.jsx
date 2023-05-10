import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Products from '../../products.json'

const renderDrawer = () => {
  const categories = []
  for (const item of Products) {
    if (!categories.includes(item.category)) {
      categories.push(item.category)
    }
  }

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {categories.map(category => (
          <ListItem key={category} component="a" href={`/#${category}`} sx={{ color: '#000' }} disablePadding>
            <ListItemButton>
              <ListItemText primary={category} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
};

export default function Sidebar(props) {
  const { window, drawerWidth, handleDrawerToggle, mobileOpen } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {renderDrawer()}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}>
        {renderDrawer()}
      </Drawer>
    </Box>
  )
}