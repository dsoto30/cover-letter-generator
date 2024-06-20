import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useAuthService } from "./useAuthService";
import { useDispatch, useSelector } from "react-redux";
import { setError, selectError } from "../../redux/authSlice";

const updateProfileSchema = yup.object().shape({
    originalPassword: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    displayName: yup.string().notRequired(),
    password: yup
        .string()
        .notRequired()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    resume: yup.mixed().notRequired(),
});

export function UpdateProfile() {
    const { updateUserProfile } = useAuthService();
    const navigate = useNavigate();
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const handleSubmit = async ({
        displayName,
        password,
        resume,
        originalPassword,
    }) => {
        try {
            await updateUserProfile({
                displayName,
                password,
                resume,
                originalPassword,
            });
            navigate("/auth/profile");
        } catch (e) {
            dispatch(setError(e.message));
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(setError(null));
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <Container>
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <h1 className="p-2 text-center text-primary font-weight-bold display-3">
                            Update Profile
                        </h1>
                    </Col>
                </Row>
            </Container>

            {error && (
                <Alert
                    variant="danger"
                    onClose={() => dispatch(setError(null))}
                    dismissible
                >
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}

            <Formik
                validationSchema={updateProfileSchema}
                onSubmit={handleSubmit}
                initialValues={{
                    displayName: "",
                    password: "",
                    resume: null,
                    originalPassword: "",
                }}
            >
                {({ setFieldValue }) => (
                    <FormikForm>
                        <Form.Group
                            className="mb-3"
                            controlId="formOriginalPassword"
                        >
                            <Form.Label>Original Password</Form.Label>
                            <Field
                                type="password"
                                name="originalPassword"
                                placeholder="Enter original password"
                                as={Form.Control}
                            />
                            <ErrorMessage
                                name="originalPassword"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formDisplayName"
                        >
                            <Form.Label>Display Name</Form.Label>
                            <Field
                                type="text"
                                name="displayName"
                                placeholder="Enter new display name"
                                as={Form.Control}
                            />
                            <ErrorMessage
                                name="displayName"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                as={Form.Control}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formResume">
                            <Form.Label>Resume</Form.Label>
                            <input
                                type="file"
                                name="resume"
                                className="form-control"
                                onChange={(event) => {
                                    setFieldValue(
                                        "resume",
                                        event.currentTarget.files[0]
                                    );
                                }}
                            />
                            <ErrorMessage
                                name="resume"
                                component="div"
                                className="text-danger"
                            />
                        </Form.Group>
                        <Stack
                            direction="horizontal"
                            className="justify-content-center"
                        >
                            <Button variant="primary" type="submit">
                                {"Update Profile"}
                            </Button>
                        </Stack>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
}
