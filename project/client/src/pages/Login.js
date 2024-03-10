import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";

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
        setLoginForm({ email: "", password: "" });
    };

    return (
        <Container>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <h1 className="p-2 text-center text-primary font-weight-bold display-3">
                            Welcome Back to Cover Gen!
                        </h1>
                    </Col>
                </Row>
            </Container>

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

                <Stack
                    direction="horizontal"
                    className="justify-content-center"
                >
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}
