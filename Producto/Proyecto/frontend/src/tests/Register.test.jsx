import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router-dom';

import Register from '../Pages/Register.jsx'; 

afterEach(() => {
  cleanup();
});

describe('Pruebas Funcionales - Formulario de Registro (Basado en Plan QA)', () => {

  test('CP-20: Debe bloquear el envío y mostrar error si los campos obligatorios están vacíos', async () => {
    // Envolvemos en MemoryRouter porque el Register usa useNavigate()
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // 1. Buscamos el botón de registro
    const btnRegistrar = screen.getByRole('button', { name: /Registrarse/i });
    
    // 2. Simulamos que el usuario le hace clic DIRECTO sin escribir nada (Datos Vacíos / NULL)
    fireEvent.click(btnRegistrar);

    // 3. Resultado Esperado (según Excel): El frontend intercepta y tira mensaje de error
    const mensajeError = await screen.findByText(/Por favor, rellena todos los campos obligatorios/i);
    expect(mensajeError).toBeInTheDocument();
  });

  test('CP-18: Debe rebotar el formulario si la estructura del correo electrónico es inválida', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // 1. Llenamos los campos usando fireEvent.change para simular el teclado
    fireEvent.change(screen.getByPlaceholderText(/Tu nombre/i), { target: { value: 'Tomas' } });
    fireEvent.change(screen.getByPlaceholderText(/Tu apellido/i), { target: { value: 'Heise' } });
    fireEvent.change(screen.getByPlaceholderText(/\+56912345678/i), { target: { value: '912345678' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'secreta123' } });

    // 2. Ponemos un correo MALO a propósito (sin arroba ni .com)
   // 2. Ponemos un correo MALO a propósito (sin arroba ni .com)
    fireEvent.change(screen.getByPlaceholderText(/tu@email.com/i), { target: { value: 'correo_malo_sin_formato' } });

    // 3. LA MAGIA AQUÍ: Buscamos el formulario y forzamos el submit directo
    const btnRegistrar = screen.getByRole('button', { name: /Registrarse/i });
    fireEvent.submit(btnRegistrar.closest('form')); // Bypassea el bloqueo nativo

    // 4. Resultado Esperado: Bloqueo y mensaje de formato inválido
    const mensajeError = await screen.findByText(/Ingresa un correo electrónico válido/i);
    expect(mensajeError).toBeInTheDocument();
  });

});