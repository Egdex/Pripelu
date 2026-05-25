import React from 'react';
import { describe, test, expect, afterEach } from 'vitest'; 
// AQUI: Agregamos cleanup a la importación
import { render, screen, cleanup } from '@testing-library/react'; 
import '@testing-library/jest-dom/vitest'; 

import BookingForm from "../Pages/BookingForm.jsx"; 

// Esto limpia el "fantasma" del componente anterior para que no se dupliquen
afterEach(() => {
  cleanup();
});

describe('Pruebas en el componente BookingForm', () => {

  test('Debe mostrar el mensaje de carga inicial en vez del formulario', () => {
    render(<BookingForm />);
    
    // Al abrir el modal, lo primero que sale es el texto de "Conectando..."
    const mensajeCarga = screen.getByText(/Conectando con el sistema/i);
    expect(mensajeCarga).toBeInTheDocument();
  });

  test('El título del formulario debe existir en el documento', () => {
    render(<BookingForm />);
    
    // El título principal siempre está visible arriba
    const titulo = screen.getByText(/Tu Nueva Imagen te Espera/i);
    expect(titulo).toBeInTheDocument();
  });

});