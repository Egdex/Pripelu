package com.pripelu.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pripelu.backend.entities.InsumosUtilizados;
import com.pripelu.backend.repositories.InsumosUtiRepository;

import org.springframework.transaction.annotation.Transactional;

@Service
public class InsumosUtiServiceImpl implements InsumosUtiServices {

    @Autowired
    private InsumosUtiRepository insumosUtiRepo;

    @Override
    @Transactional
    public InsumosUtilizados crear(InsumosUtilizados insumosUtilizados) {
        return insumosUtiRepo.save(insumosUtilizados);
    }

    @Override
    @Transactional(readOnly = true)
    public InsumosUtilizados obtenerPorId(Long id) {
        return insumosUtiRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Registro de insumo no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public InsumosUtilizados actualizar(Long id, InsumosUtilizados actualizado) {
        InsumosUtilizados existente = obtenerPorId(id);

        existente.setCantidad(actualizado.getCantidad());
        existente.setInventario(actualizado.getInventario());
        existente.setServicio(actualizado.getServicio());

        return insumosUtiRepo.save(existente);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        InsumosUtilizados registro = obtenerPorId(id);
        insumosUtiRepo.delete(registro);
    }

    @Transactional(readOnly = true)
    public List<InsumosUtilizados> obtenerPorServicio(Long servicioId) {
        return insumosUtiRepo.findByServicioId(servicioId);
        // Esto permitira ver todos los insumos asociados a un servicio específico, lo que puede ser util para le font
    }

}
