import './Services.css';

function Services() {
  const services = [
    { id: 1, icon: '🔧', title: 'Service 1', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 2, icon: '⚡', title: 'Service 2', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 3, icon: '🔌', title: 'Service 3', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 4, icon: '🛠️', title: 'Service 4', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 5, icon: '🎛️', title: 'Service 5', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 6, icon: '📊', title: 'Service 6', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] }
  ];

  return (
    <div className="services">
      <section className="services-hero">
        <h1>Section Title</h1>
        <p>Description</p>
      </section>

      <div className="container">
        <div className="services-intro">
          <h2>Heading</h2>
          <p>Description</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn-service">Button</button>
            </div>
          ))}
        </div>
      </div>

      <section className="why-choose">
        <div className="container">
          <h2>Heading</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <div className="benefit-icon">👨‍🔧</div>
              <h4>Benefit 1</h4>
              <p>Description</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">⏰</div>
              <h4>Benefit 2</h4>
              <p>Description</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">✅</div>
              <h4>Benefit 3</h4>
              <p>Description</p>
            </div>
            <div className="benefit">
              <div className="benefit-icon">💵</div>
              <h4>Benefit 4</h4>
              <p>Description</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="container">
          <h2>CTA Section</h2>
          <p>Description</p>
          <a href="/contact" className="btn btn-light">Button</a>
        </div>
      </section>
    </div>
  );
}

export default Services;
