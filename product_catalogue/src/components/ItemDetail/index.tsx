import { useParams, useNavigate } from 'react-router';
import { ImageWithFallback } from '../FallbackImage';
import './index.css';
import productData from '../../imports/product-data.json';

interface ItemProp {
  label: string;
  value: string;
}

interface Product {
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
}

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products: Product[] = productData;

  const productIndex = parseInt(id || '0', 10);
  const product = products[productIndex];

  if (!product) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2 className="not-found-title">Product Not Found</h2>
          <button onClick={() => navigate('/')} className="not-found-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-wrapper">
        <button onClick={() => navigate('/')} className="back-button">
          <span className="back-icon">←</span> Back to Categories
        </button>

        <div className="detail-card">
          <div className="detail-grid">
            <div className="detail-image-section">
              <ImageWithFallback
                src={product.image}
                alt={product.itemname}
                className="detail-image"
              />
            </div>

            <div className="detail-info-section">
              <span className="category-badge">{product.category}</span>

              <h1 className="detail-product-name">{product.itemname}</h1>

              <h2 className="specs-title">Specifications</h2>

              <div className="specs-list">
                {product.itemprops.map((prop, index) => (
                  <div key={index} className="spec-row">
                    <div className="spec-label">{prop.label}</div>
                    <div className="spec-value">{prop.value}</div>
                  </div>
                ))}
              </div>

              <div className="additional-info">
                <p className="additional-info-text">
                  This {product.category.toLowerCase().slice(0, -1)} features {product.itemprops.length} detailed specifications
                  to help you make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
