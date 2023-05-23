import Header from "../header/Header"
import Sidebar from "../body/Sidebar"
import Body from "../body/Body"

import UserOrderList from "./UserOrderList"
import { Box } from "@mui/material";

const drawerWidth = 240;

export default function UserOrdersBody() {
    return (
        <>
            <Header />
            <Box sx={{ display: 'flex' }}>
                <Sidebar
                    drawerWidth={drawerWidth}
                />
                <Body drawerWidth={drawerWidth} content={<UserOrderList />} />
            </Box>
        </>
    )
}