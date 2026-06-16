import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, DollarSign, ArrowLeft, XCircle, Calendar, User, Scissors, Loader2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MisCitas() {
  const [misCitas, setMisCitas] = useState([]);
  const [comisiones, setComisiones] = useState(0);
  const [cargando, setCargando] = useState(true);
  
  const userRole = localStorage.getItem('userRole') || 'cliente';
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userId = parseInt(localStorage.getItem('userId')) || 0;

  // Estados para la gestión del modal de pagos y finalización
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [insumosAGastar, setInsumosAGastar] = useState([]);
  const [pasoPago, setPasoPago] = useState('resumen'); 

  // Carga inicial de citas y cálculo de comisiones según rol
  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/api/citas');
        
        if (respuesta.ok) {
          const citasBackend = await respuesta.json();
          let filtradas = [];

          if (userRole === 'empleado') {
            filtradas = citasBackend.filter(cita => 
              cita.empleado?.id === userId || 
              cita.empleado?.id_empleado === userId ||
              cita.empleado?.nombre?.toLowerCase() === userName.toLowerCase()
            );
            
            const total = filtradas
              .filter(c => c.estado?.toLowerCase() === 'finalizado')
              .reduce((acc, c) => acc + ((c.valorTotal || 0) * 0.5), 0);
            setComisiones(total);

          } else {
            filtradas = citasBackend.filter(cita => cita.usuario?.id === userId || cita.usuario?.id_usuario === userId);
          }
          
          setMisCitas(filtradas);
        }
      } catch (error) {
        console.error("Falla de conexión:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerCitas();
  }, [userRole, userId, userName]);

  // Actualiza el estado de una cita en la base de datos (Ej: Cancelar)
  const actualizarEstado = async (id, nuevoEstado, notaExtra = null) => {
    const citaActual = misCitas.find(c => c.id === id);
    if (!citaActual) return;

    const notasFinales = notaExtra ? `${citaActual.notas || ''} | Insumo: ${notaExtra}` : citaActual.notas;

    const citaLimpia = {
      id: citaActual.id,
      fechaHora: citaActual.fechaHora,
      estado: nuevoEstado, 
      notas: notasFinales,
      valorTotal: citaActual.valorTotal,
      duracionTotal: citaActual.duracionTotal,
      usuario: { id: citaActual.usuario?.id || citaActual.usuario?.id_usuario },
      empleado: { id: citaActual.empleado?.id || citaActual.empleado?.id_empleado },
      detalles: citaActual.detalles?.map(d => ({
        id: d.id,
        precioCita: d.precioCita,
        servicio: { id: d.servicio?.id || d.servicio?.id_servicio }
      }))
    };

    try {
      const respuesta = await fetch(`http://localhost:8080/api/citas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(citaLimpia)
      });

      if (respuesta.ok) {
        setMisCitas(misCitas.map(c => c.id === id ? { ...c, estado: nuevoEstado, notas: notasFinales } : c));
      } else {
        alert("Hubo un error al actualizar la reserva en el servidor.");
      }
    } catch (error) {
      console.error("Falla de red:", error);
    }
  };

  // Prepara el modal de cobro y obtiene la lista de insumos a descontar
  const abrirModalCobro = async (cita) => {
    setCitaSeleccionada(cita);
    setPasoPago('resumen'); 
    setModalAbierto(true);
    setInsumosAGastar([]); 

    let insumosDeLaCita = cita.detalles?.[0]?.servicio?.insumosRequeridos;
    const idServicio = cita.detalles?.[0]?.servicio?.id || cita.detalles?.[0]?.servicio?.id_servicio;

    // Búsqueda de insumos requeridos si no vienen anidados en el payload original
    if (!insumosDeLaCita && idServicio) {
      try {
        const resServicios = await fetch('http://localhost:8080/api/servicios');
        const catalogo = await resServicios.json();
        const servicioReal = catalogo.find(s => parseInt(s.id || s.id_servicio) === parseInt(idServicio));
        insumosDeLaCita = servicioReal?.insumosRequeridos || [];
      } catch (e) {
        console.error("No se pudo cargar el catálogo de servicios", e);
      }
    }

    if (insumosDeLaCita && insumosDeLaCita.length > 0) {
      const gastosMapeados = insumosDeLaCita.map(item => ({
        idInsumoReal: item.inventario?.id || item.inventario?.id_insumo,
        nombreProducto: item.inventario?.nombre || 'Producto de Bodega',
        cantidad: item.cantidad
      }));
      setInsumosAGastar(gastosMapeados);
    }
  };

  // Simula la conexión con la pasarela de pagos (POS)
  const iniciarPagoSimulado = () => {
    setPasoPago('procesando'); 
    setTimeout(() => {
      confirmarCobroYFinalizar();
    }, 2500);
  };

  // Procesa el pago final, descuenta inventario y actualiza comisiones
  const confirmarCobroYFinalizar = async () => {
    if (!citaSeleccionada) return;

    const idCita = citaSeleccionada.id || citaSeleccionada.id_cita;

    try {
      // 1. Descuento de insumos en bodega
      for (const item of insumosAGastar) {
        const idInsumo = item.idInsumoReal;
        const cantidadRestar = item.cantidad;

        if (idInsumo) {
          const resStock = await fetch(`http://localhost:8080/api/inventarios/${idInsumo}`);
          if (resStock.ok) {
            const productoActual = await resStock.json();
            const stockViejo = productoActual.stockActual || productoActual.stock_actual;
            const stockNuevo = Math.max(0, stockViejo - cantidadRestar);

            await fetch(`http://localhost:8080/api/inventarios/${idInsumo}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...productoActual, 
                stockActual: stockNuevo,
                stock_actual: stockNuevo 
              })
            });
          }
        }
      }

      // 2. Actualización del estado de la cita
      const idUsuario = citaSeleccionada.usuario?.id || citaSeleccionada.usuario?.id_usuario;
      const idEmpleado = citaSeleccionada.empleado?.id || citaSeleccionada.empleado?.id_empleado;

      // Generación del payload completo para validación estricta de Spring Boot
      const paqueteLimpio = {
        id: idCita,
        fechaHora: citaSeleccionada.fechaHora,
        estado: 'Finalizado',
        notas: citaSeleccionada.notas,
        valorTotal: citaSeleccionada.valorTotal,
        duracionTotal: citaSeleccionada.duracionTotal,
        usuario: idUsuario ? { id: parseInt(idUsuario) } : null,
        empleado: idEmpleado ? { id: parseInt(idEmpleado) } : null,
        detalles: citaSeleccionada.detalles?.map(d => ({
          id: d.id,
          precioCita: d.precioCita,
          servicio: { id: d.servicio?.id || d.servicio?.id_servicio }
        }))
      };

      const respuestaCita = await fetch(`http://localhost:8080/api/citas/${idCita}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paqueteLimpio)
      });

      if (respuestaCita.ok) {
        const nuevasCitas = misCitas.map(c => c.id === idCita ? { ...c, estado: 'Finalizado' } : c);
        setMisCitas(nuevasCitas);
        
        // 3. Recálculo local de comisiones para reflejar el pago al instante
        const nuevoTotalComisiones = nuevasCitas
          .filter(c => c.estado?.toLowerCase() === 'finalizado')
          .reduce((acc, c) => acc + ((c.valorTotal || 0) * 0.5), 0);
        setComisiones(nuevoTotalComisiones);

        setPasoPago('exito');

        // Cierra el modal tras confirmación visual
        setTimeout(() => {
          setModalAbierto(false);
          setCitaSeleccionada(null);
        }, 2000);

      } else {
        alert("Hubo un error al actualizar el estado de la cita.");
        setPasoPago('resumen');
      }
    } catch (error) {
      console.error("Error en el proceso final:", error);
      alert("Error de conexión durante el pago y descuento.");
      setPasoPago('resumen');
    }
  };

  const obtenerNombreServicio = (cita) => {
    return cita.detalles?.[0]?.servicio?.nombre || "Servicio no especificado";
  };

  return (
    <div className="min-h-screen bg-[#fdf2f8] p-4 md:p-8 relative">
      
      {/* Modal de finalización y pago de cita */}
      {modalAbierto && citaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden border border-pink-100 animate-in zoom-in duration-200">
            
            {/* Cabecera dinámica según estado del pago */}
            <div className={`${pasoPago === 'exito' ? 'bg-green-500' : 'bg-[#f171ab]'} p-6 text-white text-center relative transition-colors duration-500`}>
              {pasoPago === 'resumen' && (
                <button onClick={() => setModalAbierto(false)} className="absolute top-6 right-6 font-bold hover:scale-110 transition-transform text-xl">✕</button>
              )}
              <h2 className="text-2xl font-serif italic font-bold">
                {pasoPago === 'resumen' ? 'Proceso de Cobro' : pasoPago === 'procesando' ? 'Terminal de Pago' : 'Transacción Exitosa'}
              </h2>
            </div>

            {/* Contenedor principal del modal */}
            <div className="p-8">
              
              {/* Vista de resumen y detalle de cobro */}
              {pasoPago === 'resumen' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="bg-pink-50 p-5 rounded-2xl border border-pink-100">
                    <div className="flex justify-between items-center mb-2 text-gray-600">
                      <span>Valor Total del Servicio:</span>
                      <span className="font-bold">${citaSeleccionada.valorTotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-green-600 border-b border-pink-100 pb-4">
                      <span>Abono Web (Ya pagado):</span>
                      <span className="font-bold">- ${(citaSeleccionada.valorTotal * 0.20).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#b02a6b] text-xl font-black">
                      <span>Total a Cobrar en Caja:</span>
                      <span>${(citaSeleccionada.valorTotal * 0.80).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#b02a6b] font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Package size={16}/> Bodega: Stock a rebajar
                    </h3>
                    {insumosAGastar.length > 0 ? (
                      <ul className="space-y-2">
                        {insumosAGastar.map((insumo, idx) => (
                          <li key={idx} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-gray-700 font-medium">{insumo.nombreProducto}</span>
                            <span className="text-red-500 font-bold bg-red-50 px-2 py-1 rounded-md border border-red-100">- {insumo.cantidad} unid.</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-400 italic bg-gray-50 p-3 rounded-lg border border-gray-100 text-center">Este servicio no requiere descontar insumos.</p>
                    )}
                  </div>

                  <button 
                    onClick={iniciarPagoSimulado}
                    className="w-full bg-[#f171ab] hover:bg-[#d85a94] text-white py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <CreditCard size={20}/> Procesar Pago y Finalizar
                  </button>
                </div>
              )}

              {/* Vista de procesamiento de pago */}
              {pasoPago === 'procesando' && (
                <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in">
                  <Loader2 size={64} className="text-[#f171ab] animate-spin" />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800">Conectando con el Banco...</h3>
                    <p className="text-gray-500 text-sm mt-2">Acerca la tarjeta al terminal POS.</p>
                  </div>
                </div>
              )}

              {/* Vista de transacción exitosa */}
              {pasoPago === 'exito' && (
                <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in zoom-in">
                  <div className="bg-green-100 p-6 rounded-full text-green-500">
                    <CheckCircle size={64} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-green-600">¡Pago Aprobado!</h3>
                    <p className="text-gray-500 font-medium mt-2">Has finalizado la cita con éxito. ¡Suma comisiones!</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Renderizado del panel de control general */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="text-[#f171ab] flex items-center gap-2 hover:underline font-bold">
            <ArrowLeft size={20} /> Volver al Inicio
          </Link>
          
          {userRole === 'empleado' && (
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-pink-100 flex items-center gap-4">
              <DollarSign className="text-green-500" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Mis Comisiones</p>
                <p className="text-lg font-bold text-gray-700">${comisiones.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-serif text-[#b02a6b] mb-8 italic">
          {userRole === 'empleado' ? `Agenda de ${userName}` : `Mis Reservas, ${userName}`}
        </h1>

        {cargando ? (
           <p className="text-center text-[#f171ab] font-bold text-xl py-10">Cargando datos...</p>
        ) : misCitas.length === 0 ? (
           <div className="bg-white p-10 rounded-[2rem] text-center shadow-sm border border-pink-100">
             <p className="text-gray-500 font-medium">
               {userRole === 'empleado' ? "No tienes citas agendadas por el momento. ¡Tómate un café! ☕" : "Aún no tienes reservas con nosotros. ¡Anímate a un cambio de look! ✨"}
             </p>
           </div>
        ) : (
          <div className="grid gap-6">
            {misCitas.map(cita => {
              const estadoLimpio = cita.estado?.trim().toLowerCase() || '';
              // Corrección: El botón aparecerá si está pendiente o confirmada
              const mostrarBotones = estadoLimpio === 'pendiente' || estadoLimpio.includes('confirmad');

              return (
                <div key={cita.id} className={`bg-white p-6 rounded-[2rem] shadow-md border-l-8 flex flex-col md:flex-row justify-between md:items-center gap-4 ${estadoLimpio === 'finalizado' ? 'border-green-400 opacity-75' : estadoLimpio === 'cancelado' ? 'border-red-400 opacity-50' : 'border-[#f171ab]'}`}>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
                      <Calendar size={16} className="text-[#f171ab]" />
                      <span className="text-sm font-bold">
                        {new Date(cita.fechaHora).toLocaleDateString('es-CL')} - {new Date(cita.fechaHora).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        {userRole === 'empleado' ? 'Atender a:' : 'Estilista asignado:'}
                      </p>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {userRole === 'empleado' 
                          ? <><User size={18} className="text-[#f171ab]"/> {cita.usuario?.nombre} {cita.usuario?.apellido}</>
                          : <><Scissors size={18} className="text-[#f171ab]"/> {cita.empleado?.nombre} {cita.empleado?.apellido}</>
                        }
                      </h3>
                    </div>

                    <p className="text-[#b02a6b] font-bold italic">{obtenerNombreServicio(cita)}</p>
                    
                    <div className="flex gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${estadoLimpio === 'pendiente' ? 'bg-amber-100 text-amber-700' : estadoLimpio === 'finalizado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {cita.estado}
                      </span>
                    </div>
                  </div>

                  {/* Acciones por rol (Usando mostrarBotones para que no se oculte en "Confirmada") */}
                  {mostrarBotones && (
                    <div className="flex shrink-0">
                      {userRole === 'empleado' ? (
                        <button onClick={() => abrirModalCobro(cita)} className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 transition-all shadow-lg w-full md:w-auto justify-center">
                          <CreditCard size={20} /> Cobrar y Finalizar
                        </button>
                      ) : (
                        <button onClick={() => actualizarEstado(cita.id, 'Cancelado')} className="bg-red-50 text-red-500 border border-red-200 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all w-full md:w-auto justify-center">
                          <XCircle size={20} /> Cancelar Reserva
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}