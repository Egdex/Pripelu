package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Pago;

public interface PagoServices {
    
    Pago crear(Pago pago);
    Pago obtenerId(Long id);
    List<Pago> obtenerTodos();
    void eliminar(Long id);
    Pago obtenerPagoPorId(Long id);
}
