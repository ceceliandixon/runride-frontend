import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navBar/index.jsx"; 
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import FriendListWidget from "../widgets/FriendListWidget.jsx";

const HomePage = () => {
   // const user = useSelector((state) => state.user);
   const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
   // Accessing user data from the Redux store
   const user = useSelector((state) => state.user);

   // Destructuring properties from user data
   const { picture, sub: userId} = user;

   console.log("User data:", user);
   console.log("Picture URL:", picture);
   console.log("User ID:", userId);
  
  
   // const fullName = user ? `${user.given_name} ${user.family_name}` : '';
   
    // Now you can use the `user` variable in your component
    return (
        <Box>
            <Navbar />
            <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <UserWidget userId={userId} />
                </Box>
                <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
                >
                <MyPostWidget userId={userId} />
                <PostsWidget userId={userId} />
                </Box>
                {isNonMobileScreens && (
                <Box flexBasis="26%">
                    <Box m="2rem 0" />
                </Box>
                )}
            </Box>
        </Box>
        
    );
};

//<div>
            //{user ? <h1>Hello, {fullName} </h1> : <h1>Welcome!</h1>}
       // </div>

export default HomePage;