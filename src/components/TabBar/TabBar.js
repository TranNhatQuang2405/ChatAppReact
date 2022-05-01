import React from "react";
import Tab from "react-bootstrap/Tab";
import { Row, Col, Nav } from "react-bootstrap";
function TabBar() {
    return (
        <Tab.Container defaultActiveKey="first">
            <Row>
                <Col sm={1}>
                    <Nav variant="pills" className="flex-column-sm">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">1 nef</Tab.Pane>
                        <Tab.Pane eventKey="second">2 nef</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default TabBar;