package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.CitaDetalles;

public interface CitaDetallesServices {
    
    CitaServices crear(CitaDetalles citaDetalles);
    CitaServices obtenerId(Long id);
    List<CitaServices> obtenerTodos();
    CitaServices obtenerCitaPorId(Long id);
}
