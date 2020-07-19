package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.Medicion;
import com.wellandsword.ifisio.repository.MedicionRepository;

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
 * Integration tests for the {@link MedicionResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MedicionResourceIT {

    private static final Float DEFAULT_PESO = 1F;
    private static final Float UPDATED_PESO = 2F;

    private static final Float DEFAULT_ALTURA = 1F;
    private static final Float UPDATED_ALTURA = 2F;

    private static final Instant DEFAULT_FECHA_MEDICION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_MEDICION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MedicionRepository medicionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicionMockMvc;

    private Medicion medicion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medicion createEntity(EntityManager em) {
        Medicion medicion = new Medicion()
            .peso(DEFAULT_PESO)
            .altura(DEFAULT_ALTURA)
            .fechaMedicion(DEFAULT_FECHA_MEDICION);
        return medicion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medicion createUpdatedEntity(EntityManager em) {
        Medicion medicion = new Medicion()
            .peso(UPDATED_PESO)
            .altura(UPDATED_ALTURA)
            .fechaMedicion(UPDATED_FECHA_MEDICION);
        return medicion;
    }

    @BeforeEach
    public void initTest() {
        medicion = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicion() throws Exception {
        int databaseSizeBeforeCreate = medicionRepository.findAll().size();

        // Create the Medicion
        restMedicionMockMvc.perform(post("/api/medicions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicion)))
            .andExpect(status().isCreated());

        // Validate the Medicion in the database
        List<Medicion> medicionList = medicionRepository.findAll();
        assertThat(medicionList).hasSize(databaseSizeBeforeCreate + 1);
        Medicion testMedicion = medicionList.get(medicionList.size() - 1);
        assertThat(testMedicion.getPeso()).isEqualTo(DEFAULT_PESO);
        assertThat(testMedicion.getAltura()).isEqualTo(DEFAULT_ALTURA);
        assertThat(testMedicion.getFechaMedicion()).isEqualTo(DEFAULT_FECHA_MEDICION);
    }

    @Test
    @Transactional
    public void createMedicionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicionRepository.findAll().size();

        // Create the Medicion with an existing ID
        medicion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicionMockMvc.perform(post("/api/medicions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicion)))
            .andExpect(status().isBadRequest());

        // Validate the Medicion in the database
        List<Medicion> medicionList = medicionRepository.findAll();
        assertThat(medicionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedicions() throws Exception {
        // Initialize the database
        medicionRepository.saveAndFlush(medicion);

        // Get all the medicionList
        restMedicionMockMvc.perform(get("/api/medicions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicion.getId().intValue())))
            .andExpect(jsonPath("$.[*].peso").value(hasItem(DEFAULT_PESO.doubleValue())))
            .andExpect(jsonPath("$.[*].altura").value(hasItem(DEFAULT_ALTURA.doubleValue())))
            .andExpect(jsonPath("$.[*].fechaMedicion").value(hasItem(DEFAULT_FECHA_MEDICION.toString())));
    }
    
    @Test
    @Transactional
    public void getMedicion() throws Exception {
        // Initialize the database
        medicionRepository.saveAndFlush(medicion);

        // Get the medicion
        restMedicionMockMvc.perform(get("/api/medicions/{id}", medicion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicion.getId().intValue()))
            .andExpect(jsonPath("$.peso").value(DEFAULT_PESO.doubleValue()))
            .andExpect(jsonPath("$.altura").value(DEFAULT_ALTURA.doubleValue()))
            .andExpect(jsonPath("$.fechaMedicion").value(DEFAULT_FECHA_MEDICION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedicion() throws Exception {
        // Get the medicion
        restMedicionMockMvc.perform(get("/api/medicions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicion() throws Exception {
        // Initialize the database
        medicionRepository.saveAndFlush(medicion);

        int databaseSizeBeforeUpdate = medicionRepository.findAll().size();

        // Update the medicion
        Medicion updatedMedicion = medicionRepository.findById(medicion.getId()).get();
        // Disconnect from session so that the updates on updatedMedicion are not directly saved in db
        em.detach(updatedMedicion);
        updatedMedicion
            .peso(UPDATED_PESO)
            .altura(UPDATED_ALTURA)
            .fechaMedicion(UPDATED_FECHA_MEDICION);

        restMedicionMockMvc.perform(put("/api/medicions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicion)))
            .andExpect(status().isOk());

        // Validate the Medicion in the database
        List<Medicion> medicionList = medicionRepository.findAll();
        assertThat(medicionList).hasSize(databaseSizeBeforeUpdate);
        Medicion testMedicion = medicionList.get(medicionList.size() - 1);
        assertThat(testMedicion.getPeso()).isEqualTo(UPDATED_PESO);
        assertThat(testMedicion.getAltura()).isEqualTo(UPDATED_ALTURA);
        assertThat(testMedicion.getFechaMedicion()).isEqualTo(UPDATED_FECHA_MEDICION);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicion() throws Exception {
        int databaseSizeBeforeUpdate = medicionRepository.findAll().size();

        // Create the Medicion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicionMockMvc.perform(put("/api/medicions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicion)))
            .andExpect(status().isBadRequest());

        // Validate the Medicion in the database
        List<Medicion> medicionList = medicionRepository.findAll();
        assertThat(medicionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicion() throws Exception {
        // Initialize the database
        medicionRepository.saveAndFlush(medicion);

        int databaseSizeBeforeDelete = medicionRepository.findAll().size();

        // Delete the medicion
        restMedicionMockMvc.perform(delete("/api/medicions/{id}", medicion.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Medicion> medicionList = medicionRepository.findAll();
        assertThat(medicionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
