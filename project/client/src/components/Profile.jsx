import React from "react";
import { Container, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function Profile() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState();

    const handleLogout = async () => {
        // Implement logout functionality here
        setError("");
        try {
            await logout();
        } catch (error) {
            setError(error.message);
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
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
