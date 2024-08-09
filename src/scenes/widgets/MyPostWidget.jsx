import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Description
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";
import UserDataService from '../../services/users.js';
import ActivityDataService from '../../services/activities.js';


const MyPostWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null); // how to grab user 
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [distance, setDistance] = useState(""); // New state for distance
  const [activityType, setActivityType] = useState(""); // New state for dropdown selection
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

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

  const formDataToObject = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("userName", userName);
    formData.append("description", post);
    formData.append("distance", distance);
    formData.append("activityType", activityType);

    if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
    }

    // Log the FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    const data = formDataToObject(formData);


    try {
        const response = await ActivityDataService.createActivity(data);
        const posts = response.data;
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
        setDistance("");
        setActivityType("");
    } catch (error) {
        console.error("Error posting activity:", error);
    }
};

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={profilePic} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

        {/* Container for distance and activity type */}
        <Box
        display="flex"
        gap="1rem" // Space between the two fields
        mt="1rem"
      >
        {/* Distance Text Box */}
        <InputBase
          placeholder="Distance"
          onChange={(e) => setDistance(e.target.value)}
          value={distance}
          sx={{
            flex: 1, // Grow to fill available space
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />

        {/* Dropdown for activity type */}
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Activity Type</InputLabel>
          <Select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            label="Activity Type"
          >
            <MenuItem value="ride">Ride</MenuItem>
            <MenuItem value="run">Run</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;