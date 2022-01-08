import React from "react";
import {
    Container, 
    Row, 
    Tooltip, 
    OverlayTrigger 
} from 'react-bootstrap'

import {
    ChevronRight,
    Facebook, 
    Twitter, 
    Instagram, 
    Telegram, 
    Discord
} from 'react-bootstrap-icons';

const Footer = () => {
    return (
        <>
            <footer id="footer">
                <div className="footer-top">
                <Container>
                    <Row>
                    <div className="col-lg-4 col-md-6 footer-contact">
                        <h3>Micro<span>World</span></h3>
                        <p> 
                            Pioneer St, Mandaluyong, 1550<br></br>
                            Metro Manila, Philippines <br></br><br></br>
                            <strong>Phone:</strong> +63 915 3421 385<br></br>
                            <strong>Email:</strong> contactmicroworld@gmail.com<br></br>
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><i><ChevronRight /></i><a href="#home">Home</a></li>
                            <li><i><ChevronRight /></i><a href="#about">About us</a></li>
                            <li><i><ChevronRight /></i><a href="#services">Services</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 footer-links">
                        <h4>Our Social Networks</h4>
                        <p>Follow us to get updates</p>
                        <div className="social-links mt-3">
                        <a href="https://twitter.com/MicroWorldGame" className="twitter"><i className="bx bxl-twitter"><Twitter/></i></a>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SOON</Tooltip>}>
                            <span className="d-inline-block">
                                <a href="#" style={{ pointerEvents: 'none' }}><i><Facebook/></i></a>
                            </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SOON</Tooltip>}>
                            <span className="d-inline-block">
                            <a href="#" style={{ pointerEvents: 'none' }}><i><Instagram/></i></a>
                        </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SOON</Tooltip>}>
                            <span className="d-inline-block">
                                <a href="#" style={{ pointerEvents: 'none' }}><i><Discord/></i></a>
                            </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SOON</Tooltip>}>
                            <span className="d-inline-block">
                                <a href="#" style={{ pointerEvents: 'none' }}><i><Telegram/></i></a>
                            </span>
                        </OverlayTrigger>
                        </div>
                    </div>
                    </Row>
                </Container>
                </div>

                <div className="container py-4">
                    <div className="copyright">
                        &copy; Copyright <strong><span>MicroWorld</span></strong>. All Rights Reserved
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;