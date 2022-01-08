import React, {useState} from "react";
import img from './xrp.jpg'
import {
    Container, 
    Row, 
    Accordion,
    ToastContainer,
    Toast
} from 'react-bootstrap'
import {
    Telephone, Envelope, UpcScan,
    People, CashCoin, Controller, Wrench, Fan, 
    Bicycle, FileEasel, Coin, CurrencyDollar, 
    Book, Box, Check2Circle, Clock, HeadsetVr
} from 'react-bootstrap-icons';
import EmailJS from 'emailjs-com';


const Alerts = (props) => {
    console.log("fffff", props)
    return (
        <ToastContainer className="p-3" style={{"position":"absolute"}}>
            <Toast 
            {...props}
            onClose={props.onHide} 
            autohide>
                <Toast.Header>
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">Notification!</strong>
                </Toast.Header>
                <Toast.Body>{props.msg}</Toast.Body>
            </Toast>
      </ToastContainer>
    );
  }

const Content = () => {
    const [alertShow, setAlertShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("info")

    const sendEmail = (e) => {
        e.preventDefault();

        EmailJS.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID)
            .then(function(response) {
                setErrorColor('success');
                setErrorMsg('SUCCESS!', response.status, response.text)
            }, function(err) {
                setErrorColor('warning');
                setErrorMsg('FAILED...', err)
            }
        );
        
        e.target.reset();
        setAlertShow(true);
    }

    return (
        <>
            <section id="home" className="d-flex align-items-center">
                <Container>
                    <h1>Welcome to Micro<span>World</span></h1>
                    <h2>Developed for XRP Ledger where you can earn tokens while playing.</h2>
                    <div className="d-flex">
                        <a href="#about" className="btn-get-started scrollto">Get Started</a>
                    </div>
                </Container>
            </section>

            <main id="main">
                <section id="featured-services" className="featured-services">
                    <Container >
                        <Row>
                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box" >
                                <div className="icon"><i className="bx bxl-dribbble"><HeadsetVr/></i></div>
                                <h4 className="title">Free to Play</h4>
                                <p className="description">Microgame has the option of allowing its users to play without paying.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box"  >
                                <div className="icon"><i className="bx bx-file"><Box/></i></div>
                                <h4 className="title">Play to Earn</h4>
                                <p className="description">Microgame provides its users with a chance to earn in-game tokens and exchange them in DEXX Tool.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box"  >
                                <div className="icon"><i className="bx bx-tachometer"><Clock/></i></div>
                                <h4 className="title">Passive Earning</h4>
                                <p className="description">Microgame allows its users to earn money in a manner that does not require too much effort.</p>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                            <div className="icon-box"  >
                                <div className="icon"><i className="bx bx-world"><Check2Circle/></i></div>
                                <h4 className="title">Easy Game</h4>
                                <p className="description">Microgame gives you an enjoyable game to play and earn at the same time.</p>
                            </div>
                        </div>
                        </Row>
                    </Container>
                </section>
                
                <section id="about" className="about section-bg">
                    <Container >
                        <div className="section-title">
                            <h2>About</h2>
                            <h3>Find Out More <span>About Us</span></h3>
                            <p>Here at MicroWorld Project, we plan to create 2D and 3D microgames where anyone can play them.</p>
                        </div>
                        <Row>
                        <div className="col-lg-6" >
                            <img src={img} className="img-fluid" alt=""></img>
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center"  >
                            <h3></h3>
                            <p className="fst-italic">
                            We saw the fast and strongly growing community of NFTs, Metaverses, and the P2E industry.
                             As we know that XRPL hasn't started releasing the NFT support then we developed a Free-to-earn project in our community to earn tokens.
                            </p>
                            <ul>
                            <li>
                                <i className="bx bx-store-alt"></i>
                                <div>
                                <h5>Earn tokens</h5>
                                <p>You can earn a $XMW token when playing but the amount is not yet discussed since we all have a limited supply.</p>
                                </div>  
                            </li>
                            <li>
                                <i className="bx bx-images"></i>
                                <div>
                                <h5>Game mechanics</h5>
                                <p>You can play the game/s once a day. There is a reset mechanism to know whose users have not yet and done playing. </p>
                                </div>
                            </li>
                            </ul>
                            <p>
                            Stay tuned to our websites and social networks for more news and updates regarding our growing project and community.
                            Just stay and hold $XRP tokens. We will go to the moon sooner just follow the timeline
                            </p>
                        </div>
                        </Row>
                    </Container>
                </section>
                
                 {/* include xrpl */}
                <section id="counts" className="counts">
                    <Container >
                        <Row>
                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i><Coin /></i>
                                <span id="xrplTokens">000</span>
                                <p>Tokens Issued on XRPL</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                            <div className="count-box">
                                <i><People /></i>
                                <span id="xmwTrustline">000</span>
                                <p>$XMW Trustlines</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <i><CurrencyDollar /></i>
                                <span id="xmwPrice">000</span>
                                <p>$XMW Price</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                            <div className="count-box">
                                <i><Book /></i>
                                <span id="xmwBalance">000</span>
                                <p>$XMW Balance</p>
                            </div>
                        </div>

                        </Row>

                    </Container>
                </section>
                
                <section id="services" className="services">
                    <Container >

                        <div className="section-title">
                        <h2>Services</h2>
                        <h3>Check our <span>Services</span></h3>
                        <p>Our projects are planned to develop different microgames here at XRPL.</p>
                        </div>

                        <Row>
                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><FileEasel/></i></div>
                            <h4>2D</h4>
                            <p>Here the player can run, jump, shoot, collect powers on a platform.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><Fan/></i></div>
                            <h4>3D</h4>
                            <p>Interactive game which represented at three-dimensional space. </p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><Bicycle/></i></div>
                            <h4>FPS</h4>
                            <p>Weapon-based combat and controlling the user character in a three-dimensional space.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><Controller/></i></div>
                            <h4>Interaction</h4>
                            <p>Easy game controls using keyboard and screen and user can earn instantly.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><CashCoin/></i></div>
                            <h4>Payment</h4>
                            <p>Send immediately the collected tokens after the game finished.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" >
                            <div className="icon-box">
                            <div className="icon"><i><Wrench/></i></div>
                            <h4>Updates</h4>
                            <p>Updates, corrections, and enhancements of game improves balance.</p>
                            </div>
                        </div>

                        </Row>

                    </Container>
                </section>
                
                <section id="faq" className="faq section-bg">
                    <Container >
                        <div className="section-title">
                            <h2>F.A.Q</h2>
                            <h3>Frequently Asked <span>Questions</span></h3>
                            <p>Gives quick answers to customer questions about MicroWorld</p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <Accordion>
                                    <Accordion.Item eventKey="0" className="item">
                                        <Accordion.Header className="question">What is MicroWorld token?</Accordion.Header>
                                        <Accordion.Body>
                                            The MicroWorld token is XMW.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className="item">
                                        <Accordion.Header className="question">What is total token supply?</Accordion.Header>
                                        <Accordion.Body>
                                            The initially issued token is 10,000,000 XMW. It may change depending on the updates.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className="item">
                                        <Accordion.Header className="question">Do I need to buy an NFT to earn?</Accordion.Header>
                                        <Accordion.Body>
                                            No NFT is needed for us to play.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3" className="item">
                                        <Accordion.Header className="question">How many times I can play the microgames?</Accordion.Header>
                                        <Accordion.Body>
                                            Each user can play the microgame once a day.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4" className="item">
                                        <Accordion.Header className="question">How many microgames are available to play?</Accordion.Header>
                                        <Accordion.Body>
                                            Currently, there is only one microgame, RabbitRun, available but the plan was at least 3-4 games.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="5" className="item">
                                        <Accordion.Header className="question">When moon?</Accordion.Header>
                                        <Accordion.Body>
                                            We go to the moon when XRP goes to the moon!
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>

                    </Container>
                </section>

                <section id="contact" className="contact">
                    <Container >
                        <div className="section-title">
                            <h2>Contact</h2>
                            <h3><span>Contact Us</span></h3>
                            <p>Tell us the things you want</p>
                        </div>
                        <Row>
                            <div className="col-lg-12">
                                <div className="info-box mb-4">
                                <i className="bx bx-map"><UpcScan/></i>
                                <h3>Trustline</h3>
                                <p>
                                    https://xumm.community/?issuer=ra2hRLUM28o9XYEHdyqKvFurXa5EYNqApE&currency=XMW&limit=10000000 <br />
                                    <a href="https://xumm.community/?issuer=ra2hRLUM28o9XYEHdyqKvFurXa5EYNqApE&currency=XMW&limit=10000000">Click Here</a>
                                </p>
                                
                                </div>
                            </div>
                            
                        </Row>
                        <Row  >
                            <div className="col-lg-3 col-md-6">
                                <div className="info-box  mb-4">
                                <i className="bx bx-envelope"><Envelope/></i>
                                <h3>Email Us</h3>
                                <p>contactmicroworld@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="info-box  mb-4">
                                <i className="bx bx-phone-call"><Telephone/></i>
                                <h3>Call Us</h3>
                                <p>+63 915 3421 385</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <form onSubmit={sendEmail} className="php-email-form">
                                <Row>
                                    <div className="col form-group">
                                     <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                    </div>
                                    <div className="col form-group">
                                     <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                    </div>
                                </Row>
                                <div className="form-group">
                                     <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" name="message" rows="3" placeholder="Message" required></textarea>
                                </div>
                                {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">SOON</Tooltip>}> */}
                                    <span className="d-inline-block">
                                    <div className="text-center"><button type="submit">Send Message</button></div>
                                    </span>
                                {/* </OverlayTrigger> */}
                                </form>
                            </div>
                        </Row>
                    </Container>
                </section>
            </main>

            {alertShow && 
            (<Alerts
                show={alertShow}
                bg={errorColor}
                onHide={()=> setAlertShow(false)}
                delay={4000}
                msg={errorMsg}
            />)}
        </>
    );
}

export default Content;