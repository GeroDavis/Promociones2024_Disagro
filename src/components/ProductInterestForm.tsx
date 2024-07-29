// src/components/ProductInterestForm.tsx
import React, { useState, useEffect } from 'react';
import '../styles/ProductInterestForm.css';

interface Product {
  id: number;
  nombre: string;
  tipo: string; // Puede ser 'producto' o 'servicio'
  precio: number;
}

interface ProductInterestFormProps {
  onSelectedProductsChange: (selectedProducts: Product[]) => void;
}

const ProductInterestForm: React.FC<ProductInterestFormProps> = ({ onSelectedProductsChange }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Realiza la llamada a la API para obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://us-central1-ardent-gate-430705-p3.cloudfunctions.net/query_products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ table: 'Productos' })
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = (product: Product) => {
    const updatedSelectedProducts = selectedProducts.includes(product)
      ? selectedProducts.filter((p) => p.id !== product.id)
      : [...selectedProducts, product];

    setSelectedProducts(updatedSelectedProducts);
    onSelectedProductsChange(updatedSelectedProducts);
  };

  const handleDeselectAll = () => {
    setSelectedProducts([]);
    onSelectedProductsChange([]);
  };

  return (
    <form>
      <h2>Seleccione Servicios y Productos de su interés</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <label>
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleCheckboxChange(product)}
              />
              <span className="product-name">{product.nombre}</span>
              <span className="product-type">Tipo: {product.tipo}</span>
              <span className="product-price">Precio: ${product.precio}</span>
            </label>
          </div>
        ))}
      </div>
      <button type="button" onClick={handleDeselectAll}>Deseleccionar Todos</button>
    </form>
  );
};

export default ProductInterestForm;