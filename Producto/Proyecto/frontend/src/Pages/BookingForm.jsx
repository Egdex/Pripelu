import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { serviciosData, equipoData } from '../data'; // Importamos los datos reales

// Datos de ejemplo para validar disponibilidad (RF05)
const TIME_SLOTS = [
  { time: '09:00', period: 'Mañana', available: true },
  { time: '10:00', period: 'Mañana', available: false },
  { time: '11:00', period: 'Mañana', available: true },
  { time: '15:00', period: 'Tarde', available: true },
  { time: '16:00', period: 'Tarde', available: true },
  { time: '17:00', period: 'Tarde', available: false },
];

export default function BookingForm({ onBookingComplete }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Convertimos el precio de string ("45€") a número para calcular
  const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, '')) * 1000; // Ajuste a CLP aprox
  const calculateDeposit = (price) => price * 0.25;

  return (
    <div className="bg-white p-8 rounded-2xl">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-serif text-[#D4AF37] mb-6 text-center italic"
      >
        Reserva tu Experiencia
      </motion.h2>
      
      <div className="space-y-6">
        {/* Selector de Servicio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 italic">¿Qué servicio deseas?</label>
          <select 
            className="w-full p-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none bg-white"
            onChange={(e) => setSelectedService(serviciosData.find(s => s.id === parseInt(e.target.value)))}
          >
            <option value="">-- Seleccionar servicio --</option>
            {serviciosData.map(s => (
              <option key={s.id} value={s.id}>{s.nombre} ({s.precio})</option>
            ))}
          </select>
        </div>

        {/* Selector de Staff */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 italic">Elige a tu profesional:</label>
          <div className="grid grid-cols-3 gap-3">
            {equipoData.map(member => (
              <motion.button
                key={member.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStaff(member)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  selectedStaff?.id === member.id ? 'border-[#D4AF37] bg-pink-50' : 'border-pink-100 bg-white'
                }`}
              >
                <span className="text-2xl mb-1">👤</span>
                <span className="text-[10px] font-bold text-gray-800">{member.nombre.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selector de Horas */}
        <AnimatePresence>
          {selectedStaff && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <label className="block text-sm font-medium text-gray-700 mb-3 italic">Horas Disponibles:</label>
              <div className="space-y-4">
                {['Mañana', 'Tarde'].map(period => (
                  <div key={period}>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{period}</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TIME_SLOTS.filter(slot => slot.period === period).map(slot => (
                        <button
                          key={slot.time} disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-2 text-xs rounded-lg border transition-all ${
                            !slot.available ? 'bg-gray-100 text-gray-400 line-through' : 
                            selectedTime === slot.time ? 'bg-[#f171ab] border-[#D4AF37] text-white' : 'bg-white border-pink-100 text-gray-600'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resumen y Botón */}
        {selectedService && selectedStaff && selectedTime && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-5 bg-pink-50 rounded-2xl border border-pink-100">
            <div className="text-sm space-y-2 text-gray-600">
              <div className="flex justify-between"><span>Profesional:</span><span className="font-bold">{selectedStaff.nombre}</span></div>
              <div className="flex justify-between"><span>Hora:</span><span className="font-bold">{selectedTime} hrs</span></div>
              <div className="border-t border-pink-200 mt-2 pt-2 flex justify-between text-[#D4AF37] font-bold text-lg">
                <span>Abono (25%):</span>
                <span>{selectedService.precio} (Ref)</span>
              </div>
            </div>
          </motion.div>
        )}

        <button 
          disabled={!selectedService || !selectedStaff || !selectedTime}
          onClick={onBookingComplete}
          className="w-full bg-[#f171ab] text-white py-4 rounded-full font-bold shadow-lg disabled:bg-gray-200 transition-all uppercase tracking-widest text-sm"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
}