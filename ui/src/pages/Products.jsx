import './Products.css';

function Products() {
  const products = [
    { id: 1, name: 'Item 1', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 2, name: 'Item 2', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 3, name: 'Item 3', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 4, name: 'Item 4', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 5, name: 'Item 5', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 6, name: 'Item 6', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 7, name: 'Item 7', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] },
    { id: 8, name: 'Item 8', category: 'Category', price: '₹0', image: '📦', specs: ['Spec 1', 'Spec 2', 'Spec 3'] }
  ];

  return (
    <div className="products">
      <section className="products-hero">
        <h1>Section Title</h1>
        <p>Description</p>
      </section>

      <div className="container">
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
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
                  <button className="btn-enquiry">Button</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="product-cta">
        <div className="container">
          <h2>CTA Section</h2>
          <p>Description</p>
          <a href="/contact" className="btn btn-light">Button</a>
        </div>
      </section>
    </div>
  );
}

export default Products;
