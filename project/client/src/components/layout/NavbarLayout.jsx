import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setLoading } from "../../redux/authSlice";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../../redux/authSlice";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(logout());
            await signOut(auth);
            dispatch(setLoading(false));
        } catch (error) {
            console.log(error);
        }
    };

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
                        <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
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
