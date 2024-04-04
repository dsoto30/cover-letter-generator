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
    resume: yup
        .mixed()
        .required("Resume is required")
        .test("fileType", "Only PDF files are allowed", (value) => {
            // Check if the uploaded file is a PDF
            if (!value) return true; // Return true if no file is uploaded
            return value && value.type === "application/pdf";
        }),
});

export function Register() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (
        { email, password, resume },
        { setSubmitting }
    ) => {
        try {
            setSubmitting(true);
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setSubmitting(false);
            console.log(user);
            const jwtToken = await user.getIdToken();
            navigate("../../home/profile", {
                state: { email, password, jwtToken },
            });
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
                                name="resume"
                                onChange={(event) => {
                                    setFieldValue(
                                        "resume",
                                        event.currentTarget.files[0]
                                    );
                                }}
                            />
                            {/* Display error message for resume field */}
                            {errors.resume &&
                                errors.resume.type === "fileType" && (
                                    <div className="text-danger">
                                        {errors.resume.message}
                                    </div>
                                )}
                            {errors.resume && !errors.resume.type && (
                                <div className="text-danger">
                                    {errors.resume}
                                </div>
                            )}
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
