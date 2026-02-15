import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import AdmissionFormDashboardHeasder from './AdmissionFormDashboardHeader';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import confetti from 'canvas-confetti';
import config from '../config';

function NewApplication() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    schoolName: "Pune",
    curriculum: "CBSC",
    academicYear: "2024-2025",
    grade: "",
    applicationDate: new Date().toISOString().split('T')[0],
    category: "",
    firstName: sessionStorage.getItem("name") || "", // safe way,
    middleName: "",
    surname: "",
    dob: "",
    nationality: "",
    gender: "",
    motherTongue: "",
    birthCountry: "",
    placeOfBirth: "",
    email: sessionStorage.getItem("email") || "",
    contactNumber: '',
    // other optional fields
  });



  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the current field if user updates it
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Clear error message
    }));

  };


  const schoolNameRef = useRef();
  const academicYearRef = useRef();
  const gradeRef = useRef();
  const applicationDateRef = useRef();
  const categoryRef = useRef();
  const firstNameRef = useRef();
  const surnameRef = useRef();
  const dobRef = useRef();
  const nationalityRef = useRef();
  const genderRef = useRef();
  const motherTongueRef = useRef();
  const placeOfBirthRef = useRef();
  const emailRef = useRef();

  const handleSubmitApplication = async (e) => {
    debugger;
    e.preventDefault();


    // Validate required fields
    const err = {};

    if (!formData.schoolName.trim()) err.schoolName = "School name is required.";
    if (!formData.academicYear.trim()) err.academicYear = "Academic year is required.";
    if (!formData.grade) err.grade = "Please select a grade.";
    if (!formData.applicationDate) err.applicationDate = "Application date is required.";
    if (!formData.category) err.category = "Category is required.";
    if (!formData.firstName.trim()) err.firstName = "First name is required.";
    if (!formData.surname.trim()) err.surname = "Surname is required.";
    if (!formData.dob) err.dob = "Date of birth is required.";
    if (!formData.nationality) err.nationality = "Please select nationality.";
    if (!formData.gender) err.gender = "Please select gender.";
    if (!formData.motherTongue) err.motherTongue = "Please select mother tongue.";
    if (!formData.placeOfBirth.trim()) err.placeOfBirth = "Place of birth is required.";
    if (!formData.email.trim()) err.email = "email is required.";





    if (Object.keys(err).length > 0) {
      setErrors(err);

      const fieldRefs = {
        schoolName: schoolNameRef,
        academicYear: academicYearRef,
        grade: gradeRef,
        applicationDate: applicationDateRef,
        category: categoryRef,
        firstName: firstNameRef,
        surname: surnameRef,
        dob: dobRef,
        nationality: nationalityRef,
        gender: genderRef,
        motherTongue: motherTongueRef,
        placeOfBirth: placeOfBirthRef,
        email: emailRef,
      };

      for (const key of Object.keys(err)) {
        const ref = fieldRefs[key];
        if (ref?.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
          ref.current.focus();
          break;
        }
      }

      return;
    }





    setIsSubmitting(true);
    //npm install canvas-confetti

    // Simulate API call or navigate
    setTimeout(async () => {
      try {
        await axios.post(`${config.API_URL}/admission/save`, formData);

        // Show swal with auto-close after 2 seconds (2000 ms)
        swal({
          title: "Success! 🎉",
          text: "Application submitted successfully!",
          icon: "success",
          buttons: false,       // no buttons shown
          timer: 2000           // auto close after 2 seconds
        });

        // Immediately trigger confetti
        confetti({
          particleCount: 150,
          spread: 170,
          origin: { y: 0.6 }
        });

        // Navigate after 2 seconds (same as swal timer)
        setTimeout(() => {
          navigate('/AdmissionFormDashboard');
        }, 2000);

      } catch (error) {
        console.error("Error submitting application:", error);
        swal("Error", "Failed to submit application. Please try again.", "error");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);


  };


  return (
    <>
      <AdmissionFormDashboardHeasder />
      <Form onSubmit={handleSubmitApplication}>
        <Container className="bg-white p-4 shadow-sm rounded mb-4">
          <h5 className="fw-bold mb-3">Application Details</h5>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="schoolName">
                <Form.Label>School Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="schoolName" onChange={handleChange} value={formData.schoolName} isInvalid={!!errors.schoolName} ref={schoolNameRef} />
                <Form.Control.Feedback type="invalid">
                  {errors.schoolName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="curriculum">
                <Form.Label>Curriculum</Form.Label>
                <Form.Control type="text" name="curriculum" onChange={handleChange} value={formData.curriculum} />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="academicYear">
                <Form.Label>Academic Year <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="academicYear" onChange={handleChange} value={formData.academicYear} isInvalid={!!errors.academicYear} ref={academicYearRef} readOnly />
                <Form.Control.Feedback type="invalid">
                  {errors.academicYear}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId="grade">
                <Form.Label>Grade Applying For <span className="text-danger">*</span></Form.Label>
                <Form.Select name="grade" onChange={handleChange} value={formData.grade} isInvalid={!!errors.grade} ref={gradeRef}>
                  <option value="">Please Select</option>
                  <option value="Grade1">Grade 1</option>
                  <option value="Grade2">Grade 2</option>
                  <option value="Grade3">Grade 3</option>
                  <option value="Grade4">Grade 4</option>
                  <option value="Grade5">Grade 5</option>
                  <option value="Grade6">Grade 6</option>
                  <option value="Grade7">Grade 7</option>
                  <option value="Grade8">Grade 8</option>
                  <option value="Grade9">Grade 9</option>
                  <option value="Grade10">Grade 10</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.grade}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId="applicationDate">
                <Form.Label>Application Date <span className="text-danger">*</span></Form.Label>
                <Form.Control type="date" name="applicationDate" onChange={handleChange} value={formData.applicationDate} isInvalid={!!errors.applicationDate} ref={applicationDateRef} readOnly />
                <Form.Control.Feedback type="invalid">
                  {errors.applicationDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="category">
                <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                <Form.Select name="category" onChange={handleChange} value={formData.category} isInvalid={!!errors.category} ref={categoryRef}>
                  <option value="">Please Select</option>
                  <option value="General">General</option>
                  <option value="Sports">Sports</option>
                  <option value="Staff">Staff</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {/* <Col md={3}>
            <Form.Group controlId="passportPhoto">
              <Form.Label>Passport Photo</Form.Label>
              <Form.Control type="file" name="passportPhoto" accept=".jpeg,.jpg,.png" />
              <Form.Text className="text-muted">Max 2MB (.jpeg/.png)</Form.Text>
            </Form.Group>
          </Col> */}
          </Row>

          <h5 className="fw-bold mb-3">Student Details</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="firstName">
                <Form.Label>Child's First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control name="firstName" placeholder="CHILD'S FIRST NAME" onChange={handleChange} value={formData.firstName} isInvalid={!!errors.firstName} ref={firstNameRef} />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="middleName">
                <Form.Label>Child's Middle Name</Form.Label>
                <Form.Control name="middleName" placeholder="CHILD'S MIDDLE NAME" onChange={handleChange} value={formData.middleName} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="surname">
                <Form.Label>Child's Surname <span className="text-danger">*</span></Form.Label>
                <Form.Control name="surname" placeholder="CHILD'S FAMILY NAME" onChange={handleChange} value={formData.surname} isInvalid={!!errors.surname} ref={surnameRef} />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="dob">
                <Form.Label>
                  Date of Birth <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  value={formData.dob}
                  isInvalid={!!errors.dob}
                  ref={dobRef}
                  max={new Date().toISOString().split('T')[0]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="nationality">
                <Form.Label>
                  Nationality <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  isInvalid={!!errors.nationality}
                  ref={nationalityRef}
                >
                  <option value="">Please Select</option>
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.nationality}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="gender">
                <Form.Label>
                  Gender <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                  ref={genderRef}
                >
                  <option value="">Please Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group controlId="motherTongue">
                <Form.Label>
                  Mother Tongue <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="motherTongue"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  isInvalid={!!errors.motherTongue}
                  ref={motherTongueRef}
                >
                  <option value="">Please Select</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.motherTongue}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="birthCountry">
                <Form.Label>Birth Country</Form.Label>
                <Form.Select name="birthCountry" onChange={handleChange} value={formData.birthCountry}>
                  <option value="">Please Select</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="placeOfBirth">
                <Form.Label>
                  Place of Birth <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="placeOfBirth"
                  placeholder="PLACE OF BIRTH"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.placeOfBirth}
                  ref={placeOfBirthRef}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.placeOfBirth}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

          </Row>


        </Container>

        <Container className="bg-white p-4 shadow-sm rounded mb-4">
          <h5 className="fw-bold mb-3">Contact Number and Email Address</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <InputGroup>
                  <InputGroup.Text>+91</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="contactNumber"
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    value={formData.contactNumber}
                    onChange={(e) => {
                      const val = e.target.value;
                      // Allow only digits
                      if (/^\d{0,10}$/.test(val)) {
                        // Validate first digit (optional)
                        if (val.length === 0 || /^[7-9]/.test(val)) {
                          handleChange(e);
                        }
                      }
                    }}
                    isInvalid={!!errors.contactNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.contactNumber}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email ID <span className="text-danger">*</span></Form.Label>
                <Form.Control type="email" id="email" name="email" onChange={handleChange} value={formData.email} isInvalid={!!errors.email} ref={emailRef} readOnly />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>


        </Container>

        {/* 
<Container className="bg-white p-4 shadow-sm rounded mb-4">
  <h5 className="fw-bold mb-3">Enter Father's Details</h5>
  <Row className="mb-3">
    <Col md={2}>
      <Form.Group controlId="fatherSalutation">
        <Form.Label>Salutation <span className="text-danger">*</span></Form.Label>
        <Form.Select id="fatherSalutation" name="fatherSalutation">
          <option value="">PLEASE SELECT</option>
          <option value="Mr">Mr</option>
          <option value="Dr">Dr</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherFirstName">
        <Form.Label>First Name (as on Passport) <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherFirstName" name="fatherFirstName" placeholder="FIRST NAME" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherMiddleName">
        <Form.Label>Middle Name (as on Passport)</Form.Label>
        <Form.Control id="fatherMiddleName" name="fatherMiddleName" placeholder="MIDDLE NAME" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherSurname">
        <Form.Label>Surname (as on Passport) <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherSurname" name="fatherSurname" placeholder="FAMILY NAME" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherNationality">
        <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
        <Form.Select id="fatherNationality" name="fatherNationality">
          <option value="">PLEASE SELECT</option>
          <option value="Indian">Indian</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherQualification">
        <Form.Label>Qualification <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherQualification" name="fatherQualification" placeholder="QUALIFICATION" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="fatherOccupation">
        <Form.Label>Profession/Occupation <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherOccupation" name="fatherOccupation" placeholder="OCCUPATION" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherOrganization">
        <Form.Label>Name of Organization <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherOrganization" name="fatherOrganization" placeholder="NAME OF ORGANIZATION" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherReligion">
        <Form.Label>Religion <span className="text-danger">*</span></Form.Label>
        <Form.Select id="fatherReligion" name="fatherReligion">
          <option value="">PLEASE SELECT</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Label>Is a resident of UAE? <span className="text-danger">*</span></Form.Label>
      <div>
        <Form.Check inline label="Yes" name="fatherUAEResident" type="radio" id="fatherUAEYes" />
        <Form.Check inline label="No" name="fatherUAEResident" type="radio" id="fatherUAENo" />
      </div>
    </Col>
    <Col md={2}>
      <Form.Group controlId="fatherEmiratesId">
        <Form.Label>Emirates ID</Form.Label>
        <Form.Control id="fatherEmiratesId" name="fatherEmiratesId" placeholder="e.g: 784-1980-1234567-9" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="fatherDOB">
        <Form.Label>Father's Date of Birth <span className="text-danger">*</span></Form.Label>
        <Form.Control type="date" id="fatherDOB" name="fatherDOB" />
      </Form.Group>
    </Col>
  </Row>

  <h5 className="fw-bold mb-3 mt-4">Father's Contact Information</h5>
  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="fatherCountryCode1">
        <Form.Label>Country Code <span className="text-danger">*</span></Form.Label>
        <Form.Select id="fatherCountryCode1" name="fatherCountryCode1">
          <option value="">Please Select</option>
          <option value="+91">+91</option>
          <option value="+971">+971</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherTelephoneResidence">
        <Form.Label>Telephone Residence <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherTelephoneResidence" name="fatherTelephoneResidence" placeholder="e.g: 971412345678" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherMobileNumber">
        <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
        <Form.Control id="fatherMobileNumber" name="fatherMobileNumber" placeholder="e.g: 971527547336" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherWorkEmail">
        <Form.Label>Work Email</Form.Label>
        <Form.Control type="email" id="fatherWorkEmail" name="fatherWorkEmail" placeholder="WORK EMAIL" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="fatherMonthlyIncome">
        <Form.Label>Father's Monthly Income <span className="text-danger">*</span></Form.Label>
        <Form.Select id="fatherMonthlyIncome" name="fatherMonthlyIncome">
          <option value="">Please Select</option>
          <option value="Less than 5000">Less than 5000</option>
          <option value="5000-10000">5000-10000</option>
          <option value="Above 10000">Above 10000</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherCountryCode2">
        <Form.Label>Country Code</Form.Label>
        <Form.Select id="fatherCountryCode2" name="fatherCountryCode2">
          <option value="">Please Select</option>
          <option value="+91">+91</option>
          <option value="+971">+971</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherTelephoneOffice">
        <Form.Label>Telephone Office</Form.Label>
        <Form.Control id="fatherTelephoneOffice" name="fatherTelephoneOffice" placeholder="e.g: 971412345678" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="fatherPersonalEmail">
        <Form.Label>Personal Email <span className="text-danger">*</span></Form.Label>
        <Form.Control type="email" id="fatherPersonalEmail" name="fatherPersonalEmail" placeholder="PERSONAL EMAIL" />
      </Form.Group>
    </Col>
  </Row>
</Container> */}

        {/* <Container className="bg-white p-4 shadow-sm rounded mb-4">
  <h5 className="fw-bold mb-3">Enter Mother's Details</h5>
  <Row className="mb-3">
    <Col md={2}>
      <Form.Group controlId="motherSalutation">
        <Form.Label>Salutation <span className="text-danger">*</span></Form.Label>
        <Form.Select id="motherSalutation" name="motherSalutation">
          <option value="">PLEASE SELECT</option>
          <option value="Mrs">Mrs</option>
          <option value="Dr">Dr</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherFirstName">
        <Form.Label>First Name (as on Passport) <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherFirstName" name="motherFirstName" placeholder="FIRST NAME (AS ON PASSPORT)" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherMiddleName">
        <Form.Label>Middle Name (as on Passport)</Form.Label>
        <Form.Control id="motherMiddleName" name="motherMiddleName" placeholder="MIDDLE NAME (AS ON PASSPORT)" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherSurname">
        <Form.Label>Surname (as on Passport)</Form.Label>
        <Form.Control id="motherSurname" name="motherSurname" placeholder="LAST NAME" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherNationality">
        <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
        <Form.Select id="motherNationality" name="motherNationality">
          <option value="">PLEASE SELECT</option>
          <option value="Indian">Indian</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherQualification">
        <Form.Label>Qualification <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherQualification" name="motherQualification" placeholder="QUALIFICATION" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="motherOccupation">
        <Form.Label>Profession/Occupation <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherOccupation" name="motherOccupation" placeholder="OCCUPATION" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherOrganization">
        <Form.Label>Name of Organization <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherOrganization" name="motherOrganization" placeholder="NAME OF ORGANIZATION" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Label>Is a resident of UAE? <span className="text-danger">*</span></Form.Label>
      <div>
        <Form.Check inline label="Yes" name="motherUAEResident" type="radio" id="motherUAEYes" />
        <Form.Check inline label="No" name="motherUAEResident" type="radio" id="motherUAENo" />
      </div>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherEmiratesId">
        <Form.Label>Emirates ID</Form.Label>
        <Form.Control id="motherEmiratesId" name="motherEmiratesId" placeholder="e.g: 784-1980-1234567-9" />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="motherReligion">
        <Form.Label>Religion <span className="text-danger">*</span></Form.Label>
        <Form.Select id="motherReligion" name="motherReligion">
          <option value="">PLEASE SELECT</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="motherDOB">
        <Form.Label>Mother's Date of Birth <span className="text-danger">*</span></Form.Label>
        <Form.Control type="date" id="motherDOB" name="motherDOB" />
      </Form.Group>
    </Col>
  </Row>

  <h5 className="fw-bold mb-3 mt-4">Mother's Contact Information</h5>
  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="motherCountryCode1">
        <Form.Label>Country Code <span className="text-danger">*</span></Form.Label>
        <Form.Select id="motherCountryCode1" name="motherCountryCode1">
          <option value="">Please Select</option>
          <option value="+91">+91</option>
          <option value="+971">+971</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherTelephoneResidence">
        <Form.Label>Telephone Residence <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherTelephoneResidence" name="motherTelephoneResidence" placeholder="e.g: 971412345678" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherMobileNumber">
        <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
        <Form.Control id="motherMobileNumber" name="motherMobileNumber" placeholder="e.g: 971527547336" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherWorkEmail">
        <Form.Label>Work Email</Form.Label>
        <Form.Control type="email" id="motherWorkEmail" name="motherWorkEmail" placeholder="WORK EMAIL" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="motherMonthlyIncome">
        <Form.Label>Mother's Monthly Income <span className="text-danger">*</span></Form.Label>
        <Form.Select id="motherMonthlyIncome" name="motherMonthlyIncome">
          <option value="">Please Select</option>
          <option value="Less than 5000">Less than 5000</option>
          <option value="5000-10000">5000-10000</option>
          <option value="Above 10000">Above 10000</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherCountryCode2">
        <Form.Label>Country Code</Form.Label>
        <Form.Select id="motherCountryCode2" name="motherCountryCode2">
          <option value="">Please Select</option>
          <option value="+91">+91</option>
          <option value="+971">+971</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherTelephoneOffice">
        <Form.Label>Telephone Office</Form.Label>
        <Form.Control id="motherTelephoneOffice" name="motherTelephoneOffice" placeholder="e.g: 971412345678" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="motherPersonalEmail">
        <Form.Label>Personal Email <span className="text-danger">*</span></Form.Label>
        <Form.Control type="email" id="motherPersonalEmail" name="motherPersonalEmail" placeholder="PERSONAL EMAIL" />
      </Form.Group>
    </Col>
  </Row>
</Container> */}

        {/* <Container className="bg-white p-4 shadow-sm rounded mb-4">
  <h5 className="fw-bold mb-3">Address Details</h5>

  <Row>
    
    <Col md={6}>
      <h6 className="fw-semibold"> Address</h6>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="uaeHouseNo">
            <Form.Label>House/Apartment Number</Form.Label>
            <Form.Control id="uaeHouseNo" name="uaeHouseNo" placeholder="HOUSE/APARTMENT NUMBER" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="uaeBuildingName">
            <Form.Label>Society/Building Name</Form.Label>
            <Form.Control id="uaeBuildingName" name="uaeBuildingName" placeholder="SOCIETY/BUILDING NAME" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="uaeStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control id="uaeStreet" name="uaeStreet" placeholder="STREET" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="uaeEmirate">
            <Form.Label>Emirate <span className="text-danger">*</span></Form.Label>
            <Form.Select id="uaeEmirate" name="uaeEmirate">
              <option value="">PLEASE SELECT</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="uaeLocation">
            <Form.Label>Location <span className="text-danger">*</span></Form.Label>
            <Form.Select id="uaeLocation" name="uaeLocation">
              <option value="">PLEASE SELECT</option>
              <option value="Bur Dubai">Bur Dubai</option>
              <option value="Deira">Deira</option>
              <option value="Al Nahda">Al Nahda</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Col>

    
    <Col md={6}>
      <h6 className="fw-semibold">Permanent Address <small className="text-muted">(as per student's passport)</small></h6>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="permHouseNo">
            <Form.Label>House/Apartment Number <span className="text-danger">*</span></Form.Label>
            <Form.Control id="permHouseNo" name="permHouseNo" placeholder="HOUSE/APARTMENT NUMBER" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="permBuildingName">
            <Form.Label>Society/Building Name <span className="text-danger">*</span></Form.Label>
            <Form.Control id="permBuildingName" name="permBuildingName" placeholder="SOCIETY/BUILDING NAME" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="permStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control id="permStreet" name="permStreet" placeholder="STREET" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="permCountry">
            <Form.Label>Country <span className="text-danger">*</span></Form.Label>
            <Form.Select id="permCountry" name="permCountry">
              <option value="">PLEASE SELECT</option>
              <option value="India">India</option>
              <option value="UAE">UAE</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="permState">
            <Form.Label>State</Form.Label>
            <Form.Control id="permState" name="permState" placeholder="STATE" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="permCity">
            <Form.Label>City <span className="text-danger">*</span></Form.Label>
            <Form.Control id="permCity" name="permCity" placeholder="CITY" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Group controlId="permPinCode">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control id="permPinCode" name="permPinCode" placeholder="PIN CODE" />
          </Form.Group>
        </Col>
      </Row>
    </Col>
  </Row>
</Container> */}

        {/* <Container className="bg-white p-4 shadow-sm rounded mb-4">
  <h5 className="fw-bold mb-3">Current School Details</h5>

  <Row className="mb-3">
    <Col md={4}>
      <Form.Group controlId="currentSchoolName">
        <Form.Label>School Name <span className="text-danger">*</span></Form.Label>
        <Form.Control
          id="currentSchoolName"
          name="currentSchoolName"
          placeholder="PLEASE ENTER FULL NAME OF SCHOOL AND CITY"
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="currentGrade">
        <Form.Label>Current Grade <span className="text-danger">*</span></Form.Label>
        <Form.Control
          id="currentGrade"
          name="currentGrade"
          placeholder="CURRENT GRADE"
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="schoolCurriculum">
        <Form.Label>Curriculum <span className="text-danger">*</span></Form.Label>
        <Form.Select id="schoolCurriculum" name="schoolCurriculum">
          <option value="">PLEASE SELECT</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="IB">IB</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="schoolCountry">
        <Form.Label>Country <span className="text-danger">*</span></Form.Label>
        <Form.Select id="schoolCountry" name="schoolCountry">
          <option value="">PLEASE SELECT</option>
          <option value="India">India</option>
          <option value="UAE">UAE</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="schoolState">
        <Form.Label>State <span className="text-danger">*</span></Form.Label>
        <Form.Control id="schoolState" name="schoolState" placeholder="STATE" />
      </Form.Group>
    </Col>
  </Row>

  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="secondLanguage">
        <Form.Label>Second Language <span className="text-danger">*</span></Form.Label>
        <Form.Select id="secondLanguage" name="secondLanguage">
          <option value="">PLEASE SELECT</option>
          <option value="Hindi">Hindi</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="monthlyFees">
        <Form.Label>Fees per month at school currently enrolled (AED)</Form.Label>
        <Form.Control
          type="number"
          id="monthlyFees"
          name="monthlyFees"
          placeholder="FEES PER MONTH IN CURRENT SCHOOL"
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="aggregateScore">
        <Form.Label>Aggregate (%) Scores <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="number"
          id="aggregateScore"
          name="aggregateScore"
          placeholder="AGGREGATE % SCORES"
        />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="academicYear">
        <Form.Label>Year <span className="text-danger">*</span></Form.Label>
        <Form.Select id="academicYear" name="academicYear">
          <option value="">Please Select</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </Form.Select>
      </Form.Group>
    </Col>
  </Row>

  <h6 className="fw-semibold mt-4">CAT4 Score <small className="text-muted">(if available)</small></h6>
  <Row className="mb-3">
    <Col md={3}>
      <Form.Group controlId="verbalScore">
        <Form.Label>Verbal Score</Form.Label>
        <Form.Control id="verbalScore" name="verbalScore" placeholder="VERBAL SCORE" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="quantitativeScore">
        <Form.Label>Quantitative Score</Form.Label>
        <Form.Control id="quantitativeScore" name="quantitativeScore" placeholder="QUANTITATIVE SCORE" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="nonVerbalScore">
        <Form.Label>Non Verbal Score</Form.Label>
        <Form.Control id="nonVerbalScore" name="nonVerbalScore" placeholder="NON VERBAL SCORE" />
      </Form.Group>
    </Col>
    <Col md={3}>
      <Form.Group controlId="spatialScore">
        <Form.Label>Spatial Score</Form.Label>
        <Form.Control id="spatialScore" name="spatialScore" placeholder="SPATIAL SCORES" />
      </Form.Group>
    </Col>
  </Row>
</Container> */}

        {/* <Container className="bg-white p-4 shadow-sm rounded mb-4">
  <h5 className="fw-bold mb-3">Additional Details</h5>
  <Form.Group controlId="heardAbout">
    <Form.Label>I heard about the school from / through <span className="text-danger">*</span></Form.Label>
    <Form.Select id="heardAbout" name="heardAbout">
      <option value="">PLEASE SELECT</option>
      <option value="Social Media">Social Media</option>
      <option value="Friend/Relative">Friend / Relative</option>
      <option value="Advertisement">Advertisement</option>
      <option value="Others">Others</option>
    </Form.Select>
  </Form.Group>
</Container> */}

        <Container className="bg-white p-4 shadow-sm rounded mb-4">
          <h5 className="fw-bold mb-3">Declaration</h5>

          <Form.Group controlId="declaration">
            <Form.Check
              type="checkbox"
              id="agreeDeclaration"
              name="agreeDeclaration"
              label=""
              required
            />
            <Form.Text className="text-danger fw-bold"> *</Form.Text>

            <div className="mt-2">
              <ol className="mb-3 ps-3" style={{ lineHeight: "1.6" }}>
                <li>I hereby declare that:
                  <ul>
                    <li>a. I have carefully read through the rules, regulations, admission procedure and document requirements on the school website.</li>
                    <li>b. The information provided in this form is true.</li>
                  </ul>
                </li>
                <li>I accept that incomplete/inaccurate information or any duplication/manipulation will result in:
                  <ul>
                    <li>a. Rejection of the application without any consideration.</li>
                    <li>b. Cancellation of offer of provisional admission/admission and any advance fee paid will not be refunded.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </Form.Group>

          <Form.Group controlId="declarationName" className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control type="text" id="declarationName" name="declarationName" placeholder="NAME" required />
          </Form.Group>

          <div className="d-flex justify-content-end align-items-center">
            <small className="me-auto text-muted">
              * Please <strong>DO NOT CLOSE OR REFRESH</strong> the page while your application is being processed.
            </small>
            <Button
              variant="danger"
              type="submit"
              className="me-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>

            <Button variant="secondary" onClick={() => navigate('/AdmissionFormDashboard')}>Cancel</Button>
          </div>
        </Container>
      </Form>

      {/* <Container className="text-end">
        <Button variant="success" type="submit" className="me-2">Submit</Button>
        <Button variant="secondary" onClick={() => navigate('/AdmissionFormDashboard')}>Cancel</Button>
      </Container> */}
    </>
  );
}

export default NewApplication;
