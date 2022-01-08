import React from "react";
import {
  ToastContainer,
  Toast
} from 'react-bootstrap'


const Alert = (props) => {
  console.log('aaaaaaaaaaaaaaaaa', props)
  return (
      <ToastContainer position="top-end" className="p-3" >
          <Toast 
          {...props}
          onClose={props.onHide()} 
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


// const sendEmail = (e) => {
//   e.preventDefault();

//   // EmailJS.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_USER_ID)
//   //     .then(function(response) {
//   //         setErrorColor('success');
//   //         setErrorMsg('SUCCESS!', response.status, response.text)
//   //     }, function(err) {
//   //         setErrorColor('warning');
//   //         setErrorMsg('FAILED...', err)
//   //     });
  
//   setSubmit(true); 

  
//   //e.target.reset();
// }

export default Alert;