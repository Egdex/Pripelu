package com.pripelu.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pripelu.backend.entities.CitaDetalles;
import com.pripelu.backend.repositories.CitaDetallesRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CitaDetallesServiceImpl implements CitaDetallesServices {

    @Autowired
    private CitaDetallesRepository detallesRepo;

    @Override
    @Transactional
    public CitaDetalles crear(CitaDetalles citaDetalles) {
        // Guardamos el detalle individual. 
        // Nota: Asegúrate de que el objeto citaDetalles ya traiga el objeto Cita y Servicio vinculados.
        return detallesRepo.save(citaDetalles);
    }

    @Override
    @Transactional(readOnly = true)
    public CitaDetalles obtenerPorId(Long id) {
        return detallesRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de cita no encontrado con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CitaDetalles> obtenerTodos() {
        return (List<CitaDetalles>) detallesRepo.findAll();
    }
    
    // Método extra útil para el historial
    @Transactional(readOnly = true)
    public List<CitaDetalles> obtenerPorCita(Long citaId) {
        return detallesRepo.findByCitaId(citaId);
    }
}
