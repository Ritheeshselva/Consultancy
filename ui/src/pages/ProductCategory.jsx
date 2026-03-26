import { Link, useNavigate, useParams } from 'react-router-dom';
import { productCategories } from '../data/productCatalog';
import './ProductCategory.css';

function ProductCategory() {
  const navigate = useNavigate();
  const { categoryKey } = useParams();
  const category = productCategories.find((item) => item.key === categoryKey);

  if (!category) {
    return (
      <div className="product-category-page">
        <div className="product-category-container">
          <h1>Category Not Found</h1>
          <p>The requested product category does not exist.</p>
          <Link to="/products" className="back-to-products">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-category-page">
      <div className="product-category-container">
        <div className="product-category-header">
          <h1>{category.name} PRODUCTS</h1>
          <p>Choose any product below and contact us for enquiry.</p>
          <Link to="/products" className="back-to-products">
            Back to Products
          </Link>
        </div>

        <div className="category-product-grid">
          {category.items.map((item) => (
            <div
              key={item.name}
              className="category-product-card"
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate('/contact', {
                  state: {
                    subject: `${category.name} - ${item.name}`,
                    message: `I am interested in ${item.name} from ${category.name}.`
                  }
                })
              }
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  navigate('/contact', {
                    state: {
                      subject: `${category.name} - ${item.name}`,
                      message: `I am interested in ${item.name} from ${category.name}.`
                    }
                  });
                }
              }}
            >
              <div className="category-product-image-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
