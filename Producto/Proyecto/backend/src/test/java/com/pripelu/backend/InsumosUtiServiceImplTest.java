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

import com.pripelu.backend.repositories.InsumosUtiRepository;
import com.pripelu.backend.services.InsumosUtiServiceImpl;
import com.pripelu.backend.entities.InsumosUtilizados;

@ExtendWith(MockitoExtension.class)
public class InsumosUtiServiceImplTest {
    
    @Mock
    private InsumosUtiRepository insumoUtiRepo;

    @InjectMocks
    private InsumosUtiServiceImpl insumoUtiService;

    private InsumosUtilizados insumoUtiTest;

    @BeforeEach
    public void setUp() {
        insumoUtiTest = new InsumosUtilizados();
        insumoUtiTest.setId(1L);
        insumoUtiTest.setCantidad(null);
    }
}
