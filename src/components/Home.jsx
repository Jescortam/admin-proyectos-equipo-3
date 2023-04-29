import * as React from 'react';
import Header from './header/Header'
import Sidebar from './body/Sidebar';
import Body from './body/Body'
import { Box } from '@mui/system';
import ItemList from './body/ItemList';

const drawerWidth = 240;

function Home() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Body drawerWidth={drawerWidth} content={<ItemList />} />
      </Box>
    </>
  )
}

export default Home
