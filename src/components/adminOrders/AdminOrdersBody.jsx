import Header from "../header/Header"
import Sidebar from "../body/Sidebar"
import Body from "../body/Body"

import { Box } from "@mui/material";
import AdminOrderList from "./AdminOrderList";

const drawerWidth = 240;

export default function AdminOrdersBody() {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                />
                <Body drawerWidth={drawerWidth} content={<AdminOrderList />} />
            </Box>
        </>
    )
}