import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Login from "./Login";
import { useState } from "react";


const LoginPage = () => {
    const [user, setUser] = useState(null);

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return <Box>
        <Box 
            width="100%" 
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
        >
            <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            >
            Run and Ride
            </Typography>
        </Box>
        <Box>
            <Login setUser={setUser}/>
        </Box>
    </Box>

    // TODO: google auth here? how?
};

export default LoginPage;