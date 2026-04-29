package com.pripelu.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pripelu.backend.entities.Cita;
import com.pripelu.backend.repositories.CitaRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CitaServiceImpl implements CitaServices {

    @Autowired
    private CitaRepository citaRepo;

    @Override
    @Transactional(readOnly = true)
    public List<Cita> obtenerTodos() {
        return (List<Cita>) citaRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Cita obtenerPorId(Long id) {
        return citaRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada con id: " + id));
    }

    @Override
    @Transactional
    public Cita crear(Cita cita) {
        
        if (cita.getDetalles() != null) {
            cita.getDetalles().forEach(detalle -> detalle.setCita(cita));
        }

        if(cita.getEstado() == null) {
            cita.setEstado("PENDIENTE");
        }
        return citaRepo.save(cita);
    }

    @Override
    @Transactional
    public Cita actualizar(Long id, Cita actualizada) {
        Cita existente = obtenerPorId(id);

        existente.setFechaHora(actualizada.getFechaHora());
        existente.setDuracionTotal(actualizada.getDuracionTotal());
        existente.setValorTotal(actualizada.getValorTotal());
        existente.setEstado(actualizada.getEstado());
        existente.setNotas(actualizada.getNotas());

        existente.setEmpleado(actualizada.getEmpleado());
        existente.setUsuario(actualizada.getUsuario());

        existente.getDetalles().clear();
        if (actualizada.getDetalles() != null) {
            actualizada.getDetalles().forEach(d -> d.setCita(existente));
            existente.getDetalles().addAll(actualizada.getDetalles());
        }
        return citaRepo.save(existente);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        Cita cita = obtenerPorId(id);
        citaRepo.delete(cita);
    }

}