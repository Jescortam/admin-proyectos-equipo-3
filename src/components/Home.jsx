import * as React from 'react';
import Header from './header/Header'
import Sidebar from './body/Sidebar';
import Body from './body/Body'
import { Box } from '@mui/system';
import ItemList from './body/ItemList';

const drawerWidth = 240;

function Home() {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar drawerWidth={drawerWidth} />
        <Body drawerWidth={drawerWidth} content={<ItemList />} />
      </Box>
    </>
  )
}

export default Home
