// src/App.tsx
import React, { useState } from 'react';
import './styles/App.css';
import ClientsForm from './components/ClientsForm';
import DiscountDisplay from './components/DiscountsDisplay';
import ProductInterestForm from './components/ProductInterestForm';
import Banner from './components/Banner';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Swal from 'sweetalert2';


interface Product {
  id: number;
  nombre: string;
  tipo: string;
  precio: number;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [clientData, setClientData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fecha: '',
    numero: '',
  });
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<{ id_producto: number; descuento: number }[]>([]);

  const handleClientDataChange = (data: any) => {
    setClientData(data);
  };

  const handleSelectedProductsChange = (products: Product[]) => {
    setSelectedProducts(products);
  };

  const handleDiscountsChange = (discounts: { id_producto: number; descuento: number }[]) => {
    setDiscounts(discounts);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Ahora puedes ingresar con tus credenciales.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setClientData({
      nombre: '',
      apellido: '',
      correo: '',
      fecha: '',
      numero: '',
    });
    setSelectedProducts([]);
    setDiscounts([]);
    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleSubmit = async () => {
    const clientDataToSend = {
      ...clientData,
      productos: discounts
    };

    console.log(clientDataToSend);

    try {
      const response = await fetch('https://us-central1-ardent-gate-430705-p3.cloudfunctions.net/insert_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientDataToSend),
      });
      const result = await response.json();
      console.log('Server response:', result);

      Swal.fire({
        title: '¡Gracias por registrarte!',
        text: 'Tu información ha sido registrada exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (error) {
      console.error('Error submitting form:', error);

      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al registrar tu información. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <Banner />
        {showRegister ? (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Volver a Ingresar' : 'Registrar nuevo usuario'}
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Banner />
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      <div className="form-container">
        <div className="form-section">
          <h1>1. Ingrese su información</h1>
          <ClientsForm onClientDataChange={handleClientDataChange} />
        </div>
        <div className="form-section">
          <h1>2. Seleccione Servicios y Productos de su interés</h1>
          <ProductInterestForm onSelectedProductsChange={handleSelectedProductsChange} />
        </div>
        <div className="form-section">
          <h1>3. Descuentos:</h1>
          <DiscountDisplay selectedProducts={selectedProducts} onDiscountsChange={handleDiscountsChange} />
        </div>
        <button onClick={handleSubmit} className="confirm-button">CONFIRMAR ASISTENCIA</button>
      </div>
      <Footer />
    </div>
  );
};

export default App;