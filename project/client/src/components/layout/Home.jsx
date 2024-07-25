import React from "react";
import { Container, Card, Button } from "react-bootstrap";

function Home() {
    return (
        <Container className="mt-5">
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Welcome to Our React App!</Card.Title>
                    <Card.Text>
                        This is a simple hero unit, a simple Jumbotron-style
                        component for calling extra attention to featured
                        content or information.
                    </Card.Text>
                    <Button variant="primary">Learn more</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Home;
