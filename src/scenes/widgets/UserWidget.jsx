import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from '../../services/users.js';

// Widget with user info on left of screen
const UserWidget = ({ userId}) => {
    const [user, setUser] = useState(null); // how to grab user 
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        try {
            const response = await UserDataService.getUser(userId);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUser();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
      if (!user) {
        return null;
      }
    
      const {
        userId: id,
        profilePic,
        userName,
        friendsList
      } = user;


      return (
        <WidgetWrapper>
          <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <FlexBetween gap="1rem">
              <UserImage image={profilePic} />
              <Box>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: palette.primary.light,
                      cursor: "pointer",
                    },
                  }}
                >
                  {userName}
                </Typography>
                <Typography color={medium}>{friendsList.length} friends</Typography>
              </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
          </FlexBetween>
        </WidgetWrapper>
      );
    };
    
    export default UserWidget;