package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.CitaDetalles;

public interface CitaDetallesServices {
    
    CitaDetalles crear(CitaDetalles citaDetalles);
    CitaDetalles obtenerId(Long id);
    List<CitaDetalles> obtenerTodos();
    CitaDetalles obtenerCitaPorId(Long id);
}
