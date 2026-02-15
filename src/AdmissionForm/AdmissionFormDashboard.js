import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from "sweetalert";
import { Container, Row, Col, Form } from 'react-bootstrap';
import config from '../config';

function AdmissionFormDashboard() {
    debugger;
    if (sessionStorage.name === '' || sessionStorage.name === null || sessionStorage.name === undefined) {
        window.location.href = "/registration";
    }
    const navigate = useNavigate();
    const [admissionDetails, setAdmissionDetails] = useState(null);




    useEffect(() => {
        const email = sessionStorage.getItem("email");

        if (!email) {
            console.error("Email not found in sessionStorage");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${config.API_URL}/admission/admissionData/email=${email}`
                );
                setAdmissionDetails(response.data);
                console.log("Fetched admission details:", response.data);
            } catch (error) {
                console.error("Failed to fetch admission details:", error);
            }
        };

        fetchData();
    }, []);

    const handlePrint = () => {
        const printContents = document.getElementById("printable-area").innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // To reload React app after print
    };



    const handleFee = async () => {
        debugger
        try {
            const res = await axios.post(`${config.API_URL}/admission/payment`, {
                amount: 500, // ₹50 in paise
            });

            const { orderId } = res.data;

            const options = {
                key: config.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
                amount: 500,
                currency: 'INR',
                name: 'Online Admission Form',
                description: 'Form Fee Payment',
                order_id: orderId,
                handler: async function (response) {
                    try {
                        debugger;
                        const paymentData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            amount: 50000, // ₹5.00 (in paise)
                            email: admissionDetails.email,
                            name: `${admissionDetails.firstName} ${admissionDetails.surname}`
                        };

                        const res = await axios.post(`${config.API_URL}/admission/payment-success`, paymentData);

                        const receiptUrl = res.data.receiptUrl; // Assume backend returns a receipt link or HTML
                        swal("Success", "Payment successful!", "success");

                        // Open receipt in new tab
                        window.open(receiptUrl, '_blank');
                        window.location.reload();
                    } catch (err) {
                        console.error("Error verifying payment", err);
                        swal("Error", "Payment verification failed.", "error");
                    }
                },
                prefill: {
                    name: `${admissionDetails.firstName} ${admissionDetails.surname}`,
                    email: admissionDetails.email,
                    contact: admissionDetails.contactNumber,
                },
                theme: {
                    color: '#0d6efd',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Razorpay Init Failed", error);
            swal("Error", "Payment initialization failed.", "error");
        }
    };




    const [receiptHtml, setReceiptHtml] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // const handleViewReceipt = async () => {
    //   try {
    //     const response = await fetch(admissionDetails.receiptUrl);
    //     if (!response.ok) throw new Error("Failed to load receipt");
    //     const html = await response.text();
    //     setReceiptHtml(html);
    //     setShowPopup(true);
    //   } catch (err) {
    //     alert(err.message);
    //   }
    // };

    const handleViewReceipt = async () => {
        try {
            const url = `${config.API_URL}/receipts/${admissionDetails.receiptUrl}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to load receipt");
            const html = await response.text();
            setReceiptHtml(html);
            setShowPopup(true);
        } catch (err) {
            alert(err.message);
        }
    };



    const handlePrintReceipt = () => {
        const printContents = document.getElementById('receipt-content').innerHTML;
        const printWindow = window.open('', '', 'height=800,width=1000');
        printWindow.document.write('<html><head><title>Receipt</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(printContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    // edit

    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const handleEditClick = () => {
        debugger;
        setEditData({
            schoolName: admissionDetails.schoolName,
            curriculum: admissionDetails.curriculum,
            academicYear: admissionDetails.academicYear,
            grade: admissionDetails.grade,
            applicationDate: admissionDetails.applicationDate,
            category: admissionDetails.category,

            firstName: admissionDetails.firstName,
            middleName: admissionDetails.middleName,
            surname: admissionDetails.surname,

            dob: admissionDetails.dob,
            nationality: admissionDetails.nationality,
            gender: admissionDetails.gender,
            motherTongue: admissionDetails.motherTongue,
            birthCountry: admissionDetails.birthCountry,
            placeOfBirth: admissionDetails.placeOfBirth,


            email: admissionDetails.email,
            contactNumber: admissionDetails.contactNumber,

            paymentStatus: admissionDetails.paymentStatus,
            receiptUrl: admissionDetails.receiptUrl,
            amount: admissionDetails.amount,
            id: admissionDetails.id,

            // Add other fields as needed
        });
        setShowEditModal(true);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${config.API_URL}/admissionData/${admissionDetails.id}`, editData);
            swal("Success", "Admission details updated successfully!", "success");
            setAdmissionDetails(response.data);
            window.location.reload();
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating admission details", error);
            swal("Error", "Failed to update admission details.", "error");
        }
    };
    const showPaymentInfo = false; // Set to true to show payment info

    return (
        <>


            {/* MAIN BUTTONS */}
            <div className="container d-flex justify-content-center mt-5 hero-section">
                {!admissionDetails && (
                    <div className="d-flex flex-column flex-md-row gap-3 text-center">
                        <button className="btn btn-primary px-4 py-2" onClick={() => navigate('/NewApplication')}>
                            New Application
                        </button>
                        {/* <button className="btn btn-secondary px-4 py-2">
                            View All Applications
                        </button> */}
                    </div>
                )}


                {/* DISPLAY ADMISSION DETAILS */}
                {admissionDetails && (
                    <div className="container mt-5">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <button className="btn btn-primary" onClick={handlePrint}>
                                🖨️ Print Application
                            </button>

                            {!admissionDetails?.receiptUrl && (
                                <button className="btn btn-primary" onClick={handleFee}>
                                    🖨️ Online Form Fee
                                </button>
                            )}

                            {admissionDetails?.receiptUrl && (
                                <button className="btn btn-primary" onClick={handleViewReceipt}>
                                    View Receipt
                                </button>
                            )}

                            {/* <iframe
  src={`http://localhost:8080/receipts/${admissionDetails.receiptUrl}?t=${Date.now()}`}
  width="100%"
  height="600"
  title="Receipt"
/> */}



                        </div>


                        {showPopup && (
                            <div className="modal d-block" tabIndex="-1" role="dialog">
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-2">
                                                <h5 className="modal-title mb-0">Receipt</h5>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={handlePrintReceipt}
                                                >
                                                    🖨️ Print
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowPopup(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <div id="receipt-content" dangerouslySetInnerHTML={{ __html: receiptHtml }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        <div id="printable-area">
                            <div className="d-flex flex-row justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Latest Admission Details</h4>
                                <div
                                    className={`btn mb-3 
                       ${admissionDetails.status === 'APPROVED' ? 'btn-success' :
                                            admissionDetails.status === 'REJECTED' ? 'btn-danger' :
                                                'btn-warning'}`}
                                >
                                    Your Application status is <b>{admissionDetails.status}</b>
                                </div>

                            </div>

                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-warning btn-sm mb-3" onClick={handleEditClick}>
                                            ✏️ Edit
                                        </button>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6"><strong>Application ID:</strong> {admissionDetails.id}</div>
                                        <div className="col-md-6"><strong>Application Status:</strong> {admissionDetails.status}</div>
                                        <div className="col-md-6"><strong>School Name:</strong> {admissionDetails.schoolName}</div>
                                        <div className="col-md-6"><strong>Curriculum:</strong> {admissionDetails.curriculum}</div>
                                        <div className="col-md-6"><strong>Academic Year:</strong> {admissionDetails.academicYear}</div>
                                        <div className="col-md-6"><strong>Grade:</strong> {admissionDetails.grade}</div>
                                        <div className="col-md-6"><strong>Application Date:</strong> {admissionDetails.applicationDate}</div>
                                        <div className="col-md-6"><strong>Category:</strong> {admissionDetails.category}</div>
                                        <div className="col-md-6">
                                            <strong>Name:</strong> {`${admissionDetails.firstName} ${admissionDetails.middleName} ${admissionDetails.surname}`}
                                        </div>
                                        <div className="col-md-6"><strong>Date of Birth:</strong> {admissionDetails.dob}</div>
                                        <div className="col-md-6"><strong>Gender:</strong> {admissionDetails.gender}</div>
                                        <div className="col-md-6"><strong>Nationality:</strong> {admissionDetails.nationality}</div>
                                        <div className="col-md-6"><strong>Mother Tongue:</strong> {admissionDetails.motherTongue}</div>
                                        <div className="col-md-6"><strong>Birth Country:</strong> {admissionDetails.birthCountry}</div>
                                        <div className="col-md-6"><strong>Place of Birth:</strong> {admissionDetails.placeOfBirth}</div>
                                        <div className="col-md-6"><strong>Contact:</strong> {admissionDetails.contactNumber}</div>
                                        <div className="col-md-6"><strong>Email:</strong> {admissionDetails.email}</div>

                                        {showPaymentInfo && (
                                            <>
                                                <div className="col-md-6">
                                                    <strong>payment_status:</strong> {admissionDetails.paymentStatus}
                                                </div>
                                                <div className="col-md-6">
                                                    <strong>receipt_url:</strong> {admissionDetails.receiptUrl}
                                                </div>
                                                <div className="col-md-6">
                                                    <strong>amount:</strong> {admissionDetails.amount / 100}
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </div>

                            {/* 🟡 Edit Modal */}
                            {showEditModal && (
                                <div className="modal d-block hero-section" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog modal-lg" role="document" >
                                        <div className="modal-content" style={{ width: '1000px' }}>
                                            <div className="modal-header">
                                                <h5 className="modal-title">Edit Admission Details</h5>
                                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                            </div>
                                            <div className="modal-body">


                                                <Container className="bg-white p-4 shadow-sm rounded mb-4">
                                                    <h5 className="fw-bold mb-3">Application Details</h5>
                                                    <Row className="mb-3">
                                                        <Col md={3}>
                                                            <Form.Group controlId="schoolName">
                                                                <Form.Label>School Name <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" name="schoolName" onChange={handleChange} value={editData.schoolName} readOnly />

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={2}>
                                                            <Form.Group controlId="curriculum">
                                                                <Form.Label>Curriculum</Form.Label>
                                                                <Form.Control type="text" name="curriculum" onChange={handleChange} value={editData.curriculum} readOnly />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={2}>
                                                            <Form.Group controlId="academicYear">
                                                                <Form.Label>Academic Year <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="text" name="academicYear" onChange={handleChange} value={editData.academicYear} readOnly />

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={3}>
                                                            <Form.Group controlId="grade">
                                                                <Form.Label>Grade Applying For <span className="text-danger">*</span></Form.Label>
                                                                <Form.Select name="grade" onChange={handleChange} value={editData.grade}>
                                                                    <option value="">Please Select</option>
                                                                    <option value="Grade1">Grade 1</option>
                                                                </Form.Select>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={2}>
                                                            <Form.Group controlId="applicationDate">
                                                                <Form.Label>Application Date <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="date" name="applicationDate" onChange={handleChange} value={editData.applicationDate} readOnly />

                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Col md={3}>
                                                            <Form.Group controlId="category">
                                                                <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                                                                <Form.Select name="category" onChange={handleChange} value={editData.category}>
                                                                    <option value="">Please Select</option>
                                                                    <option value="General">General</option>
                                                                    <option value="Sports">Sports</option>
                                                                    <option value="Staff">Staff</option>
                                                                </Form.Select>

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
                                                                <Form.Control name="firstName" placeholder="CHILD'S FIRST NAME" onChange={handleChange} value={editData.firstName} />

                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="middleName">
                                                                <Form.Label>Child's Middle Name</Form.Label>
                                                                <Form.Control name="middleName" placeholder="CHILD'S MIDDLE NAME" onChange={handleChange} value={editData.middleName} />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Form.Group controlId="surname">
                                                                <Form.Label>Child's Surname <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control name="surname" placeholder="CHILD'S FAMILY NAME" onChange={handleChange} value={editData.surname} />

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
                                                                    value={editData.dob}

                                                                />

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={4}>
                                                            <Form.Group controlId="nationality">
                                                                <Form.Label>
                                                                    Nationality <span className="text-danger">*</span>
                                                                </Form.Label>
                                                                <Form.Select
                                                                    name="nationality"
                                                                    value={editData.nationality}
                                                                    onChange={handleChange}

                                                                >
                                                                    <option value="">Please Select</option>
                                                                    <option value="Indian">Indian</option>
                                                                    <option value="Other">Other</option>
                                                                </Form.Select>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={4}>
                                                            <Form.Group controlId="gender">
                                                                <Form.Label>
                                                                    Gender <span className="text-danger">*</span>
                                                                </Form.Label>
                                                                <Form.Select
                                                                    name="gender"
                                                                    value={editData.gender}
                                                                    onChange={handleChange}

                                                                >
                                                                    <option value="">Please Select</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Other">Other</option>
                                                                </Form.Select>

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
                                                                    value={editData.motherTongue}
                                                                    onChange={handleChange}

                                                                >
                                                                    <option value="">Please Select</option>
                                                                    <option value="Marathi">Marathi</option>
                                                                    <option value="Hindi">Hindi</option>
                                                                    <option value="English">English</option>
                                                                    <option value="Gujarati">Gujarati</option>
                                                                    <option value="Other">Other</option>
                                                                </Form.Select>

                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={4}>
                                                            <Form.Group controlId="birthCountry">
                                                                <Form.Label>Birth Country</Form.Label>
                                                                <Form.Select name="birthCountry" onChange={handleChange} value={editData.birthCountry}>
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
                                                                    value={editData.placeOfBirth}
                                                                    onChange={handleChange}

                                                                />

                                                            </Form.Group>
                                                        </Col>

                                                    </Row>


                                                </Container>

                                                <Container className="bg-white p-4 shadow-sm rounded mb-4">
                                                    <h5 className="fw-bold mb-3">Contact Number and Email Address</h5>
                                                    <Row className="mb-3">
                                                        {/* <Col md={6}>
                                                        <Form.Group controlId="contactNumber">
                                                            <Form.Label>Contact Number</Form.Label>
                                                            <Form.Control type="text" id="contactNumber" name="contactNumber" onChange={handleChange} value={editData.contactNumber} />
                                                        </Form.Group>
                                                    </Col> */}

                                                        <Col md={6}>
                                                            <Form.Group controlId="contactNumber">
                                                                <Form.Label>Contact Number</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    id="contactNumber"
                                                                    name="contactNumber"
                                                                    value={editData.contactNumber}
                                                                    maxLength={10}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value;

                                                                        // Allow only digits
                                                                        if (/^\d{0,10}$/.test(val)) {
                                                                            // Allow first digit to be 7/8/9 or empty
                                                                            if (val === '' || /^[7-9]/.test(val)) {
                                                                                handleChange(e); // Call your existing handler
                                                                            }
                                                                        }
                                                                    }}
                                                                // isInvalid={!!errors.contactNumber}
                                                                />
                                                                {/* <Form.Control.Feedback type="invalid">
                                                                    {errors.contactNumber}
                                                                </Form.Control.Feedback> */}
                                                            </Form.Group>
                                                        </Col>


                                                        <Col md={6}>
                                                            <Form.Group controlId="email">
                                                                <Form.Label>Email ID <span className="text-danger">*</span></Form.Label>
                                                                <Form.Control type="email" id="email" name="email" onChange={handleChange} value={editData.email} readOnly />

                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                </Container>
                                                {showPaymentInfo && (
                                                    <Container className="bg-white p-4 shadow-sm rounded mb-4">
                                                        <h5 className="fw-bold mb-3">Payment Details</h5>
                                                        <Row className="mb-3">

                                                            <Col md={6}>
                                                                <Form.Group controlId="id">
                                                                    <Form.Label>Id</Form.Label>
                                                                    <Form.Control type="text" name="id" onChange={handleChange} value={editData.id} readOnly />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md={6}>
                                                                <Form.Group controlId="paymentStatus">
                                                                    <Form.Label>Payment Status</Form.Label>
                                                                    <Form.Control type="text" name="paymentStatus" onChange={handleChange} value={editData.paymentStatus} readOnly />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md={6}>
                                                                <Form.Group controlId="receiptUrl">
                                                                    <Form.Label>Receipt URL</Form.Label>
                                                                    <Form.Control type="text" name="receiptUrl" onChange={handleChange} value={editData.receiptUrl} readOnly />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col md={6}>
                                                                <Form.Group controlId="amount">
                                                                    <Form.Label>Amount</Form.Label>
                                                                    <Form.Control type="text" name="amount" onChange={handleChange} value={editData.amount} readOnly />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                )}
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                )}
            </div>

        </>
    );
}

export default AdmissionFormDashboard;
