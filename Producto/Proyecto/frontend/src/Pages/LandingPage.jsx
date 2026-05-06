import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { serviciosData, equipoData, floresData } from '../data';
import { TarjetaEquipo } from '../components/TarjetasEquipo';
import { FloatingFlower } from '../components/Flores';
import { Comparador } from '../components/Comparador';

export default function LandingPage({ onStartBooking }) {
  return (
    <div className="min-h-screen bg-[#fdf2f8] relative overflow-x-hidden font-sans">
      
      {/* 1. LLUVIA DE FLORES (FONDO) */}
      {floresData.map((f) => (
        <FloatingFlower key={f.id} {...f} />
      ))}

      {/* 2. BARRA DE NAVEGACIÓN (NAVBAR) */}
      <nav className="relative z-20 flex justify-between items-center px-8 md:px-12 py-6 bg-white/30 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-full shadow-sm">
             <img src="/logo-pripelu.png" alt="Logo" className="w-8" />
          </div>
          <span className="text-2xl font-bold text-[#f171ab]">PriPelu</span>
        </div>
        <div className="hidden md:flex gap-10 text-gray-500 font-medium">
          <a href="#" className="hover:text-[#f171ab]">Inicio</a>
          <a href="#" className="hover:text-[#f171ab]">Servicios</a>
          <a href="#" className="hover:text-[#f171ab]">Equipo</a>
          <a href="#" className="hover:text-[#f171ab]">Galería</a>
          <a href="#" className="hover:text-[#f171ab]">Contacto</a>
        </div>
        <button onClick={onStartBooking} className="bg-[#f171ab] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#d85a94] transition-all">
          Reservar Cita
        </button>
      </nav>

{/* 3. CABECERA (HERO SECTION) */}
      <header className="relative z-10 flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-20">
        {/* Etiqueta flotante */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-pink-100/60 backdrop-blur-sm text-[#f171ab] px-5 py-1 rounded-full text-xs font-bold mb-8 flex items-center gap-2"
        >
          ✨ Experiencia Premium en Belleza
        </motion.div>

        {/* Logo Dorado Principal */}
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          src="/logo-pripelu-gold.png" alt="PriPelu Logo Dorado"
          className="w-[280px] md:w-[500px] drop-shadow-[0_20px_50px_rgba(241,113,171,0.3)] mb-10"
        />

        <p className="max-w-2xl text-gray-600 text-lg md:text-xl font-medium mb-12 leading-snug">
          Donde tu estilo cobra vida. Transformamos tu imagen con técnicas innovadoras y productos de alta gama.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-5 mb-20">
          <button onClick={onStartBooking} className="bg-[#f171ab] text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-xl hover:scale-105 transition-all">
            Reserva tu Transformación
          </button>
          <button className="bg-white border border-pink-200 text-[#f171ab] px-10 py-5 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-sm hover:bg-pink-50 transition-all">
            <div className="bg-[#f171ab] p-1 rounded-full text-white">
              <Play size={16} fill="white" />
            </div>
            Ver Video
          </button>
        </div>

        {/* Mouse Indicator (Simplificado y empujado hacia abajo) */}
        <div className="mt-auto pb-10">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
            className="border-2 border-pink-300 w-7 h-12 rounded-full flex justify-center p-1.5"
          >
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
              className="w-1 h-3 bg-pink-400 rounded-full" 
            />
          </motion.div>
        </div>
      </header>

      {/* 4. SECCIÓN SERVICIOS */}
      <section className="py-24 px-6 md:px-20 bg-white relative z-10 rounded-t-[4rem] shadow-2xl">
        <div className="text-center mb-16">
          <p className="text-[#f171ab] font-bold uppercase tracking-widest text-sm mb-2">Nuestros Servicios</p>
          <h2 className="text-5xl font-bold text-gray-800 italic">Experiencias Únicas</h2>
          <div className="w-24 h-1 bg-[#f171ab] mx-auto mt-4 rounded-full opacity-30"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {serviciosData.map((s) => (
            <motion.div key={s.id} whileHover={{ y: -12 }} className="bg-white p-10 rounded-[3rem] border border-pink-50 shadow-sm hover:shadow-2xl transition-all group">
              <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-[#f171ab] mb-6 group-hover:bg-[#f171ab] group-hover:text-white transition-all">
                {React.cloneElement(s.icon, { size: 28 })}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{s.nombre}</h3>
              <p className="text-gray-500 text-sm italic mb-8 leading-relaxed">{s.desc}</p>
              <div className="flex justify-between items-center border-t border-pink-50 pt-8">
                <span className="text-[#f171ab] font-bold text-xl italic">Desde {s.precio}</span>
                <button className="text-[#f171ab] hover:translate-x-2 transition-transform">
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SECCIÓN EQUIPO */}
      <section className="py-24 px-6 md:px-20 bg-[#fdf2f8] relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#f171ab] font-bold uppercase tracking-widest text-sm mb-2">Conoce al Equipo</p>
          <h2 className="text-5xl font-bold text-[#f171ab] italic">Artistas del Cabello</h2>
          <div className="w-24 h-1 bg-[#f171ab] mx-auto mt-4 rounded-full opacity-30"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {equipoData.map((persona) => (
            <TarjetaEquipo key={persona.id} persona={persona} />
          ))}
        </div>
      </section>

      {/* 6. SECCIÓN GALERÍA (ANTES Y DESPUÉS) */}
      <section className="py-24 px-6 bg-white relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#f171ab] font-bold uppercase tracking-widest text-sm mb-2">Resultados Reales</p>
          <h2 className="text-5xl font-bold text-gray-800 italic">Transformaciones Mágicas</h2>
          <p className="text-gray-400 mt-4">Desliza para ver el cambio de nuestras clientas</p>
        </div>

        <Comparador 
          antes="/tu-foto-antes.jpg" 
          despues="/tu-foto-despues.jpg" 
        />
      </section>

      {/* 7. PIE DE PÁGINA (FOOTER) */}
      <footer className="bg-white py-12 text-center text-gray-400 text-xs border-t border-pink-50">
        <p>© 2026 PriPelu Studio. Maipú, Santiago.</p>
      </footer>
    </div>
  );
}