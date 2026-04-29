package com.pripelu.backend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.pripelu.backend.entities.Horario;

public interface HorarioRepository extends CrudRepository <Horario, Long>{
    List<Horario> findByEmpleadosId(Long empleadoId);
}
