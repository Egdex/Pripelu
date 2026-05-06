import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, DollarSign, CheckCircle } from 'lucide-react'; // Iconos pro

const APPOINTMENTS = [
  { id: 1, client: 'Martina Paz', service: 'Colorimetría', staff: 'Ana', time: '09:00', status: 'Pagado', deposit: 11250 },
  { id: 2, client: 'Josefa Ignacia', service: 'Corte de Dama', staff: 'Elena', time: '11:00', status: 'Pagado', deposit: 6250 },
  { id: 3, client: 'Valentina Soto', service: 'Alisado', staff: 'Carla', time: '15:00', status: 'Pendiente', deposit: 15000 },
];

export default function Dashboard() {
  // RF06 - Sumamos los abonos del día para que tu tía sepa cuánto ha ganado
  const totalCaja = APPOINTMENTS.reduce((acc, curr) => acc + curr.deposit, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif text-pripelu-gold italic font-bold">Panel Pripelu</h1>
          <p className="text-gray-500">Gestión de citas y abonos diarios</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-pripelu-pink flex items-center gap-4">
          <div className="bg-pink-100 p-3 rounded-full text-pripelu-gold">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Caja por Abonos</p>
            <p className="text-xl font-bold text-gray-800">${totalCaja.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabla de Citas (RF12) */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-700 flex items-center gap-2">
              <Calendar className="text-pripelu-gold" size={20} /> Próximas Citas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Servicio</th>
                  <th className="px-6 py-4">Estilista</th>
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {APPOINTMENTS.map((app) => (
                  <motion.tr 
                    key={app.id} 
                    whileHover={{ backgroundColor: "#fff5f7" }}
                    className="text-sm text-gray-600"
                  >
                    <td className="px-6 py-4 font-bold text-gray-800">{app.client}</td>
                    <td className="px-6 py-4">{app.service}</td>
                    <td className="px-6 py-4">
                      <span className="bg-pink-50 text-pripelu-gold px-2 py-1 rounded-md text-xs font-bold">
                        {app.staff}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">{app.time}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-green-500 font-bold text-xs">
                        <CheckCircle size={14} /> {app.status}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de Staff (RF13) */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Users className="text-pripelu-gold" size={20} /> Desempeño Staff
          </h3>
          <div className="space-y-6">
            {['Ana', 'Elena', 'Carla'].map(name => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pripelu-pink rounded-full flex items-center justify-center text-white font-bold">
                    {name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{name}</span>
                </div>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-bold">
                  {Math.floor(Math.random() * 5) + 1} citas
                </span>
              </div>
            ))}
          </div>
        </div>
        <button 
                onClick={() => alert('Caja cerrada: Se ha enviado el resumen al correo de la dueña.')}
                className="mt-4 w-full bg-pripelu-gold text-white py-2 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-md text-xs uppercase tracking-widest"
              >
                Finalizar Jornada
              </button>
      </div>
    </div>
  );
}