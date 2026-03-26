import { useEffect, useState } from 'react';
import './Contact.css';

function Contact() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/images3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="image-slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
      </section>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>We are available during business hours for all sales and support requests.</p>
            
            <div className="info-item">
              <div>
                <h4>Phone</h4>
                <p>9526 62809</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Email</h4>
                <p>info@selvammotors.com</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Address</h4>
                <p>500, Kumaramangalam, Junction, Tiruchengode (TK), Namakkal (DI)-637205.</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9:00 AM - 8:00 PM | Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 2:00 PM</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <section className="map-section">
        <div className="container">
          <h2>Visit Our Store</h2>
          <a
            className="map-link"
            href="https://www.google.com/maps/search/500,+Kumaramangalam,+Junction,+Tiruchengode+(TK),+Namakkal+(DI)-637205./@11.367968,77.9284819,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            <div className="map-placeholder">
            <div className="map-content">
                <img
                  src="/img/map.png"
                  alt="Store location map"
                  className="map-preview-image"
                  loading="lazy"
                />
            </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Contact;
