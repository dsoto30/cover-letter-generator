import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "./AuthContext";

export function Profile() {
    const { user } = useAuth();
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                if (user) {
                    /* 
                    const response = await fetch(
                        "http://localhost:3500/users/profile"
                    );*/
                }
            } catch (error) {}
        };
    }, [user]);

    return (
        <Container>
            <h1>User Information</h1>
            {user ? (
                <ul>
                    <li>Email: {user.email}</li>
                    {/* Displaying password is not recommended for security reasons */}
                </ul>
            ) : (
                <p>No user information available.</p>
            )}
        </Container>
    );
}
