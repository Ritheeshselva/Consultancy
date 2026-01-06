import { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
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
        <h1>Contact</h1>
        <p>Description</p>
      </section>

      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Info Section</h2>
            <p>Description</p>
            
            <div className="info-item">
              <div>
                <h4>Info 1</h4>
                <p>Content</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Info 2</h4>
                <p>Content</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Info 3</h4>
                <p>Content</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <h4>Info 4</h4>
                <p>Content</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Social</h4>
              <div className="social-icons">
                <a href="#" className="social-icon">📘</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">🐦</a>
                <a href="#" className="social-icon">💼</a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Form</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Input 1 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Placeholder"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Input 2 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Placeholder"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Input 3</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Placeholder"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Input 4 *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Placeholder"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Input 5 *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Placeholder"
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">Button</button>
            </form>
          </div>
        </div>
      </div>

      <section className="map-section">
        <div className="container">
          <h2>Map Section</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h3>Title</h3>
              <p>Content</p>
              <p className="map-note">Map area</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
