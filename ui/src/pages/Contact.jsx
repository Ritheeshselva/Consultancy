import { useEffect, useState } from 'react';
import './Contact.css';

function Contact() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Our team will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

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
                <p>+91 98765 43210</p>
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
                <p>Selvam Electricals and Motors, Main Road, Tamil Nadu</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9:00 AM - 8:00 PM | Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 2:00 PM</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">📘</a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">📷</a>
                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube">▶️</a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp">💬</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send an Enquiry</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Product enquiry / service request"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Share your requirement with quantity, model, or capacity"
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <section className="map-section">
        <div className="container">
          <h2>Visit Our Store</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h3>Selvam Electricals and Motors</h3>
              <p>Main Road, Tamil Nadu</p>
              <p className="map-note">Google Maps integration can be added here.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
