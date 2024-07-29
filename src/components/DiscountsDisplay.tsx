import React, { useEffect } from 'react';
import '../styles/DiscountsDisaplay.css';

interface Product {
  id: number;
  nombre: string;
  tipo: string; // Puede ser 'producto' o 'servicio'
  precio: number | string;
}

interface DiscountsDisplayProps {
  selectedProducts: Product[];
  onDiscountsChange: (discounts: { id_producto: number; descuento: number }[]) => void;
}

const DiscountsDisplay: React.FC<DiscountsDisplayProps> = ({ selectedProducts, onDiscountsChange }) => {
  const services = selectedProducts.filter((product) => product.tipo === 'Servicio');
  const products = selectedProducts.filter((product) => product.tipo === 'Producto');

  const serviceDiscount = () => {
    const totalServicePrice = services.reduce((sum, service) => {
      const price = typeof service.precio === 'string' ? parseFloat(service.precio) : service.precio;
      return sum + price;
    }, 0);

    if (services.length >= 2 && totalServicePrice > 1500) {
      return 0.05;
    } else if (services.length >= 2) {
      return 0.03;
    }
    return 0;
  };

  const productDiscount = () => {
    if (products.length >= 5) {
      return 0.05;
    } else if (products.length >= 3) {
      return 0.03;
    }
    return 0;
  };

  useEffect(() => {
    const calculatedDiscounts = [
      ...services.map(service => ({
        id_producto: service.id,
        descuento: serviceDiscount() * 100 // % Discount
      })),
      ...products.map(product => ({
        id_producto: product.id,
        descuento: productDiscount() * 100 // % Discount
      }))
    ];
    onDiscountsChange(calculatedDiscounts);
  }, [selectedProducts]);

  const totalServiceDiscount = serviceDiscount() * 100;
  const totalProductDiscount = productDiscount() * 100;

  return (
    <div className="discounts-container">
      <h2>Descuentos para Productos Seleccionados</h2>
      <div>
        <div className="discount-item">
          <span className="discount-type">Descuento por Servicios:</span>
          <span className="discount-amount">{totalServiceDiscount.toFixed(0)}%</span>
        </div>
        <div className="discount-item">
          <span className="discount-type">Descuento por Productos:</span>
          <span className="discount-amount">{totalProductDiscount.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountsDisplay;