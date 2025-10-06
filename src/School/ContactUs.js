import { useRef } from "react";
import emailjs from "@emailjs/browser";
import swal from "sweetalert";

function ContactUs() {


  const formRef = useRef();

  const sendEmail = (e) => {
    debugger;
    e.preventDefault();

    emailjs
      .sendForm(
        "service_aiq4xma",     // replace from EmailJS dashboard
        "template_ec1qmai",    // replace from EmailJS template
        formRef.current,
        "_RoIYQ12FQ7s7QD9P"      // replace from EmailJS account
      )
      .then(
        (result) => {
          console.log(result.text);
          swal("Message Sent", "Thank you for contacting us!", "success");
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          swal("Failed", "Something went wrong. Try again.", "error");
        }
      );
    }
    
    return (
        
        <>
 
   
 <section className="container hero-section position-relative">
    <div className="container">
  <div className="container mt-n100 position-relative z-1">
    <div className="card shadow-lg p-4 mb-5 bg-white rounded">
      <h5 className="mb-4">Send us a Message</h5>
      <form ref={formRef} onSubmit={sendEmail}>
  <div className="row mb-3">
    <div className="col-md-6">
      <input type="text" name="user_name" className="form-control" placeholder="Full Name" required />
    </div>
    <div className="col-md-6">
      <input type="email" name="user_email" className="form-control" placeholder="Email Address" required />
    </div>
  </div>
  <div className="row mb-3">
    <div className="col-md-6">
      <input type="tel" name="phone" className="form-control" placeholder="Phone Number" />
    </div>
    <div className="col-md-6">
      <input type="text" name="company" className="form-control" placeholder="Company Name" />
    </div>
  </div>
  <div className="mb-3">
    <textarea name="message" className="form-control" rows="4" placeholder="Message" required></textarea>
  </div>
  <div className="text-end">
    <button type="submit" className="btn btn-primary px-4">SEND</button>
  </div>
</form>

    </div>
  </div>
</div>

  
  <div className="container mb-5">
    <div className="bg-primary text-white p-4 rounded">
      <h6>Contact Information</h6>
      <p>📍 P.O.BOX 4026, Pune , India</p>
      <p>📞 +91 0 1234661</p>
      <p>📧 punestudenteducationschool@gmail.com</p>
    </div>
  </div>
  </section>

        </>
    );
}

export default ContactUs;