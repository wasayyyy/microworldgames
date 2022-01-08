import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Form,
  Button,
  ToastContainer,
  Toast
} from 'react-bootstrap';

const StartPage = (props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [xrpAddress, setXrpAddress] = useState(localStorage.xrpAddress);
  const [showInputAddress, setShowInputAddress] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorColor, setErrorColor] = useState("info")
  const [once, setOnce] = useState(true);

  const validateAddress = () => {
    if (xrpAddress) {
      return props.ledger.isValidAddress(xrpAddress);
    }

    return false;
  }

  const setValidateValue = () => {
    setValidated(validateAddress());
  }

  const redirectToPage = () => {
    setTimeout(() => {
      navigate(localStorage.href);
    }, 3000);
  };

  useEffect(() => {
    if (submitted) {
      setValidateValue();

      if (validated) {
        setShowInputAddress(false);
        localStorage.xrpAddress = xrpAddress;
        setAlertShow(true);
        setErrorColor("info");
        setErrorMsg( "Address is valid will redirect to page");
        
          redirectToPage();
        
      } else {
        setAlertShow(true);
        setErrorColor("warning");
        setErrorMsg( "Address `" + xrpAddress+ "` is not valid");
      }
    } else {
      setShowInputAddress(true);
      if (once) {
        setAlertShow(true);
        setErrorColor("warning");
        setErrorMsg( "Address `" + xrpAddress+ "` is not valid");
      }
      setOnce(false);
    }
  }, [once, redirectToPage, setValidateValue, submitted, validated]);

  return(
    <>
      <section
       className="vh-100">
        <Container className="h-custom">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fs-2 fw-normal mb-0 me-3">Micro<span className="link-danger">World</span></p>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0"></p>
              </div>

              {alertShow && 
                (<Alert
                  show={alertShow}
                  bg={errorColor}
                  onHide={()=> setAlertShow(false)}
                  delay={3000}
                  msg={errorMsg}
                />)
              }

              <InputAddress
                show={showInputAddress}
                onHide={() => {
                    setShowInputAddress(false);
                    setSubmitted(true);
                }}
                handleSubmit={id => setXrpAddress(id)}
              />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

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

const InputAddress = (props) => {
  const [address, setAddress] = useState('');
  const handleChange = (e) => setAddress(e.target.value);
  const handleSubmit = () => {
    props.handleSubmit(address);
    props.onHide();
  }

  return(
    <>
      <Row>
        <Form.Group >
          <Form.Label>XRP Address </Form.Label>
          <Form.Control type="text" onChange={handleChange} placeholder="Enter XRP Address"/>           
        </Form.Group>
      </Row>

      <Row className="py-5">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Row>
    </>
  );
};

export default StartPage;