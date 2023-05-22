import Header from "../header/Header"
import Sidebar from "./Sidebar"
import Body from "./Body"

import { Box } from "@mui/material";

const drawerWidth = 240;

export default function AdminOrdersBody() {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                />
                <Body drawerWidth={drawerWidth} content={<div>Hello admin</div>} />
            </Box>
        </>
    )
}