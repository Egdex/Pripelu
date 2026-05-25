import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import Servicios from '../components/Servicios.jsx'; 

afterEach(() => {
  cleanup();
});

describe('Pruebas en el componente Servicios', () => {

  test('Debe mostrar el título principal del catálogo', () => {
    render(<Servicios />);
    const titulo = screen.getByText(/Nuestro Catálogo/i);
    expect(titulo).toBeInTheDocument();
  });

  test('Debe mostrar el mensaje de carga inicial', () => {
    render(<Servicios />);
    const mensajeCarga = screen.getByText(/Cargando la magia/i);
    expect(mensajeCarga).toBeInTheDocument();
  });

});