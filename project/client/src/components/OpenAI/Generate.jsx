import React, { useState, useContext, useEffect, useCallback } from "react";
import {
    Button,
    Form,
    Container,
    Row,
    Col,
    Card,
    Spinner,
} from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import { getDownloadURLFromStorage } from "../auth/storageHelper";
import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import Loading from "../layout/Loading";

function Generate() {
    const { currentUser } = useContext(AuthContext);
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [jobPosting, setJobPosting] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchResume = useCallback(async () => {
        const url = await getDownloadURLFromStorage(currentUser.user.email);
        setUrl(url);
    }, [currentUser.user.email]);

    useEffect(() => {
        fetchResume();
    }, [fetchResume]);

    const extractTextFromPDF = async (url) => {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const numPages = pdf.numPages;
        let text = "";
        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items
                .map((item) => item.str)
                .join(" ")
                .trim();
        }

        return text;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!jobPosting) {
            return;
        }

        setLoading(true);

        const text = await extractTextFromPDF(url);

        const prompt = `Please generate a Cover letter for the following jobt title: ${jobTitle} and for the job posting: ${jobPosting} and the following resume: ${text}, please include only the paragraph of the cover letter and nothing else.`;

        const response = await fetch(
            `${REACT_APP_FUNCTIONS_URL}/getOpenAIResponse`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        setOpenAIResponse(data.response);

        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-4">
                                Generate Cover Letter
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    className="mb-4"
                                    controlId="formJobTitle"
                                >
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Job Title"
                                        onChange={(event) =>
                                            setJobTitle(event.target.value)
                                        }
                                        value={jobTitle}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="mb-4"
                                    controlId="formJobPosting"
                                >
                                    <Form.Label>Job Posting Details</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter Job Posting Details"
                                        rows={6}
                                        onChange={(event) =>
                                            setJobPosting(event.target.value)
                                        }
                                        value={jobPosting}
                                    />
                                    <Form.Text className="text-muted">
                                        Please enter key information, company
                                        name, skills needed, roles, and
                                        responsibilities.
                                    </Form.Text>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                        />
                                    ) : (
                                        "Generate"
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {openAIResponse && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>Generated Cover Letter</Card.Title>
                                <div style={{ whiteSpace: "pre-wrap" }}>
                                    {openAIResponse}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Generate;
