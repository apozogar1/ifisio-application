package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.Tratamiento;
import com.wellandsword.ifisio.repository.TratamientoRepository;

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
 * Integration tests for the {@link TratamientoResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TratamientoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Long DEFAULT_NUM_SESIONES = 1L;
    private static final Long UPDATED_NUM_SESIONES = 2L;

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTratamientoMockMvc;

    private Tratamiento tratamiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tratamiento createEntity(EntityManager em) {
        Tratamiento tratamiento = new Tratamiento()
            .nombre(DEFAULT_NOMBRE)
            .numSesiones(DEFAULT_NUM_SESIONES);
        return tratamiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tratamiento createUpdatedEntity(EntityManager em) {
        Tratamiento tratamiento = new Tratamiento()
            .nombre(UPDATED_NOMBRE)
            .numSesiones(UPDATED_NUM_SESIONES);
        return tratamiento;
    }

    @BeforeEach
    public void initTest() {
        tratamiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createTratamiento() throws Exception {
        int databaseSizeBeforeCreate = tratamientoRepository.findAll().size();

        // Create the Tratamiento
        restTratamientoMockMvc.perform(post("/api/tratamientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamiento)))
            .andExpect(status().isCreated());

        // Validate the Tratamiento in the database
        List<Tratamiento> tratamientoList = tratamientoRepository.findAll();
        assertThat(tratamientoList).hasSize(databaseSizeBeforeCreate + 1);
        Tratamiento testTratamiento = tratamientoList.get(tratamientoList.size() - 1);
        assertThat(testTratamiento.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testTratamiento.getNumSesiones()).isEqualTo(DEFAULT_NUM_SESIONES);
    }

    @Test
    @Transactional
    public void createTratamientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tratamientoRepository.findAll().size();

        // Create the Tratamiento with an existing ID
        tratamiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTratamientoMockMvc.perform(post("/api/tratamientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamiento)))
            .andExpect(status().isBadRequest());

        // Validate the Tratamiento in the database
        List<Tratamiento> tratamientoList = tratamientoRepository.findAll();
        assertThat(tratamientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTratamientos() throws Exception {
        // Initialize the database
        tratamientoRepository.saveAndFlush(tratamiento);

        // Get all the tratamientoList
        restTratamientoMockMvc.perform(get("/api/tratamientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tratamiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].numSesiones").value(hasItem(DEFAULT_NUM_SESIONES.intValue())));
    }
    
    @Test
    @Transactional
    public void getTratamiento() throws Exception {
        // Initialize the database
        tratamientoRepository.saveAndFlush(tratamiento);

        // Get the tratamiento
        restTratamientoMockMvc.perform(get("/api/tratamientos/{id}", tratamiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tratamiento.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.numSesiones").value(DEFAULT_NUM_SESIONES.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTratamiento() throws Exception {
        // Get the tratamiento
        restTratamientoMockMvc.perform(get("/api/tratamientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTratamiento() throws Exception {
        // Initialize the database
        tratamientoRepository.saveAndFlush(tratamiento);

        int databaseSizeBeforeUpdate = tratamientoRepository.findAll().size();

        // Update the tratamiento
        Tratamiento updatedTratamiento = tratamientoRepository.findById(tratamiento.getId()).get();
        // Disconnect from session so that the updates on updatedTratamiento are not directly saved in db
        em.detach(updatedTratamiento);
        updatedTratamiento
            .nombre(UPDATED_NOMBRE)
            .numSesiones(UPDATED_NUM_SESIONES);

        restTratamientoMockMvc.perform(put("/api/tratamientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTratamiento)))
            .andExpect(status().isOk());

        // Validate the Tratamiento in the database
        List<Tratamiento> tratamientoList = tratamientoRepository.findAll();
        assertThat(tratamientoList).hasSize(databaseSizeBeforeUpdate);
        Tratamiento testTratamiento = tratamientoList.get(tratamientoList.size() - 1);
        assertThat(testTratamiento.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testTratamiento.getNumSesiones()).isEqualTo(UPDATED_NUM_SESIONES);
    }

    @Test
    @Transactional
    public void updateNonExistingTratamiento() throws Exception {
        int databaseSizeBeforeUpdate = tratamientoRepository.findAll().size();

        // Create the Tratamiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTratamientoMockMvc.perform(put("/api/tratamientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tratamiento)))
            .andExpect(status().isBadRequest());

        // Validate the Tratamiento in the database
        List<Tratamiento> tratamientoList = tratamientoRepository.findAll();
        assertThat(tratamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTratamiento() throws Exception {
        // Initialize the database
        tratamientoRepository.saveAndFlush(tratamiento);

        int databaseSizeBeforeDelete = tratamientoRepository.findAll().size();

        // Delete the tratamiento
        restTratamientoMockMvc.perform(delete("/api/tratamientos/{id}", tratamiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tratamiento> tratamientoList = tratamientoRepository.findAll();
        assertThat(tratamientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
