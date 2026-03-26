import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const images = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/images3.jpg'
  ];

  const featureItems = [
    {
      name: 'AGRICULTURE PUMPS',
      image: '/img/home1.png',
      description: 'Efficient pumps for irrigation, borewells, and reliable farm water supply.',
      categoryKey: 'pumps'
    },
    {
      name: 'RESIDENTIAL PUMPS',
      image: '/img/home2.png',
      description: 'Quiet, dependable pumps for home water pressure and daily usage needs.',
      categoryKey: 'pumps'
    },
    {
      name: 'WIRES & CABLES',
      image: '/img/home3.png',
      description: 'Safe, durable wires and cables for stable power in every installation.',
      categoryKey: 'wires'
    },
    {
      name: 'PIPES',
      image: '/img/home4.png',
      description: 'Strong, leak-resistant pipes for water flow, plumbing, and drainage systems.',
      categoryKey: 'pipes'
    },
    {
      name: 'VALVES',
      image: '/img/home5.png',
      description: 'Precision valves for smooth flow control and long-lasting performance.',
      categoryKey: 'valves'
    },
    {
      name: 'SOLAR PUMPS',
      image: '/img/home6.png',
      description: 'Solar-powered pumps that cut energy costs and support sustainable operation.',
      categoryKey: 'pumps'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleCardNavigation = (categoryKey) => {
    navigate(`/products/${categoryKey}`);
  };

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
              <div
                className="feature-card"
                key={item.name}
                role="button"
                tabIndex={0}
                onClick={() => handleCardNavigation(item.categoryKey)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCardNavigation(item.categoryKey);
                  }
                }}
              >
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
