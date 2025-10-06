import React from 'react';
import './SchoolGallery.css';
import schoollogo from '../Dashboard/Img/Universitylogo.jpeg'; // Adjust the path as necessary

import img1 from '../Gallery/GalleryImg/img1.jpg';
import img2 from '../Gallery/GalleryImg/img2.jpg';
import img3 from '../Gallery/GalleryImg/img3.jpg';
import img4 from '../Gallery/GalleryImg/img4.jpg';
import img5 from '../Gallery/GalleryImg/img5.jpeg';
import img6 from '../Gallery/GalleryImg/img6.jpg';
import img7 from '../Gallery/GalleryImg/img7.jpeg';
import img8 from '../Gallery/GalleryImg/img8.jpg';
import img9 from '../Gallery/GalleryImg/img9.jpeg';
import img10 from '../Gallery/GalleryImg/img10.jpeg';
import img11 from '../Gallery/GalleryImg/img11.jpg';


const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9 ,img10];

function SchoolGallery() {
  return (
    <div className="container gallery-page hero-section position-relative">
      <div className="gallery-header">
        <img src={schoollogo} alt="Logo" className="school-logo" style={{width:200,height:180,marginLeft:50,marginTop:0}}/>
        <h1>Gallery</h1>
        <p>Inspiring the Moments</p>
      </div>

      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchoolGallery;
