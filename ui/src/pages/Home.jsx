import { useState, useEffect } from 'react';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/images3.jpg'
  ];

  const featureItems = [
    {
      name: 'AGRICULTURE PUMPS',
      image: '/img/home1.png',
      description: 'Efficient pumps for irrigation, borewells, and reliable farm water supply.'
    },
    {
      name: 'RESIDENTIAL PUMPS',
      image: '/img/home2.png',
      description: 'Quiet, dependable pumps for home water pressure and daily usage needs.'
    },
    {
      name: 'WIRES & CABLES',
      image: '/img/home3.png',
      description: 'Safe, durable wires and cables for stable power in every installation.'
    },
    {
      name: 'PIPES',
      image: '/img/home4.png',
      description: 'Strong, leak-resistant pipes for water flow, plumbing, and drainage systems.'
    },
    {
      name: 'VALVES',
      image: '/img/home5.png',
      description: 'Precision valves for smooth flow control and long-lasting performance.'
    },
    {
      name: 'SOLAR PUMPS',
      image: '/img/home6.png',
      description: 'Solar-powered pumps that cut energy costs and support sustainable operation.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <section className="hero">
        <div className="image-slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero-content">
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            {featureItems.map((item) => (
              <div className="feature-card" key={item.name}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="feature-image"
                  loading="lazy"
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
