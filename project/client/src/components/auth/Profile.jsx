import React, { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    selectUser,
    selectError,
    setError,
    setLoading,
} from "../../redux/authSlice";
import { useAuthService } from "./useAuthService";
import { useNavigate } from "react-router-dom";
import { fetchResume } from "./fetchResume";

export function Profile() {
    const [resume, setResume] = useState(null);
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);
    const { logoutUser } = useAuthService();
    const error = useSelector(selectError);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const resume = await fetchResume(currentUser.uid);
                setResume(resume);
            } catch (error) {
                dispatch(setError(error.message));
            }
        };
        fetch();
    });

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            dispatch(setError(error.message));
        }
    };

    const update = () => {
        navigate("../update-profile");
    };

    return (
        <Container>
            <h1 className="my-4">Profile</h1>
            {error && (
                <Alert
                    variant="danger"
                    onClose={() => dispatch(setError(null))}
                    dismissible
                >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}
            <Card>
                <Card.Body>
                    <Card.Title>
                        Welcome, {currentUser?.displayName || "User"}!
                    </Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {currentUser?.email}
                    </Card.Text>

                    {resume ? (
                        <Card.Text>
                            <strong>Resume:</strong>{" "}
                            <a
                                href={resume.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Resume
                            </a>
                            <br />
                            <strong>Last updated:</strong>{" "}
                            {new Date(
                                resume.updatedAt.toDate()
                            ).toLocaleString()}
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
                        {/* 
                        <Button variant="info" onClick={update}>
                            Update Profile
                        </Button>*/}
                    </Stack>
                </Card.Body>
            </Card>
        </Container>
    );
}
