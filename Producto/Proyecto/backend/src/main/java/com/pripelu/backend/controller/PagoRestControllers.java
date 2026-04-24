package com.pripelu.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.pripelu.backend.entities.Pago;
import com.pripelu.backend.services.PagoServices;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/pagos")
public class PagoRestControllers {
    
    public PagoServices pagoService;

     @PostMapping
    public  ResponseEntity<Pago> crearPago(@RequestBody Pago pago) {
        Pago nuevoPago = pagoService.crear(pago);
        return ResponseEntity.ok(nuevoPago);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> obtenerPagoPorId(@PathVariable Long id) {
        Pago pago = pagoService.obtenerPagoPorId(id);
        return ResponseEntity.ok(pago);
    }
    
    @GetMapping
    public ResponseEntity<List<Pago>> listaPagos() {
        List<Pago> pagos = pagoService.obtenerTodos();
        return ResponseEntity.ok(pagos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPago(@PathVariable Long id) {
        pagoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
