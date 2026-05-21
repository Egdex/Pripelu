import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !email || !password || !telefono) {
      alert('Por favor, rellena todos los campos');
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          email: email,
          contrasena: password, 
          telefono: telefono,
          rol: 'cliente' 
        }),
      });

      if (respuesta.ok) {
        alert('¡Cuenta creada con éxito, máquina! Ahora inicia sesión.');
        navigate('/login'); 
      } else {
        const errorData = await respuesta.json().catch(() => ({}));
        alert(`Error al registrar: ${errorData.message || 'Revisa los datos o si el correo ya existe'}`);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un problema de red al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border border-pink-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-serif text-[#b02a6b] italic mb-2">Únete a PriPelu</h2>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Crea tu cuenta de cliente</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-[#b02a6b] font-bold text-xs ml-2">Nombre</label>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-3 rounded-xl border border-pink-100 outline-none focus:border-[#f171ab] bg-pink-50/30 text-sm"
                placeholder="Tu nombre"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-[#b02a6b] font-bold text-xs ml-2">Apellido</label>
              <input 
                type="text" 
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="p-3 rounded-xl border border-pink-100 outline-none focus:border-[#f171ab] bg-pink-50/30 text-sm"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#b02a6b] font-bold text-sm ml-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-xl border border-pink-100 outline-none focus:border-[#f171ab] bg-pink-50/30"
              placeholder="tu@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#b02a6b] font-bold text-sm ml-2">Teléfono</label>
            <input 
              type="tel" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="p-3 rounded-xl border border-pink-100 outline-none focus:border-[#f171ab] bg-pink-50/30"
              placeholder="+56912345678"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[#b02a6b] font-bold text-sm ml-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-xl border border-pink-100 outline-none focus:border-[#f171ab] bg-pink-50/30"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="bg-[#f171ab] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#d85a94] transition-all mt-3"
          >
            Registrarse
          </button>
          
          <p className="text-center mt-4 text-gray-500 text-sm">
            ¿Ya tienes una cuenta? <a href="/login" className="text-[#f171ab] font-bold">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}