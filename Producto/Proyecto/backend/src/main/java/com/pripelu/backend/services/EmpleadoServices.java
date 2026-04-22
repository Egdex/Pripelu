package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Empleado;

public interface EmpleadoServices {
    
    Empleado crear(Empleado empleado);
    Empleado obtenerId(Long id);
    List<Empleado> obtenerTodos();
    void eliminar(Long id);
    Empleado actualizar(Long id, Empleado empleadoActualizado);
    Empleado obtenerEmpleadoPorId(Long id);
}
