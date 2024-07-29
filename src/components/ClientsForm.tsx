// src/components/ClientForm.tsx
import React, { useState } from 'react';
import '../styles/ClientForm.css';

interface ClientFormProps {
    onClientDataChange: (formData: any) => void;
  }

const ClientsForm: React.FC<ClientFormProps> = ({ onClientDataChange }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        fecha: '',
        numero: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(newFormData);
        onClientDataChange(newFormData);
      };
    
      return (
        <form>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          <label>
            Apellido:
            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
          </label>
          <label>
            Correo:
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
          </label>
          <label>
            Fecha:
            <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
          </label>
          <label>
            Teléfono:
            <input type="tel" name="numero" value={formData.numero} onChange={handleChange} />
          </label>
        </form>
      );
    };
  
  export default ClientsForm;