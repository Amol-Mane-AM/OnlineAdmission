import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import './SchoolGallery.css';
import schoollogo from '../Dashboard/Img/Universitylogo.jpeg';

// Import images
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

const imageList = [
  { id: 1, src: img1, category: 'Campus' },
  { id: 2, src: img2, category: 'Events' },
  { id: 3, src: img3, category: 'Academic' },
  { id: 4, src: img4, category: 'Campus' },
  { id: 5, src: img5, category: 'Sports' },
  { id: 6, src: img6, category: 'Events' },
  { id: 7, src: img7, category: 'Academic' },
  { id: 8, src: img8, category: 'Sports' },
  { id: 9, src: img9, category: 'Campus' },
  { id: 10, src: img10, category: 'Events' },
];

function SchoolGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(imageList[index]);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % imageList.length;
    setCurrentIndex(newIndex);
    setSelectedImage(imageList[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    setCurrentIndex(newIndex);
    setSelectedImage(imageList[newIndex]);
  };

  return (
    <div className="gallery-page">
      {/* Hero Header */}
      <div className="gallery-header" data-aos="fade-down">
        <img src={schoollogo} alt="School Logo" className="school-logo" />
        <h1>Our Moments</h1>
        <p>Capturing the spirit of learning and growth</p>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-container">
        <div className="gallery-masonry">
          {imageList.map((img, index) => (
            <div
              key={img.id}
              className="gallery-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onClick={() => openLightbox(index)}
            >
              <img src={img.src} alt={`Gallery ${img.id}`} />
              <div className="overlay">
                <div className="view-btn">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="close-btn" onClick={closeLightbox}>
            <X size={32} />
          </div>

          <button className="nav-btn prev-btn" onClick={prevImage}>
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt="Full View" className="lightbox-img" />
          </div>

          <button className="nav-btn next-btn" onClick={nextImage}>
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}

export default SchoolGallery;
