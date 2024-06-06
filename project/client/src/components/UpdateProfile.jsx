import React, { useRef, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
    const displayNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const {
        currentUser,
        /*updateDisplayName,*/
        updateUserEmail,
        updateUserPassword,
    } = useAuth();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function headToProfile() {
        navigate("/auth/profile");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError("Passwords do not match");
        }

        const promises = [];
        setError("");
        setLoading(true);

        /*

        if (displayNameRef.current.value !== currentUser.displayName) {
            promises.push(updateDisplayName(displayNameRef.current.value));
        }*/

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(emailRef.current.value));
        }
        /*
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(passwordRef.current.value));
        }*/

        try {
            await Promise.all(promises);
            setLoading(false);
            navigate("/auth/profile");
        } catch (error) {
            setError("Failed to update profile");
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="displayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={displayNameRef}
                                    defaultValue={currentUser.displayName}
                                />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    ref={emailRef}
                                    defaultValue={currentUser.email}
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={passwordRef}
                                    placeholder="Leave blank to keep the same"
                                />
                            </Form.Group>
                            <Form.Group id="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    ref={confirmPasswordRef}
                                    placeholder="Leave blank to keep the same"
                                />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button
                                    disabled={loading}
                                    className="w-100 mt-3"
                                    type="submit"
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={headToProfile}
                                    className="w-100 mt-2"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
}

export default UpdateProfile;
