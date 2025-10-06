import React from "react";
 
import LoginForm from "../Register/LoginForm";  
import SignupForm from "../Register/SignupForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Registration() {


 return (
  <div className="hero-section container">
    <h1 className="text-center text-primary mb-4">The Pune School, Pune</h1>

    {/* Instructions */}
    <div className="mb-5">
      <h5>Instructions:</h5>
      <ol className="list-group list-group-numbered">
        <li className="list-group-item">Step 1: If you are a new user, please sign up to create a new account...</li>
        <li className="list-group-item">Step 2: If you have an account already, login using the username and password.</li>
        <li className="list-group-item">Step 3: Click on 'New Application' to fill a new application.</li>
        <li className="list-group-item">Step 4: Click on 'Submit Application' to upload the required documents.</li>
        <li className="list-group-item">Step 5: Use Google Chrome or Microsoft Edge for filling the form.</li>
      </ol>
    </div>

    {/* Forms */}
    <div className="row">
      {/* Login */}
      <div className="col-md-6 mb-4">
          <LoginForm />
      </div>

      {/* Signup */}
      <div className="col-md-6 mb-4">
       <SignupForm />
      </div>
    </div>

    {/* Note */}
    <div className="alert alert-info mt-4" role="alert">
  <strong>Note:</strong> If you're unable to sign up or sign in, please email&nbsp;
 <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=punestudenteducationschool@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-decoration-underline"
>
  punestudenteducationschool@gmail.com
</a>

  &nbsp;or call us at&nbsp;
  <a href="tel:+97123456789" className="text-decoration-underline">
    +97123456789
  </a>.
</div>

  </div>
);

}

export default Registration;
