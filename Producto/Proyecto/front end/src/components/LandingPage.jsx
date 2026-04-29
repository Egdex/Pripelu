
import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Star, MapPin, Clock } from 'lucide-react';

export default function LandingPage({ onStartBooking }) {
  return (
    <div className="min-h-screen bg-white">
      {/*Bienvenida*/}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-pink-50 opacity-50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-pripelu-gold italic mb-4">Pripelu</h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light tracking-[0.2em] uppercase mb-8">
            Estilo • Elegancia • Vanguardia
          </p>
          <button 
            onClick={onStartBooking}
            className="bg-pripelu-gold text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-pripelu-pink/50"
          >
            Reservar Experiencia
          </button>
        </motion.div>
      </header>

      {/* BENEFICIOS*/}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Calidad */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pripelu-gold mb-4 shadow-sm">
            <Star size={32} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2 italic">Calidad Premium</h3>
          <p className="text-gray-500 text-sm italic leading-relaxed">
            Usamos solo productos de alta gama para el cuidado de tu cabello.
          </p>
        </div>

        {/* Personal*/}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pripelu-gold mb-4 shadow-sm">
            <Scissors size={32} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2 italic">Expertas en Estilo</h3>
          <p className="text-gray-500 text-sm italic leading-relaxed">
            Nuestro staff está capacitado en las últimas tendencias globales.
          </p>
        </div>

        {/* Agenda */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pripelu-gold mb-4 shadow-sm">
            <Clock size={32} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2 italic">Agenda Online</h3>
          <p className="text-gray-500 text-sm italic leading-relaxed">
            Reserva en 2 minutos y asegura tu cupo con el 25% de abono.
          </p>
        </div>
      </section>

      {/*FOOTER*/}
      <footer className="bg-gray-50 py-10 border-t border-pripelu-pink text-center">
        <div className="flex justify-center items-center gap-2 text-pripelu-gold mb-2 italic">
          <MapPin size={18} />
          <span>Maipú, Santiago - Chile</span>
        </div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest font-medium">
          © 2026 Pripelu Salon. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}