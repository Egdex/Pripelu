package com.pripelu.backend.services;

import java.util.List;

import com.pripelu.backend.entities.Usuario;

public interface UsuarioServices {

    Usuario crear(Usuario usuario);
    Usuario obtenerId(Long id);
    List<Usuario> obtenerTodos();
    void eliminar(Long id);
    Usuario actulizar(Long id, Usuario usuarioActualizado);
    Usuario obtenerPorEmail(String email);
    
}
