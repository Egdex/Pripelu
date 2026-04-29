import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  { id: 1, name: 'Corte de Dama', price: 25000 },
  { id: 2, name: 'Colorimetría', price: 45000 },
  { id: 3, name: 'Alisado Permanente', price: 60000 },
];

const STAFF = [
  { id: 1, name: 'Ana', specialty: 'Colorista', emoji: '👩‍🎨' },
  { id: 2, name: 'Elena', specialty: 'Cortes', emoji: '💇‍♀️' },
  { id: 3, name: 'Carla', specialty: 'Tratamientos', emoji: '✨' },
];

// Datos de ejemplo para validar disponibilidad (RF05)
const TIME_SLOTS = [
  { time: '09:00', period: 'Mañana', available: true },
  { time: '10:00', period: 'Mañana', available: false },
  { time: '11:00', period: 'Mañana', available: true },
  { time: '15:00', period: 'Tarde', available: true },
  { time: '16:00', period: 'Tarde', available: true },
  { time: '17:00', period: 'Tarde', available: false },
];

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const calculateDeposit = (price) => price * 0.25;

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-pripelu-gold rounded-2xl shadow-lg my-10">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-serif text-pripelu-gold mb-6 text-center italic"
      >
        Reserva tu Experiencia
      </motion.h2>
      
      <div className="space-y-6">
        {/* Selector de Servicio (RF04) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 italic">¿Qué servicio deseas?</label>
          <select 
            className="w-full p-3 border border-pripelu-pink rounded-xl focus:ring-2 focus:ring-pripelu-gold outline-none bg-white"
            onChange={(e) => setSelectedService(SERVICES.find(s => s.id === parseInt(e.target.value)))}
          >
            <option value="">-- Seleccionar servicio --</option>
            {SERVICES.map(s => (
              <option key={s.id} value={s.id}>{s.name} (${s.price.toLocaleString()})</option>
            ))}
          </select>
        </div>

        {/* Selector de Staff (RF04 / RF09) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 italic">Elige a tu profesional:</label>
          <div className="grid grid-cols-3 gap-3">
            {STAFF.map(member => (
              <motion.button
                key={member.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedStaff(member)}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                  selectedStaff?.id === member.id 
                    ? 'border-pripelu-gold bg-pink-50 shadow-md' 
                    : 'border-pripelu-pink bg-white'
                }`}
              >
                <span className="text-2xl mb-1">{member.emoji}</span>
                <span className="text-xs font-bold text-gray-800">{member.name}</span>
                <span className="text-[10px] text-gray-500">{member.specialty}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selector de Horas (RF05) */}
        <AnimatePresence>
          {selectedStaff && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="block text-sm font-medium text-gray-700 mb-3 italic">Horas Disponibles:</label>
              <div className="space-y-4">
                {['Mañana', 'Tarde'].map(period => (
                  <div key={period}>
                    <span className="text-[10px] font-bold text-pripelu-gold uppercase tracking-widest">{period}</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TIME_SLOTS.filter(slot => slot.period === period).map(slot => (
                        <button
                          key={slot.time}
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`p-2 text-xs rounded-lg border transition-all ${
                            !slot.available 
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through' 
                              : selectedTime === slot.time 
                                ? 'bg-pripelu-pink border-pripelu-gold text-pripelu-gold font-bold' 
                                : 'bg-white border-pripelu-pink text-gray-600 hover:border-pripelu-gold'
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

        {/* Resumen de Pago (RF06) */}
        <AnimatePresence mode="wait">
          {selectedService && selectedStaff && selectedTime && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-5 bg-pink-50 rounded-2xl border border-pripelu-pink shadow-inner"
            >
              <p className="text-center text-xs text-pripelu-gold font-bold uppercase mb-3 tracking-tighter">Detalle de tu Cita</p>
              <div className="text-sm space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Profesional:</span>
                  <span className="font-semibold">{selectedStaff.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Hora:</span>
                  <span className="font-semibold">{selectedTime} hrs</span>
                </div>
                <div className="border-t border-pripelu-pink my-2 pt-2 flex justify-between text-pripelu-gold font-bold text-lg">
                  <span>Abono (25%):</span>
                  <motion.span
                    key={selectedService.price}
                    initial={{ scale: 1.2, color: "#000" }}
                    animate={{ scale: 1, color: "#D4AF37" }}
                  >
                    ${calculateDeposit(selectedService.price).toLocaleString()}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de Acción (RF07) */}
        <motion.button 
          whileHover={selectedService && selectedStaff && selectedTime ? { scale: 1.02 } : {}}
          whileTap={selectedService && selectedStaff && selectedTime ? { scale: 0.98 } : {}}
          disabled={!selectedService || !selectedStaff || !selectedTime}
          className="w-full bg-pripelu-gold text-white py-4 rounded-full font-bold shadow-lg disabled:bg-gray-200 disabled:text-gray-400 transition-all uppercase tracking-widest text-sm"
        >
          Confirmar y Pagar Abono
        </motion.button>
      </div>
    </div>
  );
}