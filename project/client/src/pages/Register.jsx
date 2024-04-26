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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "./AuthContext";

const registrationSchema = yup.object().shape({
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
    resume: yup.mixed().required("resume is required"),
});

export function Register() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (
        { email, password, resume },
        { setSubmitting }
    ) => {
        try {
            setSubmitting(true);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const { user } = userCredential;

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("resume", resume);

            await fetch("http://localhost:3500/users/create", {
                method: "POST",
                body: formData,
            });

            login(user);
            setSubmitting(false);
            navigate("../profile");
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
                            Registration
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
                validationSchema={registrationSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    email: "",
                    password: "",
                    resume: null,
                }}
            >
                {({ isSubmitting, setFieldValue, errors }) => (
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

                        <Form.Group className="mb-3" controlId="formResume">
                            <Form.Label>Upload Resume</Form.Label>
                            <Form.Control
                                type="file"
                                accept="application/pdf"
                                name="resume"
                                onChange={(event) => {
                                    setFieldValue(
                                        "resume",
                                        event.currentTarget.files[0]
                                    );
                                }}
                            />
                            {/* Display error message for resume field */}

                            {/*errors.resume && !errors.resume.type && (
                                <div className="text-danger">
                                    {errors.resume.message}
                                </div>
                            )*/}
                        </Form.Group>

                        <p>
                            Already have an account? Please login{" "}
                            <Link to="../login">here</Link>
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
                                {isSubmitting
                                    ? "Registering user..."
                                    : "Register"}
                            </Button>
                        </Stack>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
}
