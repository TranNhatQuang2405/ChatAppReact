import React from "react";
import Logo from "image/logo.png";
import {
    Col,
    Row,
    Card,
    Form,
    InputGroup,
    FormControl,
    FormLabel,
    FormGroup,
    Button,
} from "react-bootstrap";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { change } from "configs/redux/Slice/CurrentPageSlice";
import { Body } from "components";

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = () => {
        dispatch(change(1));
        navigate("/Login");
    };

    return (
        <Body>
            <div className="ResetPassword__account-pages pt-5">
                <Row className="justify-content-center">
                    <Col lg={4} xs={11}>
                        <div className="text-center">
                            <img
                                src={Logo}
                                alt="Logo"
                                style={{ width: 120, height: 100 }}
                            />
                            <h4 className="ResetPassword__title">
                                Reset Password
                            </h4>
                            <p className="text-muted mb-1">
                                Reset Password For Your Account.
                            </p>
                        </div>
                        <Card className="ResetPassword__card mt-2">
                            <Card.Body className="p-4">
                                <div className="p-3">
                                    <div
                                        className="alert alert-success text-center mb-4"
                                        role="alert"
                                    >
                                        Enter your Email and instructions will
                                        be sent to you!
                                    </div>
                                    <Form action="index.html">
                                        <FormGroup className="mb-4">
                                            <FormLabel className="ResetPassword__form-label">
                                                Email
                                            </FormLabel>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text className="bg-light text-muted-bg border-0">
                                                    <i className="bi bi-envelope" />
                                                </InputGroup.Text>
                                                <FormControl
                                                    type="email"
                                                    className="resetPass-text-color"
                                                    placeholder="Enter Email"
                                                    aria-label="Enter Email"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        <div className="d-grid">
                                            <Button
                                                className="resetPass__button "
                                                type="submit"
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>

                        <div className="text-center mt-2">
                            <p>
                                Remember It?
                                <span
                                    className="resetPass__textSignIn ms-1 cur-pointer"
                                    onClick={handleSignIn}
                                >
                                    Sign In
                                </span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Body>
    );
};

export default ResetPassword;