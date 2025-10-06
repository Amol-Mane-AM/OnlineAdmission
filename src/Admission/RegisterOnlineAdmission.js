import React from 'react';
import signup from '../Dashboard/Img/signup.jpg'; // Adjust the path as necessary
import login from '../Dashboard/Img/login.jpg'; // Adjust the path as necessary
import './RegisterOnlineAdmission.css'; // Importing the CSS file for styles

function RegisterOnlineAdmission() {
    return (
        <>
        <div className="container hero-section position-relative">
            <div className="container">
                <h2>Follow Step-by-Step Online Admissions Process</h2>


                <div className="text-center">
                    <div className="step-title">STEP 1 – Sign-Up / Create a New Account</div>
                    <p>Submit your application through the <span className="highlight">Student online application form</span>.</p>
                    <p>Before accessing this site, you must read the guidelines for completing the online application process.</p>
                    <img src={signup} alt="Sign Up Form" className="step-image" />
                </div>


                <div className="text-center">
                    <div className="step-title">STEP 2 – Login Registration</div>
                    <p>Once you have completed the online application, you will receive an acknowledgement email to the email address provided by you with the application number.</p>
                    <p className="highlight">Without the Application Number, we cannot verify your enquiry submission.</p>
                    <img src={login} alt="Login Form" className="step-image" />
                </div>


                <div className="text-center">
                    <div className="step-title">STEP 3 – Entrance Assessment</div>
                    <p>The date and time of the entrance assessment will be shared via email after verification of uploaded documents.</p>
                </div>

                <hr />
                <div className="text-center note">
                    <p><strong>ENTRANCE ASSESSMENT</strong><br />
                        The School conducts Entrance Assessment to determine the right placement of an applicant. The assessment of a student will be determined by the admission committee and is necessary to complete the registration process. Once this step has been completed, a student may be offered either a seat, placed on the waitlist or denied.

                        Educators recognize that there is a wide range of behaviour and performance within any grade or year. The admission process includes academic and developmental assessments to identify those students most likely to benefit from our program. We understand that children have different learning needs & challenges, and our teachers are qualified to help each child succeed through differentiation of instruction, assessment and attention to the learning styles of students.</p>
                </div>
                <div className="text-center">
                    <div className="step-title">STEP 4 – REGISTRATION DEPOSIT</div>
                    <p>You will be intimated if your child is qualified. You can pay the Registration Deposit online through the <span className="highlight">Online Payment Gateway</span> or at the school office.</p>
                    <p className="highlight">Please note that the Registration Deposit is non-refundable.</p>

                </div>
            </div>
        
        
        <div className="container">
                <h2>Required Documents</h2>
                <ul className="list-group list-group-flush mb-4">
  <li className="list-group-item">
    <em>One copy (coloured)</em> of the student’s passport with a valid Indian residence visa.
  </li>
  <li className="list-group-item">
    <em>One copy (coloured)</em> the student’s birth certificate.
  </li>
  <li className="list-group-item">
    <em>One copy (coloured)</em> of the student’s Emirates ID Card (both sides).
  </li>
  <li className="list-group-item">
    <em>One copy (coloured)</em> each of (father and mother) Emirates ID Card (both sides), Passport & Visa.
  </li>
  <li className="list-group-item">
    Copy of the student’s vaccination/immunization record.
  </li>
  <li className="list-group-item">
    Original health file from the previous school.
  </li>
  <li className="list-group-item">
    <em>One copy (coloured)</em> of the school final report card for all children entering KG2 / Year 1 and above (in English).
  </li>
  <li className="list-group-item">
    Original Transfer Certificate from the previous school (only after confirmation of admission):
    <ul className="mt-2 ps-4">
      <li>
        In the case of transfer from other Emirates, the Transfer Certificate should be duly attested by the Educational authority of the respective Emirate.
      </li>
      <li>
        In the case of overseas transfer (except USA, UK, Australia, Canada, Europe, New Zealand), the Transfer Certificate should be attested by:
        <ul className="mt-2 ps-4">
          <li>District Educational Officer / Ministry of Education (from the country migrating from)</li>
          <li>Ministry of Foreign Affairs (from the country migrating from) and Ministry of Foreign Affairs UAE</li>
          <li>UAE Embassy / Consulate (from the country migrating from)</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>


                <div className="container mt-5">
                    <h2>Final Steps</h2>
                    <p>Once all the above steps are completed, you will receive a confirmation email regarding your admission status.</p>
                    <p className="highlight">Please ensure that all documents are submitted before the deadline to avoid any delays in the admission process.</p>
                </div>
                <div className="container mt-5">
                    <h2>Important Notes</h2>
                    <ul>
                        <li>All documents must be submitted in English or Arabic. If the documents are in any other language, they must be translated into English.</li>
                        <li>All documents should be submitted in soft copy (PDF format) through the online application portal.</li>
                        <li>Incomplete applications will not be processed.</li>
                        <li>For any queries, please contact the admissions office at  <span className="highlight">+971 123456789</span> or email us at <span className="highlight"></span></li>
                    </ul>
                </div>
                         <h1>
  To register <a href="/Registration" style={{ color: '#ff5722', fontWeight: 'bold', textDecoration: 'underline' }}>Click Here</a>
</h1>


            </div>
            </div>
         
       
       
            
            </> 

       


    );
}


export default RegisterOnlineAdmission;