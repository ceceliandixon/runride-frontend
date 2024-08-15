import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navBar/index.jsx";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";
import PostsWidget from "../widgets/PostsWidget.jsx";
import UserDataService from '../../services/users.js';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // Extract userId from URL params
  const token = useSelector((state) => state.token); // Extract token from Redux store
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)"); // Check if screen is large

  // Function to fetch user data
  const getUser = async () => {
    console.log('Fetching user with ID:', userId); // Log userId for debugging

    if (!userId) {
      console.error("User ID is not defined"); // Log an error if userId is undefined
      return;
    }

    try {
      const response = await UserDataService.getUser(userId); // Fetch user data from API
      setUser(response.data); // Set user data to state
    } catch (error) {
      console.error("Error fetching user:", error); // Log any errors
    }
  };

  useEffect(() => {
    getUser(); // Call getUser function to fetch user data
  }, [userId]); // Depend on userId to refetch data when it changes

  if (!user) {
    return null; // Render nothing if user data is not available
  }

  const {
    userId: id,
    profilePic,
    userName,
    friendsList
  } = user;

  return (
    <Box>
      <Navbar /> {/* Render the navigation bar */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={profilePic} />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
