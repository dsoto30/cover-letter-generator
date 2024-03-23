import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Alert,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { Form as FormikForm, Formik, Field, ErrorMessage } from "formik";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid Email Format")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

export function Login() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async ({ email, password }, { setSubmitting }) => {
        try {
            setSubmitting(false);
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user);
            const jwtToken = await user.getIdToken();
            console.log(jwtToken);
            navigate("../../home");
        } catch (error) {
            setError(error.message);
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

            <Formik
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    email: "",
                    password: "",
                }}
            >
                {({ isSubmitting }) => (
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
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Log In"}
                            </Button>
                        </Stack>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
}
