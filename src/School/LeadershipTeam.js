import React from 'react';

import principalimg from '../Dashboard/Img/student.jpg'; // Adjust the path as necessary
import viceprincipalimg from '../Dashboard/Img/student.jpg'; // Adjust the path as necessary
import schoolprincipalimg from '../Dashboard/Img/student.jpg'; // Adjust the path as necessary

function LeadershipTeam() {
    return (
        <>
            <section className="container hero-section position-relative">
                <div className="container">
                    <h1 className="text-center my-4">Leadership Team</h1>
                    <p className="text-center">Meet our dedicated leadership team who guide our school with vision and integrity.</p>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={principalimg} className="card-img-top" alt="Principal" />
                                <div className="card-body">
                                    <h5 className="card-title">Dr. Jane Smith</h5>
                                    <p className="card-text">Principal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={viceprincipalimg} className="card-img-top" alt="Vice Principal" />
                                <div className="card-body">
                                    <h5 className="card-title">Mr. John Doe</h5>
                                    <p className="card-text">Vice Principal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <img src={schoolprincipalimg} className="card-img-top" alt="Counselor" />
                                <div className="card-body">
                                    <h5 className="card-title">Ms. Emily Johnson</h5>
                                    <p className="card-text">School Counselor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LeadershipTeam;