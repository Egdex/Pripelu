package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Servicio;

public interface ServicioServices {
    
    Servicio crear(Servicio servicio);
    Servicio obtenerId(Long id);
    List<Servicio> obtenerTodos();
    void eliminar(Long id);
    Servicio actulizar(Long id, Servicio servicioActualizado);
    Servicio obtenerServicioPorId(Long id);

}
