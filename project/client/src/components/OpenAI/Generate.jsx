import React, { useState, useContext, useEffect, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import { getDownloadURLFromStorage } from "../auth/storageHelper";
import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import Loading from "../layout/Loading";

function Generate() {
    const { currentUser } = useContext(AuthContext);
    const [openAIResponse, setOpenAIResponse] = useState("");
    const [jobPosting, setJobPosting] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchResume = useCallback(async () => {
        const url = await getDownloadURLFromStorage(currentUser.user.email);
        setUrl(url);
    }, []);

    useEffect(() => {
        fetchResume();
    }, []);

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

        const prompt = `Please generate a Cover letter for the following job posting: ${jobPosting} and the following resume: ${text}`;

        const response = await fetch(
            "http://127.0.0.1:5001/covergenai-1b4e3/us-central1/api/getOpenAIResponse",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            }
        );
        setOpenAIResponse(await response.text());

        setLoading(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formJobPosting">
                    <Form.Label>Job Posting Details</Form.Label>
                    <Form.Control
                        type="text-area"
                        placeholder="Enter Job Posting Details"
                        rows="3"
                        onChange={(event) => setJobPosting(event.target.value)}
                        value={jobPosting}
                    />
                    <Form.Text className="text-muted">
                        {" "}
                        Please enter key information, compnay name, skills
                        needed, roles and responsibilities
                    </Form.Text>
                </Form.Group>
            </Form>
            {openAIResponse && (
                <div>
                    <h3>OpenAI Response</h3>
                    <p>{openAIResponse}</p>
                </div>
            )}

            <Button variant="primary" onClick={handleSubmit}>
                Generate
            </Button>
        </>
    );
}

export default Generate;
