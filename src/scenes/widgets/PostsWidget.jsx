import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";
import PostWidget from "./PostWidget";
import ActivityDataService from '../../services/activities.js';
import UserDataService from '../../services/users.js';

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [userProfilePics, setUserProfilePics] = useState({});

  const getPosts = async () => {
    try {
      const response = await ActivityDataService.getAll();
      if (Array.isArray(response.data.activities)) {
        const fetchedPosts = response.data.activities;
        fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        dispatch(setPosts({ posts: fetchedPosts }));
        fetchUserProfilePics(fetchedPosts);
      } else {
        dispatch(setPosts({ posts: [] }));
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
      dispatch(setPosts({ posts: [] }));
    }
  };

  const getUserPosts = async () => {
    console.log("Starting getUserPosts function");
  
    try {
      console.log(`Fetching activities for userId: ${userId}`);
      const response = await ActivityDataService.getActivitiesByUserId(userId);
  
      console.log("API response received:", response);
  
      // Handle response.data directly as an array
      if (Array.isArray(response.data)) {
        const fetchedPosts = response.data;
  
        console.log("Fetched posts before sorting:", fetchedPosts);
  
        fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        console.log("Fetched posts after sorting:", fetchedPosts);
  
        dispatch(setPosts({ posts: fetchedPosts }));
        fetchUserProfilePics(fetchedPosts);
      } else {
        console.warn("Response data is not an array. Response data:", response.data);
        dispatch(setPosts({ posts: [] }));
      }
    } catch (error) {
      console.error("Error fetching user posts: ", error);
      dispatch(setPosts({ posts: [] }));
    }
  };

  const fetchUserProfilePics = async (posts) => {
    const userIds = [...new Set(posts.map(post => post.userId))];
    try {
      const userPromises = userIds.map(id => UserDataService.getUser(id));
      const userResponses = await Promise.all(userPromises);
      const profilePics = userResponses.reduce((acc, user) => {
        acc[user.data.userId] = user.data.profilePic;
        return acc;
      }, {});
      setUserProfilePics(profilePics);
    } catch (error) {
      console.error("Error fetching user profile pictures: ", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile]);

  return (
    <>
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        Array.isArray(posts) && posts.map((post, index) => (
          post ? (
            <PostWidget
              key={post._id || `post-${index}`}
              postId={post._id || ''}
              postUserId={post.userId || ''}
              name={`${post.userName || 'Unknown'}`}
              description={post.description || 'No description'}
              distance={post.distance ? `${post.distance}` : 'Unknown distance'}
              activityType={post.activityType || 'Unknown activity'}
              picturePath={post.picturePath || ''}
              userPicturePath={userProfilePics[post.userId] || ''}
              likesList={post.likesList || []}
              comments={post.comments || []}
            />
          ) : (
            <p key={`empty-post-${index}`}>Post data is missing</p>
          )
        ))
      )}
    </>
  );
};

export default PostsWidget;
