import { useEffect, useState } from 'react';
import './Products.css';

function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/images3.jpg'
  ];

  const products = [
    { id: 1, name: 'Openwell Submersible Pump', category: 'AGRICULTURE PUMPS', price: 'From ₹18,500', image: '/img/p1.png', specs: ['Single/Three Phase', 'High Head Performance', 'Copper Winding'] },
    { id: 2, name: 'Domestic Pressure Booster', category: 'RESIDENTIAL PUMPS', price: 'From ₹7,900', image: '/img/p2.png', specs: ['Auto Pressure Control', 'Low Noise Operation', 'Compact Design'] },
    { id: 3, name: 'FRLS House Wire', category: 'WIRES & CABLES', price: 'From ₹1,450/coil', image: '/img/p3.png', specs: ['Flame Retardant', '99.97% Copper', 'Multi Strand Flexibility'] },
    { id: 4, name: 'PVC Insulated Cable', category: 'WIRES & CABLES', price: 'From ₹3,200/roll', image: '/img/p4.png', specs: ['Heavy Duty Sheath', 'Heat Resistant', 'Long Service Life'] },
    { id: 5, name: 'UPVC Plumbing Pipe', category: 'PIPES', price: 'From ₹280/length', image: '/img/p5.png', specs: ['Corrosion Resistant', 'High Flow Capacity', 'Leak Safe Joints'] },
    { id: 6, name: 'CPVC Hot Water Pipe', category: 'PIPES', price: 'From ₹390/length', image: '/img/p6.png', specs: ['Suitable For Hot Water', 'Pressure Grade Pipe', 'Easy Installation'] },
    { id: 7, name: 'Brass Ball Valve', category: 'VALVES', price: 'From ₹420', image: '/img/p7.png', specs: ['Quarter Turn Operation', 'Leak Tight Seal', 'Long Cycle Life'] },
    { id: 8, name: 'Solar Submersible Pump Set', category: 'SOLAR PUMPS', price: 'From ₹68,000', image: '/img/p8.png', specs: ['DC Motor Technology', 'Works In Low Sunlight', 'Ideal For Borewell Use'] }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

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
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              </div>
              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-specs">
                  {product.specs.map((spec, index) => (
                    <span key={index} className="spec-badge">{spec}</span>
                  ))}
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button className="btn-enquiry">Enquire Now</button>
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
