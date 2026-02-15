import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from "./ThemeContext";
import Schoolimg from "./Img/school.jpg";
import MissionImg from "./Img/mission.jpg";
import VissionImg from "./Img/vission.jpg";
import AboutImg from "./Img/aboutus.jpg";
import CommunityImg from "./Img/community.jpg";

import StudentImg from "./Img/studentimg.jpg";
import ClassroomImg from "./Img/classroom.jpg";
import TeacherImg from "./Img/teacher.jpg";


import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function School() {
  // const { theme } = useContext(ThemeContext);
  const [showTourModal, setShowTourModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  const infoBoxes = [
    {
      title: "STUDENT",
      subtitle: "EVENTS",
      img: StudentImg, // ✅ Corrected
    },
    {
      title: "CLASSROOM",
      subtitle: "STORIES",
      img: ClassroomImg,
    },
    {
      title: "TEACHERS",
      subtitle: "PROFILE",
      img: TeacherImg,
    }
  ];


  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section container-fluid py-5 text-light"

      >
        <div className="container text-center py-5">
          <h5 className="text-uppercase mb-2 fw-bold">Welcome to School of Pune</h5>
          <h1 className="display-4 fw-bold mb-4">
            Welcome to <span className="text-warning">School of Pune</span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '720px' }}>
            Let us think of education as the means of developing our greatest abilities. Each
            of us has a private hope and dream which, fulfilled, can translate into benefit for all.
          </p>
          <button
            onClick={() => setShowTourModal(true)}
            className="btn btn-warning btn-lg shadow-lg"
          >
            TAKE A TOUR
          </button>
        </div>

        {/* Info Boxes */}
        <div className="container d-flex justify-content-center flex-wrap gap-4 mt-5">
          {infoBoxes.map((item, idx) => (
            <div
              key={idx}
              className="info-card position-relative rounded overflow-hidden shadow-lg bg-white card-3d"
              style={{
                width: "280px",
                perspective: "1000px",
                transition: "transform 0.5s",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="info-card-inner">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-100"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="p-4 text-center">
                  <h5 className="text-primary mb-2">{item.title}</h5>
                  <p className="text-muted">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Main Banner Image */}
      <section className="text-center">
        <img
          src={Schoolimg}
          alt="School Campus"
          className="img-fluid rounded shadow-lg my-4"
          style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
        />
      </section>

      {/* Mission Section */}
      <section className="py-5" style={{ background: 'linear-gradient(to bottom right, #e6ffe6, #ccffcc)' }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div className="col-lg-6 col-md-12" data-aos="fade-right">
            <h2 className="mb-3 text-success text-center text-lg-start fw-bold">🎯 Our Mission</h2>
            <p className="lead text-muted text-center text-lg-start">
              We aim to provide high-quality education that empowers students to explore,
              learn, and grow in a dynamic world. Our mission is to foster creativity, encourage
              innovation, and support every learner's personal journey.
            </p>
          </div>
          <div className="col-lg-5 col-md-10 text-center" data-aos="fade-left">
            <img
              src={MissionImg}
              alt="Mission"
              className="img-fluid rounded shadow-lg card-3d"
              style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-5" style={{ background: 'linear-gradient(to bottom right, #e6ffe6, #ccffcc)' }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div className="col-lg-5 col-md-10 text-center" data-aos="fade-right">
            <img
              src={VissionImg}
              alt="Vision"
              className="img-fluid rounded shadow-lg card-3d"
              style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-lg-6 col-md-12" data-aos="fade-left">
            <h2 className="mb-3 text-success text-center text-lg-start fw-bold">🌟 Our Vision</h2>
            <p className="lead text-muted text-center text-lg-start">
              To nurture global citizens who are confident, innovative, and compassionate leaders of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-5" style={{ background: 'linear-gradient(to bottom right, #e6ffe6, #ccffcc)' }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div className="col-lg-6 col-md-12" data-aos="fade-right">
            <h2 className="mb-3 text-success text-center text-lg-start fw-bold">About Us</h2>
            <p className="lead text-muted text-center text-lg-start">
              School of Pune is a premier institution focused on academic excellence, character
              building, and holistic development. With a legacy of 20+ years, we continue to
              inspire thousands of students every year.
            </p>
          </div>
          <div className="col-lg-5 col-md-10 text-center" data-aos="fade-left">
            <img
              src={AboutImg}
              alt="About Us"
              className="img-fluid rounded shadow-lg card-3d"
              style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-5" style={{ background: 'linear-gradient(to bottom right, #e6ffe6, #ccffcc)' }}>
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-4">
          <div className="col-lg-5 col-md-10 text-center" data-aos="fade-right">
            <img
              src={CommunityImg}
              alt="Community"
              className="img-fluid rounded shadow-lg card-3d"
              style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-lg-6 col-md-12" data-aos="fade-left">
            <h2 className="mb-3 text-success text-center text-lg-start fw-bold">Join Our Learning Community</h2>
            <p className="lead text-muted text-center text-lg-start">
              Have questions or want to enroll? Let’s get in touch!
            </p>
            <div className="text-center text-lg-start mt-3">
              <a href="/contactus" className="btn btn-outline-warning btn-lg shadow-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-4">
        <div className="container text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} School of Pune. All rights reserved.</p>
          <p className="mb-1"><a href="/privacy-policy" className="text-light">Privacy Policy</a></p>
          <p className="mb-0"><a href="/terms-of-service" className="text-light">Terms of Service</a></p>
        </div>
      </footer>

      {/* Tour Modal */}
      {showTourModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title">Campus Tour</h5>
                <button type="button" className="btn-close" onClick={() => setShowTourModal(false)}></button>
              </div>
              <div className="modal-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/8PgJKpLmQWw"
                    title="Virtual Tour"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default School;
