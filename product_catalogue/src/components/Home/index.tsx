import { useNavigate } from 'react-router-dom';
import productData from '../../imports/product-data.json';
import './index.css';
import { ImageWithFallback } from '../FallbackImage';

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

export default function Home() {
  const navigate = useNavigate();
  const products: Product[] = productData;

  const categories = Array.from(new Set(products.map(p => p.category)));

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  const handleItemClick = (index: number) => {
    navigate(`/item/${index}`);
  };

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <header className="home-header">
          <h1 className="home-title">Product Catalog</h1>
          <p className="home-subtitle">Browse through our curated collection</p>
        </header>

        {categories.map((category) => {
          const categoryProducts = getProductsByCategory(category);

          return (
            <section key={category} className="category-section">
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
                <p className="category-count">
                  {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'} available
                </p>
              </div>

              <div className="products-grid">
                {categoryProducts.map((product) => {
                  const productIndex = products.indexOf(product);

                  return (
                    <div
                      key={productIndex}
                      onClick={() => handleItemClick(productIndex)}
                      className="product-card"
                    >
                      <div className="product-image-container">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.itemname}
                          className="product-image"
                        />
                      </div>

                      <div className="product-info">
                        <h3 className="product-name">{product.itemname}</h3>

                        <div className="product-preview-props">
                          {product.itemprops.slice(0, 2).map((prop, idx) => (
                            <div key={idx} className="preview-prop">
                              <span className="preview-prop-label">{prop.label}:</span>
                              <span className="preview-prop-value">{prop.value}</span>
                            </div>
                          ))}
                          {product.itemprops.length > 2 && (
                            <div className="more-details">
                              +{product.itemprops.length - 2} more details
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
