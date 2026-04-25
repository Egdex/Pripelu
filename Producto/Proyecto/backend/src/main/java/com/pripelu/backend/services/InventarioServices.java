package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Inventario;

public interface InventarioServices {
    
    Inventario crear(Inventario inventario);
    Inventario obtenerPorId(Long id);
    List<Inventario> obtenerTodos();
    void eliminar(Long id);
    Inventario actulizar(Long id, Inventario inventarioActualizado);
}
