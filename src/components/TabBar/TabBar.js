import React from "react";
import Tab from "react-bootstrap/Tab";
import { Col, Nav } from "react-bootstrap";
import { TabBarContent } from "layout/content";
import "./TabBar.css";
import { change } from "configs/redux/Slice/ThemeSlice";
import { useDispatch, useSelector } from "react-redux";

function TabBar() {
  const theme = useSelector((state) => state.LocalTheme.theme);
  const dispatch = useDispatch();

  return (
    <Tab.Container defaultActiveKey="chats">
      <Col sm={1} className="col-sm-1_custom">
        <Nav
          fill
          variant="pills"
          className="flex-column-sm"
          style={{
            backgroundColor: `var(--bs-sidebar-bg)`,
          }}
        >
          <Nav.Item className="nav_item_hide">
            <img
              className="logo"
              src="https://img.icons8.com/material-outlined/96/7269e6/attack-on-titan.png"
              alt="Chats"
            />
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="profile">
              <i className="bi bi-person-circle" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="chats">
              <i className="bi bi-chat-dots" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="group">
              <i className="bi bi-people-fill" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contact">
              <i className="bi bi-person-lines-fill" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="setting">
              <i className="bi bi-gear-fill" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="nav_item_hide">
            <button
              onClick={() => dispatch(change())}
              className="w-100 btn-theme"
              style={{
                textAlign: "center",
              }}
            >
              {theme === "dark" ? (
                <i className="bi bi-sun" />
              ) : (
                <i className="bi bi-moon" />
              )}
            </button>
          </Nav.Item>
          <Nav.Item className="nav_item_hide">
            <img className="img_Avatar" src="/logo192.png" alt="Chats" />
          </Nav.Item>
        </Nav>
      </Col>
      <TabBarContent />
    </Tab.Container>
  );
}

export default TabBar;
