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
