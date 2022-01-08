import React, {useState, useEffect, Component} from "react";
import {
    Nav, 
    Navbar, 
    NavDropdown, 
    Badge, 
    Container, 
    Modal,
    Button,
    ToastContainer,
    Toast,
    Form
} from 'react-bootstrap'

import {
    PersonWorkspace
} from 'react-bootstrap-icons'


const Alert = (props) => {
    return (
        <ToastContainer position="top-end" className="p-3" >
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

const Header = (props) => {
    const [ledgerInstance, setLedger] = useState(props.events.ledger);
    const [modalShow, setModalShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [textAddress, setTextAddress] = useState(null);
    const [buttonHide, setButtonHide] = useState(null);
    const [xrpAddress, setXrpAddress] = useState("");
    const [hideGames, setHideGame] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorColor, setErrorColor] = useState("info")

    useEffect(() => {
        if (submitted && xrpAddress !== "") {
           if (ledgerInstance.isValidAddress(xrpAddress)) {
                const image = (
                    <NavDropdown title={<PersonWorkspace />}>
                        <NavDropdown.Item>
                            <p style={{fontSize:"14px"}}>{xrpAddress}</p>
                        </NavDropdown.Item>
                    </NavDropdown>
                );
                setTextAddress(image);
                setButtonHide(null);
                setHideGame("navLink");

                setAlertShow(true);
                setErrorColor("info");
                setErrorMsg( "Address is valid!");  

                localStorage.setItem('xrpAddress', xrpAddress);
           } else {
                setAlertShow(true);
                setErrorColor("warning");
                setErrorMsg( "Address `" + xrpAddress+ "` is not valid");
           }
        }

        if (!submitted && xrpAddress === "") {
            const image = (
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Sign in
                </Button>
            );
            setButtonHide(image);
            setTextAddress(null);
            setHideGame("navLink disabled")
        }
    }, [xrpAddress, ledgerInstance, submitted, props.events]);    

    return (
        <>
         <Navbar bg="light" variant="light" expand="lg" fixed="top" id="nav">
            <Container className="px-lg-3">
                <Navbar.Brand className="navName" href="#!">Micro<span>World</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                <Nav className="ms-auto mb-2 mb-lg-0">
                    <Nav.Link className="navLink" href="#home">Home</Nav.Link>
                    <Nav.Link className="navLink" href="#about">About</Nav.Link>
                    <Nav.Link className="navLink" href="#services">Services</Nav.Link>
                    <Nav.Link className="navLink" href="#contact">Contact</Nav.Link>
                    <NavDropdown className="navLink" title="Others" id="basic-nav-dropdown">
                        <NavDropdown.Item className="navLink" disabled href="#action/3.2">Whitepaper <Badge bg="secondary">Soon</Badge></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className={hideGames} href="/RabbitRun">Rabbit Run <Badge bg="secondary">Development</Badge></NavDropdown.Item>
                        <NavDropdown.Item className={hideGames} href="#">2D - 2 <Badge bg="secondary">Soon</Badge></NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className={hideGames} href="#">3D - 1 <Badge bg="secondary">Soon</Badge></NavDropdown.Item>
                        <NavDropdown.Item className={hideGames} href="#">3D - 2 <Badge bg="secondary">Soon</Badge></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                {buttonHide}
                {textAddress}
                <Button className="mx-1" variant="success" 
                onClick={()=> window.open("https://gleam.io/0MJQU/micro-world-airdrop-listing", "_blank")}>
                    Airdrop Listing
                </Button>
                {modalShow &&
                (<ModalForm
                    show={modalShow}
                    onHide={() => {
                        setSubmitted(true);
                        setModalShow(false);
                    }}
                    handleSubmit={id => setXrpAddress(id)}
                />) }
                {alertShow && (<Alert
                    show={alertShow}
                    bg={errorColor}
                    onHide={()=> setAlertShow(false)}
                    delay={3000}
                    msg={errorMsg}
                />)}
            </Container>
        </Navbar>
        </>
    );
}


class ModalForm extends Component {

    state={ address: null }
  
    handleChange = (e) => this.setState({address: e.target.value})
    handleSubmit = () => {
        this.props.handleSubmit(this.state.address);
        this.props.onHide();
    }
  
    render(){
      return(
        <Modal 
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>MicroWorld</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >
                    <Form.Label>XRP Address: </Form.Label>
                    <Form.Control type="text" onChange={this.handleChange} placeholder="Enter XRP Address"/>           
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
      )
    }
}


export default Header;