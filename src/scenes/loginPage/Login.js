import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state/index.js";
import { Box } from "@mui/material";
import UserDataService from "../../services/users.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const fullName = user ? `${user.given_name} ${user.family_name}` : '';

    const onSuccess = async (res) => {
        const tokenData = jwt_decode(res.credential);
        const loginData = {
            googleId: tokenData.sub,
            user: tokenData,
            token: res.credential
        };
        dispatch(setLogin(loginData));
        localStorage.setItem("login", JSON.stringify(loginData));
        // TODO: Check if userid in user database-- if not add data

        try {
            // Check if the user exists in the database
            const response = await UserDataService.getUser(tokenData.sub);
            console.log('User exists:', response.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // If the user doesn't exist, create a new user
                const userData = {
                    userId: tokenData.sub,
                    profilePic: tokenData.picture,
                    userName: `${tokenData.given_name} ${tokenData.family_name}`,
                    friendsList: []
                };
                await UserDataService.createUser(userData);
                console.log('New user added to the backend.');
            } else {
                console.error("Error checking/creating user:", error);
            }
        } finally {
            // Log success and navigate to activities page
            console.log('Login Success: currentUser', loginData);
            navigate("/activities");
        }
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
            <GoogleLogin
                id='login'
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                auto_select={true}
            />
        </Box>
    );
}

export default Login;