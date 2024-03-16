import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";

export function Register() {
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
        <Stack className="align-items-center mt-3" gap={3}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={loginForm.email}
                        onChange={handleEmailChange}
                    />
                    <Form.Text className="text-muted">
                        Please enter a valid email...
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={handlePasswordChange}
                    />
                    <Form.Text className="text-muted">
                        Password must be 8 characters long. Must include a
                        number, an uppercase character and 1 special character
                    </Form.Text>
                </Form.Group>
                <Row className="align-center">
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Row>
            </Form>
        </Stack>
    );
}
