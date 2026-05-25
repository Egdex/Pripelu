import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// IMPORTANTE: Ajusta la ruta si tu componente está en otra carpeta
import ProtectedRoute from '../components/ProtectedRute.jsx'; 

describe('Pruebas en ProtectedRoute', () => {
  
  afterEach(() => {
    cleanup();
    // Limpiamos la memoria del navegador después de cada prueba
    localStorage.clear(); 
  });

  test('Debe bloquear el paso y redirigir al login si es un intruso', () => {
    // 1. Simulamos que NO hay sesión
    localStorage.setItem('isAuthenticated', 'false');

    // 2. Armamos un mini-navegador con una zona pública y una secreta
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<h1>Página de Login</h1>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <h1>Panel Secreto de Administración</h1>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );

    // 3. El guardia debió patearnos al Login
    expect(screen.getByText(/Página de Login/i)).toBeInTheDocument();
    // 4. El panel secreto NO debe estar en la pantalla
    expect(screen.queryByText(/Panel Secreto/i)).not.toBeInTheDocument();
  });

  test('Debe dejar pasar al usuario si tiene la sesión iniciada', () => {
    // 1. Simulamos que SÍ hay sesión correcta
    localStorage.setItem('isAuthenticated', 'true');

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <h1>Panel Secreto de Administración</h1>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </MemoryRouter>
    );

    // 3. El guardia nos dejó pasar y vemos el panel
    expect(screen.getByText(/Panel Secreto de Administración/i)).toBeInTheDocument();
  });

});