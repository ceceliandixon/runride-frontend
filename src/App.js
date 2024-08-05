/*
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";

import ActivitiesList from "./components/ActivitiesList";
import Activity from "./components/Activity";

import './App.css';

function App() {
  return (
      <div className="App">
        <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
          <Container className="container-fluid">
            <Navbar.Brand href="/">
              <img src="/images/runride_logo.svg" alt="runride logo" className="runrideLogo"/>
                RUN RIDE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/activities">
                  Activity Feed
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route exact path="/" element={
            <ActivitiesList />}
          />
          <Route exact path="/activities" element={
            <ActivitiesList />}
          />
          <Route path="/activities/:id" element={
            <Activity />}
          />
        </Routes>
      </div>
  );
}

export default App;
*/

import { BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/homePage';
import ProfilePage from './scenes/profilePage';
import PostPage from './scenes/postPage';
import LoginPage from './scenes/loginPage';
import { useMemo } from "react";
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider, getFormControlLabelUtilityClasses} from "@mui/material";
import { createMuiTheme, createTheme } from "@mui/material/styles";
import { themeSettings } from './theme';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
  <GoogleOAuthProvider clientId={clientId}>
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/activities" element={<HomePage />} />
            <Route path="/activities/:id" element={<PostPage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  </GoogleOAuthProvider >
  );
}

export default App;