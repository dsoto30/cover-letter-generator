import React, { useState } from "react";
import { Container, Card, Button, Alert, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoading } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { logout } from "../redux/authSlice";

export function Profile() {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
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
        <Container>
            <h1 className="my-4">Profile</h1>
            {error && (
                <Alert
                    variant="danger"
                    onClose={() => setError(null)}
                    dismissible
                >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}
            <Card>
                <Card.Body>
                    <Card.Title>
                        Welcome, {currentUser.displayName || "User"}!
                    </Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {currentUser.email}
                    </Card.Text>
                    {/* You can add more user information here */}
                    <Stack
                        direction="horizontal"
                        className="justify-content-between"
                    >
                        <Button variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button variant="info">Update Profile</Button>
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    );
}
