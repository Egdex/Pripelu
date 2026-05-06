import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Comparador = ({ antes, despues }) => {
  const [sliderPos, setSliderPos] = useState(50); // Empieza al medio (50%)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100)); // Mantiene el valor entre 0 y 100
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl cursor-col-resize select-none border-4 border-[#D4AF37]"
      onMouseMove={handleMove}
      onTouchMove={(e) => handleMove(e.touches[0])}
    >
      {/* IMAGEN DESPUÉS (Fondo) */}
      <img src={despues} 
      alt="Después"
       className="absolute inset-0 w-full h-full object-cover object-center" />

      {/* IMAGEN ANTES (Capa superior recortada) */}
      <div 
        className="absolute inset-0 w-full h-full object-cover overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={antes} 
        alt="Antes" 
        className="w-full h-full object-cover object-center" />
      </div>

      {/* LA LÍNEA / PALO DIVISOR */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
        style={{ left: `${sliderPos}%` }}
      >
        {/* El circulito con las flechas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-pink-200">
          <div className="flex gap-1">
            <span className="text-pink-400 font-bold text-xs">{"<"}</span>
            <span className="text-pink-400 font-bold text-xs">{">"}</span>
          </div>
        </div>
      </div>

      {/* Etiquetas flotantes */}
      <div className="absolute bottom-6 left-6 z-30 bg-black/30 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Antes</div>
      <div className="absolute bottom-6 right-6 z-30 bg-pink-500/50 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Después</div>
    </div>
  );
};