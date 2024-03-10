import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/esm/Stack";

export function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const handleEmailChange = (e) => {
        setLoginForm({
            ...loginForm,
            email: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setLoginForm({ ...loginForm, password: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm);
    };

    return (
        <Container className="align-items-center">
            <Row className="align-items-center">
                <Col>
                    <h1>Login</h1>
                </Col>
            </Row>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={loginForm.email}
                        onChange={handleEmailChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </Container>
    );
}
