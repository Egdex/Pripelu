import React from 'react';
import { describe, test, expect } from 'vitest'; // <-- ESTA ES LA LÍNEA MÁGICA QUE FALTABA
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BookingForm from "../Pages/BookingForm.jsx";

afterEach(() => {
  cleanup();
});

// Describimos qué vamos a probar
describe('Pruebas en el componente BookingForm', () => {

  test('El botón de continuar al pago debe estar deshabilitado al iniciar', () => {
    // 1. Renderizamos (dibujamos) el componente en una pantalla virtual
    render(<BookingForm />);

    // 2. Buscamos el botón en la pantalla usando su texto
    const botonContinuar = screen.getByRole('button', { name: /Continuar al Pago/i });

    // 3. Afirmamos lo que esperamos que pase (que esté bloqueado)
    expect(botonContinuar).toBeDisabled();
  });

  test('El título del formulario debe cargarse correctamente', () => {
    render(<BookingForm />);
    
    // Buscamos que el título principal exista en la pantalla
    const titulo = screen.getByText(/Tu Nueva Imagen te Espera/i);
    
    // Afirmamos que está en el documento
    expect(titulo).toBeInTheDocument();
  });

});