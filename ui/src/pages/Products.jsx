import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productCategories } from '../data/productCatalog';
import './Products.css';

function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
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

  const navigateToCategory = (categoryKey) => {
    navigate(`/products/${categoryKey}`);
  };

  return (
    <div className="products">
      <section className="products-hero">
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
        <nav className="product-subnav" aria-label="Product categories">
          {productCategories.map((product) => (
            <button
              key={product.id}
              type="button"
              className="product-subnav-link"
              onClick={() => navigateToCategory(product.key)}
            >
              {product.name}
            </button>
          ))}
        </nav>

        <div className="products-grid">
          {productCategories.map(product => (
            <div
              key={product.id}
              className="product-card"
              role="button"
              tabIndex={0}
              onClick={() => navigateToCategory(product.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigateToCategory(product.key);
                }
              }}
            >
              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="product-content">
                <h3>{product.name}</h3>
                <div className="product-footer">
                  <button
                    className="btn-enquiry"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigateToCategory(product.key);
                    }}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="product-cta">
        <div className="container">
          <h2>Need Help Choosing the Right Product?</h2>
          <p>Talk to our team for model selection, pricing, and installation support.</p>
          <a href="/contact" className="btn btn-light">Contact Sales</a>
        </div>
      </section>
    </div>
  );
}

export default Products;
