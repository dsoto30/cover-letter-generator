import React, { useContext, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Form as FormikForm, Formik, Field, ErrorMessage } from "formik";
import { AuthContext } from "../auth/AuthContext";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid Email Format")
        .required("Email is required"),
    password: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
});

export function Login() {
    const { login, authError, setAuthError } = useContext(AuthContext);

    const handleSubmit = async ({ email, password }) => {
        try {
            await login(email, password);
        } catch (error) {
            console.error(error);
        }
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

            {authError && (
                <Alert
                    variant="danger"
                    onClose={() => setAuthError("")}
                    dismissible
                >
                    {authError}
                </Alert>
            )}

            <Formik
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    email: "",
                    password: "",
                }}
            >
                {() => (
                    <FormikForm>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                as={Form.Control}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                as={Form.Control}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>

                        <p>
                            Don't have an account? Please register{" "}
                            <Link to="../register">here</Link>
                        </p>

                        <Stack
                            direction="horizontal"
                            className="justify-content-center"
                        >
                            <Button variant="primary" type="submit">
                                {"Log In"}
                            </Button>
                        </Stack>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
}
