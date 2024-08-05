import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state/index.js";
import { Box } from "@mui/material";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const fullName = user ? `${user.given_name} ${user.family_name}` : '';

    const onSuccess = (res) => {
        const tokenData = jwt_decode(res.credential);
        const loginData = {
            googleId: tokenData.sub,
            user: tokenData,
            token: res.credential
        };
        dispatch(setLogin(loginData));
        localStorage.setItem("login", JSON.stringify(loginData));
        console.log('Login Success: currentUser', loginData);
        console.log('redux data for user Name:', fullName)
        navigate("/activities");
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