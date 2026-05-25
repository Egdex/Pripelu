import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, User, Scissors, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TodasLasCitas() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/citas');
        if (res.ok) {
          const data = await res.json();
          setCitas(data);
        }
      } catch (err) {
        console.error("Error cargando citas globales:", err);
      } finally {
        setCargando(false);
      }
    };
    fetchCitas();
  }, []);

  // --- BOTÓN DEBUG: NUCLEAR TODAS LAS CITAS ---
  const handleBorrarTodoDebug = async () => {
    const confirmacion = window.confirm("⚠️ ALERTA: ¿Estás seguro que quieres BORRAR TODAS las citas de la base de datos?");
    if (!confirmacion) return;

    try {
      if (citas.length === 0) {
        return alert("La base de datos ya está vacía, no hay nada que borrar. 🧹");
      }

      for (const cita of citas) {
        const idCita = cita.id || cita.id_cita;
        await fetch(`http://localhost:8080/api/citas/${idCita}`, {
          method: 'DELETE'
        });
      }

      alert("¡Base de datos limpia exitosamente! 🚀");
      window.location.reload(); 
      
    } catch (error) {
      console.error("Error al borrar las citas:", error);
      alert("Explotó algo intentando borrar las citas. Revisa la consola.");
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    const citaActual = citas.find(c => c.id === id);
    if (!citaActual) return;

    const idUsuario = citaActual.usuario?.id || citaActual.usuario?.id_usuario;
    const idEmpleado = citaActual.empleado?.id || citaActual.empleado?.id_empleado;

    const paqueteLimpio = {
      fechaHora: citaActual.fechaHora,
      estado: nuevoEstado,
      usuario: idUsuario ? { id: parseInt(idUsuario) } : null,
      empleado: idEmpleado ? { id: parseInt(idEmpleado) } : null
    };

    try {
      const respuesta = await fetch(`http://localhost:8080/api/citas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paqueteLimpio)
      });

      if (respuesta.ok) {
        setCitas(citas.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
      } else {
        alert("Java rechazó la actualización. Revisa la consola de Spring Boot.");
      }
    } catch (error) {
      console.error("Falla de red al actualizar:", error);
    }
  };

  const obtenerEstiloEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'pendiente': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'finalizado': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelado': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="flex items-center gap-2 text-[#f171ab] font-bold hover:underline">
              <ArrowLeft size={20} /> Volver
            </Link>
            <h1 className="text-3xl font-serif text-[#b02a6b] italic font-bold">Gestión de Reservas</h1>
          </div>
          
          {/* BOTÓN DEBUG AQUÍ */}
          <button 
            onClick={handleBorrarTodoDebug} 
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-xl text-xs shadow-lg border-2 border-red-900 transition-colors"
          >
            🗑️ DEBUG: Borrar TODAS las citas
          </button>
        </div>

        {cargando ? (
          <p className="text-center text-pink-500 font-bold py-20">Conectando con el servidor...</p>
        ) : citas.length === 0 ? (
           <p className="text-center text-gray-400 font-bold py-20">No hay citas registradas en el sistema.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citas.map((cita) => (
              <div key={cita.id} className="relative bg-white rounded-[2rem] shadow-xl border border-pink-50 overflow-hidden hover:scale-[1.02] transition-transform flex flex-col">
                
                {/* ETIQUETA VISUAL DE PAGADA */}
                {cita.estado?.toLowerCase() === 'finalizado' && (
                  <span className="absolute -top-1 -right-8 bg-green-500 text-white text-[10px] font-black px-10 py-1 shadow-md transform rotate-45 z-10">
                    PAGADA
                  </span>
                )}

                <div className={`px-6 py-2 text-center text-xs font-black uppercase tracking-widest border-b ${obtenerEstiloEstado(cita.estado)}`}>
                  {cita.estado || 'Sin Estado'}
                </div>

                <div className="p-6 space-y-4 flex-grow">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Calendar size={18} className="text-[#f171ab]" />
                    <span className="text-sm font-bold">
                        {new Date(cita.fechaHora).toLocaleDateString('es-CL')} - {new Date(cita.fechaHora).toLocaleTimeString('es-CL', {hour:'2-digit', minute:'2-digit'})}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-pink-50 p-2 rounded-full text-[#f171ab]"><User size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Cliente</p>
                      <p className="font-bold text-gray-800">
                        {cita.usuario && cita.usuario.nombre 
                          ? `${cita.usuario.nombre} ${cita.usuario.apellido || ''}`
                          : 'Cliente Sin Nombre'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded-full text-blue-500"><Scissors size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Estilista Asignado</p>
                      <p className="font-bold text-gray-700">{cita.empleado?.nombre || 'No asignado'}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-pink-100 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Servicio</p>
                        <p className="text-[#b02a6b] font-bold italic">{cita.detalles?.[0]?.servicio?.nombre || 'Varios'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Valor</p>
                        <p className="text-2xl font-black text-gray-800">${cita.valorTotal?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* BOTONERA: Muestra botones si está pendiente, o texto de éxito si ya se finalizó */}
                {cita.estado?.toLowerCase() === 'pendiente' ? (
                  <div className="flex border-t border-gray-100">
                    <button 
                      onClick={() => actualizarEstado(cita.id, 'Cancelado')}
                      className="flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <XCircle size={18} /> Cancelar
                    </button>
                    <div className="w-[1px] bg-gray-100"></div>
                    <button 
                      onClick={() => actualizarEstado(cita.id, 'Finalizado')}
                      className="flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold text-[#f171ab] hover:bg-pink-50 transition-colors"
                    >
                      <CheckCircle size={18} /> Finalizar y Cobrar
                    </button>
                  </div>
                ) : cita.estado?.toLowerCase() === 'finalizado' ? (
                   <div className="bg-green-50 py-3 text-center text-green-600 font-bold text-sm border-t border-green-100">
                     ✅ Cita completada y cobrada
                   </div>
                ) : null}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}