import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company Name</h3>
          <p>Description</p>
        </div>
        <div className="footer-section">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Info</h4>
          <p>📞 Contact 1</p>
          <p>📧 Contact 2</p>
          <p>📍 Contact 3</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p>Mon - Sat</p>
          <p>Time</p>
          <p>Closed</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
