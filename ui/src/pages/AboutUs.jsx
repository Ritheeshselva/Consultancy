import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const images = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/images3.jpg'
  ];

  const services = [
    { id: 1, icon: '🔧', title: 'Agriculture Pump Solutions', features: ['Openwell and borewell pump sets', 'Field-ready installation support', 'Energy-efficient motor options', 'Spare parts and maintenance support'] },
    { id: 2, icon: '⚡', title: 'Residential Water Systems', features: ['Domestic booster and monoblock pumps', 'Overhead tank filling solutions', 'Low-noise and compact models', 'Quick service assistance'] },
    { id: 3, icon: '🔌', title: 'Wires and Cables Supply', features: ['FRLS house wiring products', 'Industrial-grade cable options', 'Reliable branded materials', 'Safe and durable electrical performance'] },
    { id: 4, icon: '🛠️', title: 'Pipes and Plumbing Range', features: ['UPVC and CPVC pipe varieties', 'Strong fittings and accessories', 'Leak-resistant plumbing solutions', 'Suitable for home and farm use'] },
    { id: 5, icon: '🎛️', title: 'Valves and Flow Control', features: ['Ball, gate, and check valve options', 'Accurate flow regulation', 'Durable body and sealing quality', 'Ready stock for common sizes'] },
    { id: 6, icon: '📊', title: 'Solar Pumping Systems', features: ['Solar submersible pump packages', 'Lower running cost setup', 'Ideal for remote agricultural lands', 'Guidance on setup and commissioning'] }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about-us">
      <section className="about-us-hero">
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
        <div className="about-us-intro">
          <h2>Who We Are</h2>
          <p>We provide quality products, practical guidance, and dependable service for agriculture, residential, and commercial customers.</p>
        </div>

        <div className="about-us-grid">
          {services.map(service => (
            <div key={service.id} className="about-us-card">
              <h3>{service.title}</h3>
              <ul className="about-us-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="btn-about-us"
                onClick={() =>
                  navigate('/contact', {
                    state: {
                      subject: service.title,
                      message: `I need more details about ${service.title}.`
                    }
                  })
                }
              >
                Get Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="why-choose">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">👨‍🔧</div>
              <h4>Technical Product Guidance</h4>
              <p>Our team helps you choose the right model based on your exact requirement.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">⏰</div>
              <h4>Quick Response</h4>
              <p>Fast quotation and service coordination to avoid project delays.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✅</div>
              <h4>Trusted Product Quality</h4>
              <p>We supply reliable products suitable for long-term daily use.</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💵</div>
              <h4>Competitive Pricing</h4>
              <p>Best-value options across all major categories and capacities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-us-cta">
        <div className="container">
          <h2>Ready to Discuss Your Requirement?</h2>
          <p>Contact our team for product recommendations, pricing, and availability.</p>
          <a href="/contact" className="btn btn-light">Talk to Us</a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
  