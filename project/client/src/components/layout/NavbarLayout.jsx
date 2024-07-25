import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

const NavigationBar = () => {
    const user = useSelector(selectUser);

    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Cover GenAI</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link
                        href="https://github.com/dsoto30/cover-letter-generator"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </Nav.Link>
                </Nav>
                <Nav>
                    {user ? (
                        <>
                            <LinkContainer to="/openAI/generate">
                                <Nav.Link>Generate Cover Letter</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/auth/profile">
                                <Nav.Link>Profile</Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/auth/login">
                                <Nav.Link>Sign In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/auth/register">
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
