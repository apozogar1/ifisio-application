package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.TratamientoCliente;
import com.wellandsword.ifisio.repository.TratamientoClienteRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TratamientoClienteResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TratamientoClienteResourceIT {

    private static final Long DEFAULT_NUM_SESIONES = 1L;
    private static final Long UPDATED_NUM_SESIONES = 2L;

    private static final String DEFAULT_DIAGNOSTICO = "AAAAAAAAAA";
    private static final String UPDATED_DIAGNOSTICO = "BBBBBBBBBB";

    @Autowired
    private TratamientoClienteRepository tratamientoClienteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTratamientoClienteMockMvc;

    private TratamientoCliente tratamientoCliente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TratamientoCliente createEntity(EntityManager em) {
        TratamientoCliente tratamientoCliente = new TratamientoCliente()
            .numSesiones(DEFAULT_NUM_SESIONES)
            .diagnostico(DEFAULT_DIAGNOSTICO);
        return tratamientoCliente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TratamientoCliente createUpdatedEntity(EntityManager em) {
        TratamientoCliente tratamientoCliente = new TratamientoCliente()
            .numSesiones(UPDATED_NUM_SESIONES)
            .diagnostico(UPDATED_DIAGNOSTICO);
        return tratamientoCliente;
    }

    @BeforeEach
    public void initTest() {
        tratamientoCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createTratamientoCliente() throws Exception {
        int databaseSizeBeforeCreate = tratamientoClienteRepository.findAll().size();

        // Create the TratamientoCliente
        restTratamientoClienteMockMvc.perform(post("/api/tratamiento-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamientoCliente)))
            .andExpect(status().isCreated());

        // Validate the TratamientoCliente in the database
        List<TratamientoCliente> tratamientoClienteList = tratamientoClienteRepository.findAll();
        assertThat(tratamientoClienteList).hasSize(databaseSizeBeforeCreate + 1);
        TratamientoCliente testTratamientoCliente = tratamientoClienteList.get(tratamientoClienteList.size() - 1);
        assertThat(testTratamientoCliente.getNumSesiones()).isEqualTo(DEFAULT_NUM_SESIONES);
        assertThat(testTratamientoCliente.getDiagnostico()).isEqualTo(DEFAULT_DIAGNOSTICO);
    }

    @Test
    @Transactional
    public void createTratamientoClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tratamientoClienteRepository.findAll().size();

        // Create the TratamientoCliente with an existing ID
        tratamientoCliente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTratamientoClienteMockMvc.perform(post("/api/tratamiento-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamientoCliente)))
            .andExpect(status().isBadRequest());

        // Validate the TratamientoCliente in the database
        List<TratamientoCliente> tratamientoClienteList = tratamientoClienteRepository.findAll();
        assertThat(tratamientoClienteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTratamientoClientes() throws Exception {
        // Initialize the database
        tratamientoClienteRepository.saveAndFlush(tratamientoCliente);

        // Get all the tratamientoClienteList
        restTratamientoClienteMockMvc.perform(get("/api/tratamiento-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tratamientoCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].numSesiones").value(hasItem(DEFAULT_NUM_SESIONES.intValue())))
            .andExpect(jsonPath("$.[*].diagnostico").value(hasItem(DEFAULT_DIAGNOSTICO)));
    }
    
    @Test
    @Transactional
    public void getTratamientoCliente() throws Exception {
        // Initialize the database
        tratamientoClienteRepository.saveAndFlush(tratamientoCliente);

        // Get the tratamientoCliente
        restTratamientoClienteMockMvc.perform(get("/api/tratamiento-clientes/{id}", tratamientoCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tratamientoCliente.getId().intValue()))
            .andExpect(jsonPath("$.numSesiones").value(DEFAULT_NUM_SESIONES.intValue()))
            .andExpect(jsonPath("$.diagnostico").value(DEFAULT_DIAGNOSTICO));
    }

    @Test
    @Transactional
    public void getNonExistingTratamientoCliente() throws Exception {
        // Get the tratamientoCliente
        restTratamientoClienteMockMvc.perform(get("/api/tratamiento-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTratamientoCliente() throws Exception {
        // Initialize the database
        tratamientoClienteRepository.saveAndFlush(tratamientoCliente);

        int databaseSizeBeforeUpdate = tratamientoClienteRepository.findAll().size();

        // Update the tratamientoCliente
        TratamientoCliente updatedTratamientoCliente = tratamientoClienteRepository.findById(tratamientoCliente.getId()).get();
        // Disconnect from session so that the updates on updatedTratamientoCliente are not directly saved in db
        em.detach(updatedTratamientoCliente);
        updatedTratamientoCliente
            .numSesiones(UPDATED_NUM_SESIONES)
            .diagnostico(UPDATED_DIAGNOSTICO);

        restTratamientoClienteMockMvc.perform(put("/api/tratamiento-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTratamientoCliente)))
            .andExpect(status().isOk());

        // Validate the TratamientoCliente in the database
        List<TratamientoCliente> tratamientoClienteList = tratamientoClienteRepository.findAll();
        assertThat(tratamientoClienteList).hasSize(databaseSizeBeforeUpdate);
        TratamientoCliente testTratamientoCliente = tratamientoClienteList.get(tratamientoClienteList.size() - 1);
        assertThat(testTratamientoCliente.getNumSesiones()).isEqualTo(UPDATED_NUM_SESIONES);
        assertThat(testTratamientoCliente.getDiagnostico()).isEqualTo(UPDATED_DIAGNOSTICO);
    }

    @Test
    @Transactional
    public void updateNonExistingTratamientoCliente() throws Exception {
        int databaseSizeBeforeUpdate = tratamientoClienteRepository.findAll().size();

        // Create the TratamientoCliente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTratamientoClienteMockMvc.perform(put("/api/tratamiento-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamientoCliente)))
            .andExpect(status().isBadRequest());

        // Validate the TratamientoCliente in the database
        List<TratamientoCliente> tratamientoClienteList = tratamientoClienteRepository.findAll();
        assertThat(tratamientoClienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTratamientoCliente() throws Exception {
        // Initialize the database
        tratamientoClienteRepository.saveAndFlush(tratamientoCliente);

        int databaseSizeBeforeDelete = tratamientoClienteRepository.findAll().size();

        // Delete the tratamientoCliente
        restTratamientoClienteMockMvc.perform(delete("/api/tratamiento-clientes/{id}", tratamientoCliente.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TratamientoCliente> tratamientoClienteList = tratamientoClienteRepository.findAll();
        assertThat(tratamientoClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
