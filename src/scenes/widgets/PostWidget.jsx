import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutline
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";
import ActivityDataService from '../../services/activities.js';
import UserDataService from '../../services/users.js';

const PostWidget = ({
  postId = '',
  postUserId = '',
  name = 'Unknown',
  description = 'No description',
  distance = 'Unknown distance',
  activityType = 'Unknown activity',
  picturePath = '',
  userPicturePath = '',
  likesList = [], // Default to an empty array
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const likeCount = Array.isArray(likesList) ? likesList.length : 0;

  const user = useSelector((state) => state.user);
  const { sub: userId } = user;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    if (Array.isArray(likesList)) {
      const userHasLiked = likesList.includes(userId);
      setIsLiked(userHasLiked);
    } else {
      console.error('likesList is not an array:', likesList);
    }
  }, [likesList, userId]);

  const patchLike = async () => {
    try {
      const response = await ActivityDataService.addLike(postId, userId); // Use ActivityDataService
      dispatch(setPost({ post: response.data }));
      setIsLiked(!isLiked);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const deletePost = async () => {
    console.log('Activity Id:', postId);
    console.log('User Id:', userId);
    try {
      await ActivityDataService.deleteActivity(postId, userId); // Ensure this method matches your backend
      //dispatch(removePost(postId));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={`${distance} mile ${activityType}`}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={``} // Update source if necessary
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* Conditionally render DeleteOutline icon */}
        {userId === postUserId && (
          <IconButton onClick={deletePost}>
            <DeleteOutline />
          </IconButton>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
