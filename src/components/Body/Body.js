import React from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
function Body({ children }) {
    // @ts-ignore
    const localTheme = useSelector((state) => state.LocalTheme.theme);

    return (
        <Container
            fluid
            data-layout-mode={localTheme}
            style={{
                backgroundColor: "var(--bs-body-bg)",
                color: "var(--bs-body-color)",
                boxSizing: "border-box",
                bottom: 0,
                height: "100vh",
                position: "relative",
                margin: 0,
            }}
        >
            <Row>{children}</Row>
        </Container>
    );
}

export default Body;