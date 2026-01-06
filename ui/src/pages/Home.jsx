import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Title Here</h1>
          <p className="hero-subtitle">Subtitle</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">Button 1</Link>
            <Link to="/contact" className="btn btn-secondary">Button 2</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Section Title</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Feature 1</h3>
              <p>Description</p>
            </div>
            <div className="feature-card">
              <h3>Feature 2</h3>
              <p>Description</p>
            </div>
            <div className="feature-card">
              <h3>Feature 3</h3>
              <p>Description</p>
            </div>
            <div className="feature-card">
              <h3>Feature 4</h3>
              <p>Description</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>CTA Section</h2>
          <p>Description</p>
          <Link to="/contact" className="btn btn-light">Button</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
