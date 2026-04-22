package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Cita;

public interface CitaServices {
    
    Cita crear(Cita cita);
    Cita obtenerId(Long id);
    List<Cita> obtenerTodos();
    void eliminar(Long id);
    Cita actualizar(Long id, Cita citaActualizada);
    Cita obtenerCitaPorId(Long id);
}
