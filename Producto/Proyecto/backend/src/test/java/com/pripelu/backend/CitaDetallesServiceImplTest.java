package com.pripelu.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.pripelu.backend.entities.CitaDetalles;
import com.pripelu.backend.repositories.CitaDetallesRepository;
import com.pripelu.backend.services.CitaDetallesServiceImpl;

@ExtendWith(MockitoExtension.class)
public class CitaDetallesServiceImplTest {

    @Mock
    private CitaDetallesRepository citaDetallesRepo;

    @InjectMocks
    private CitaDetallesServiceImpl citaDetallesService;

    private CitaDetalles citaDetallesTest;

    @BeforeEach
    public void setUp() {
        citaDetallesTest = new CitaDetalles();
        citaDetallesTest.setId(1L);
        citaDetallesTest.setPrecioCita(null);;
    }
    
}
