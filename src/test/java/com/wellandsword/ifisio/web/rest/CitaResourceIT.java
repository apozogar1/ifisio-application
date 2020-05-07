package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.Cita;
import com.wellandsword.ifisio.repository.CitaRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CitaResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CitaResourceIT {

    private static final Instant DEFAULT_FECHA_HORA_CITA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_HORA_CITA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCitaMockMvc;

    private Cita cita;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cita createEntity(EntityManager em) {
        Cita cita = new Cita()
            .fechaHoraCita(DEFAULT_FECHA_HORA_CITA);
        return cita;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cita createUpdatedEntity(EntityManager em) {
        Cita cita = new Cita()
            .fechaHoraCita(UPDATED_FECHA_HORA_CITA);
        return cita;
    }

    @BeforeEach
    public void initTest() {
        cita = createEntity(em);
    }

    @Test
    @Transactional
    public void createCita() throws Exception {
        int databaseSizeBeforeCreate = citaRepository.findAll().size();

        // Create the Cita
        restCitaMockMvc.perform(post("/api/citas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cita)))
            .andExpect(status().isCreated());

        // Validate the Cita in the database
        List<Cita> citaList = citaRepository.findAll();
        assertThat(citaList).hasSize(databaseSizeBeforeCreate + 1);
        Cita testCita = citaList.get(citaList.size() - 1);
        assertThat(testCita.getFechaHoraCita()).isEqualTo(DEFAULT_FECHA_HORA_CITA);
    }

    @Test
    @Transactional
    public void createCitaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = citaRepository.findAll().size();

        // Create the Cita with an existing ID
        cita.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCitaMockMvc.perform(post("/api/citas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cita)))
            .andExpect(status().isBadRequest());

        // Validate the Cita in the database
        List<Cita> citaList = citaRepository.findAll();
        assertThat(citaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCitas() throws Exception {
        // Initialize the database
        citaRepository.saveAndFlush(cita);

        // Get all the citaList
        restCitaMockMvc.perform(get("/api/citas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cita.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHoraCita").value(hasItem(DEFAULT_FECHA_HORA_CITA.toString())));
    }
    
    @Test
    @Transactional
    public void getCita() throws Exception {
        // Initialize the database
        citaRepository.saveAndFlush(cita);

        // Get the cita
        restCitaMockMvc.perform(get("/api/citas/{id}", cita.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cita.getId().intValue()))
            .andExpect(jsonPath("$.fechaHoraCita").value(DEFAULT_FECHA_HORA_CITA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCita() throws Exception {
        // Get the cita
        restCitaMockMvc.perform(get("/api/citas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCita() throws Exception {
        // Initialize the database
        citaRepository.saveAndFlush(cita);

        int databaseSizeBeforeUpdate = citaRepository.findAll().size();

        // Update the cita
        Cita updatedCita = citaRepository.findById(cita.getId()).get();
        // Disconnect from session so that the updates on updatedCita are not directly saved in db
        em.detach(updatedCita);
        updatedCita
            .fechaHoraCita(UPDATED_FECHA_HORA_CITA);

        restCitaMockMvc.perform(put("/api/citas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCita)))
            .andExpect(status().isOk());

        // Validate the Cita in the database
        List<Cita> citaList = citaRepository.findAll();
        assertThat(citaList).hasSize(databaseSizeBeforeUpdate);
        Cita testCita = citaList.get(citaList.size() - 1);
        assertThat(testCita.getFechaHoraCita()).isEqualTo(UPDATED_FECHA_HORA_CITA);
    }

    @Test
    @Transactional
    public void updateNonExistingCita() throws Exception {
        int databaseSizeBeforeUpdate = citaRepository.findAll().size();

        // Create the Cita

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCitaMockMvc.perform(put("/api/citas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cita)))
            .andExpect(status().isBadRequest());

        // Validate the Cita in the database
        List<Cita> citaList = citaRepository.findAll();
        assertThat(citaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCita() throws Exception {
        // Initialize the database
        citaRepository.saveAndFlush(cita);

        int databaseSizeBeforeDelete = citaRepository.findAll().size();

        // Delete the cita
        restCitaMockMvc.perform(delete("/api/citas/{id}", cita.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Cita> citaList = citaRepository.findAll();
        assertThat(citaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
