package com.pripelu.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pripelu.backend.entities.Cita;
import com.pripelu.backend.entities.Pago;
import com.pripelu.backend.repositories.CitaRepository;
import com.pripelu.backend.repositories.PagoRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class PagoServiceImpl implements PagoServices {

    @Autowired
    private PagoRepository pagoRepo;

    @Autowired
    private CitaRepository citaRepo; // Necesario para validar la cita antes de pagar

    @Override
    @Transactional
    public Pago crear(Pago pago) {
        // Se valida que la cita asociada exista en la DB
        // Se usa el ID de la cita que viene dentro del objeto pago
        Long citaId = pago.getCita().getId();
        Cita cita = citaRepo.findById(citaId)
                .orElseThrow(() -> new RuntimeException("No se puede registrar pago: La cita ID " + citaId + " no existe."));
        pago.setCita(cita);

        // Se generar la fecha y hora del pago automáticamente
        pago.setFechaPago(LocalDateTime.now());

        // Si el estado viene vacío, le ponemos uno por defecto
        if (pago.getEstadoPago() == null) {
            pago.setEstadoPago("COMPLETADO");
        }

        return pagoRepo.save(pago);
    }

    @Override
    @Transactional(readOnly = true)
    public Pago obtenerPorId(Long id) { 
        return pagoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pago no encontrado con ID: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Pago> obtenerTodos() {
        return (List<Pago>) pagoRepo.findAll();
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Pago pago = obtenerPorId(id);
        pagoRepo.delete(pago);
    }
}