import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export function Profile() {
    const location = useLocation();
    const { state } = location;
    const { email, password, jwtToken } = state || {};
    return (
        <Container>
            <h1>Profile Information</h1>
            <ul>
                <li>Email: {email}</li>
                <li>Password: {password}</li>
                <li>Resume file name: {"my-resume.pdf"}</li>
                <li>Token: {jwtToken}</li>
            </ul>
        </Container>
    );
}
