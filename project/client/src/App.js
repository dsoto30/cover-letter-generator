import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

function App() {
    return (
        <>
            <Container>
                <Button variant="primary" onClick={() => alert("Hello World!")}>
                    Hello World!
                </Button>
            </Container>
        </>
    );
}

export default App;
