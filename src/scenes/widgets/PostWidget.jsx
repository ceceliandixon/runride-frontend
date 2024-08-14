import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index.js";
import ActivityDataService from '../../services/activities.js';

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
  comments = [],
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.userId);
  const likeCount = Array.isArray(likesList) ? likesList.length : 0;

  const user = useSelector((state) => state.user);
  const { sub: userId } = user;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    console.log('likesList:', likesList);
    console.log('loggedInUserId:', userId);
    
    if (Array.isArray(likesList)) {
      const userHasLiked = likesList.includes(userId);
      console.log('User has liked:', userHasLiked);
      setIsLiked(userHasLiked);
    } else {
      console.error('likesList is not an array:', likesList);
    }
  }, [likesList, userId]);

  const patchLike = async () => {
    try {
      console.log('Sending like request...');
      console.log('Post ID:', postId);
      console.log('Logged-in User ID:', userId);
  
      const response = await ActivityDataService.addLike(postId, userId); // Use ActivityDataService
  
      console.log('Response received from server:', response);
      // Update post state with the response data if needed
      dispatch(setPost({ post: response.data }));
      // Toggle local like status
      setIsLiked(!isLiked); 
  
    } catch (error) {
      console.error("Error liking post:", error);
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
          src={`http://localhost:5001/assets/${picturePath}`}
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

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
