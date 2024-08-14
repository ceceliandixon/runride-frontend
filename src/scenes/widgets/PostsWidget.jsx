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

  // Function to get all posts
  const getPosts = async () => {
    console.log('Fetching all posts...');
    try {
      const response = await ActivityDataService.getAll();
      console.log('Posts fetched:', response.data);
      if (Array.isArray(response.data.activities)) {
        const fetchedPosts = response.data.activities;
        // Ensure date is parsed correctly
        fetchedPosts.forEach(post => {
          console.log('Post date:', post.date);
        });
        // Sort posts by date in descending order
        fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('Posts sorted:', fetchedPosts);
        dispatch(setPosts({ posts: fetchedPosts }));
        fetchUserProfilePics(fetchedPosts);
      } else {
        console.error('Expected an array of posts, but got:', response.data);
        dispatch(setPosts({ posts: [] }));
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
      dispatch(setPosts({ posts: [] })); // Set empty array on error
    }
  };

  // Function to get user posts
  const getUserPosts = async () => {
    console.log('Fetching posts for user ID:', userId);
    try {
      const response = await ActivityDataService.getByUserId(userId);
      console.log('User posts fetched:', response.data);
      if (Array.isArray(response.data.activities)) {
        const fetchedPosts = response.data.activities;
        // Ensure date is parsed correctly
        fetchedPosts.forEach(post => {
          console.log('Post date:', post.date);
        });
        // Sort posts by date in descending order
        fetchedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log('User posts sorted:', fetchedPosts);
        dispatch(setPosts({ posts: fetchedPosts }));
        fetchUserProfilePics(fetchedPosts);
      } else {
        console.error('Expected an array of posts, but got:', response.data);
        dispatch(setPosts({ posts: [] }));
      }
    } catch (error) {
      console.error("Error fetching user posts: ", error);
      dispatch(setPosts({ posts: [] })); // Set empty array on error
    }
  };

  // Function to fetch profile pictures for users in posts
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
    console.log('Effect triggered. isProfile:', isProfile, 'userId:', userId);
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile]); // Dependencies ensure effect runs when these change

  return (
    <>
      {Array.isArray(posts) && posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        Array.isArray(posts) && posts.map((post, index) => (
          post ? (
            <PostWidget
              key={post._id || `post-${index}`} // Use index as fallback key
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

