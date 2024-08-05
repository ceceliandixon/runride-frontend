import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navBar/index.jsx"; 

const HomePage = () => {
   // const user = useSelector((state) => state.user);

   // const fullName = user ? `${user.given_name} ${user.family_name}` : '';
   
    // Now you can use the `user` variable in your component
    return (
        <Box>
            <Navbar />
        </Box>
        //<div>
            //{user ? <h1>Hello, {fullName} </h1> : <h1>Welcome!</h1>}
       // </div>
    );
};

export default HomePage;