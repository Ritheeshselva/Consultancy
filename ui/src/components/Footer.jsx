import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>SELVAM ELECTRICALS AND MOTORS</h3>
          <p>Your trusted partner for electrical solutions and motor repairs</p>
        </div>
        <div className="footer-section">
          <h4>Info</h4>
          <p>📞 +91 98765 43210</p>
          <p>
            📧{' '}
            <a className="footer-contact-link" href="mailto:info@selvammotors.com">
              info@selvammotors.com
            </a>
          </p>
          <p>📍 Selvam Electricals, Main Road, Tamil Nadu</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
          <p>Saturday: 9:00 AM - 6:00 PM</p>
          <p>Sunday: 10:00 AM - 2:00 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Selvam Electricals And Motors. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
