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
//import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form as FormikForm, Formik, Field, ErrorMessage } from "formik";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid Email Format")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

export function Login() {
    const [error, setError] = useState(null);
    //const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(false);
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
                    <Alert.Heading>Incorrect Email or Password</Alert.Heading>
                    <p>Email or password was incorrect please try again.</p>
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
