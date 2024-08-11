import React, { useEffect, useContext, useCallback, useState } from "react";
import { Container, Card, Button, Alert, Stack } from "react-bootstrap";

import { getDownloadURLFromStorage, uploadResume } from "./storageHelper";
import { AuthContext } from "../auth/AuthContext";

export function Profile() {
    const [url, setUrl] = useState("");
    const {
        currentUser: user,
        logout,
        authMethod,
        authError,
        setAuthError,
    } = useContext(AuthContext);

    const fetchResume = useCallback(async () => {
        const url = await getDownloadURLFromStorage(user.user.email);
        setUrl(url);
    }, []);

    useEffect(() => {
        if (authMethod === "login" && user.user) {
            fetchResume();
        }
    }, [authMethod, user.user]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">Profile</h1>
            {authError && (
                <Alert
                    variant="danger"
                    onClose={() => setAuthError("")}
                    dismissible
                >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{authError}</p>
                </Alert>
            )}
            <Card>
                <Card.Body>
                    <Card.Title>
                        Welcome, {user.user?.displayName || "User"}!
                    </Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {user.user?.email}
                    </Card.Text>

                    {url ? (
                        <Card.Text>
                            <strong>Resume:</strong>{" "}
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </a>
                        </Card.Text>
                    ) : (
                        <Card.Text>No resume uploaded.</Card.Text>
                    )}
                    <Stack
                        direction="horizontal"
                        className="justify-content-between"
                    >
                        <Button variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    );
}
