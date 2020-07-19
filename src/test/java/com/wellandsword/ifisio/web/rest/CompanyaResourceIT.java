package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.Companya;
import com.wellandsword.ifisio.repository.CompanyaRepository;

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
 * Integration tests for the {@link CompanyaResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class CompanyaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Float DEFAULT_PRECIO_SESION = 1F;
    private static final Float UPDATED_PRECIO_SESION = 2F;

    @Autowired
    private CompanyaRepository companyaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCompanyaMockMvc;

    private Companya companya;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Companya createEntity(EntityManager em) {
        Companya companya = new Companya()
            .nombre(DEFAULT_NOMBRE)
            .precioSesion(DEFAULT_PRECIO_SESION);
        return companya;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Companya createUpdatedEntity(EntityManager em) {
        Companya companya = new Companya()
            .nombre(UPDATED_NOMBRE)
            .precioSesion(UPDATED_PRECIO_SESION);
        return companya;
    }

    @BeforeEach
    public void initTest() {
        companya = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompanya() throws Exception {
        int databaseSizeBeforeCreate = companyaRepository.findAll().size();

        // Create the Companya
        restCompanyaMockMvc.perform(post("/api/companyas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(companya)))
            .andExpect(status().isCreated());

        // Validate the Companya in the database
        List<Companya> companyaList = companyaRepository.findAll();
        assertThat(companyaList).hasSize(databaseSizeBeforeCreate + 1);
        Companya testCompanya = companyaList.get(companyaList.size() - 1);
        assertThat(testCompanya.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCompanya.getPrecioSesion()).isEqualTo(DEFAULT_PRECIO_SESION);
    }

    @Test
    @Transactional
    public void createCompanyaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = companyaRepository.findAll().size();

        // Create the Companya with an existing ID
        companya.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompanyaMockMvc.perform(post("/api/companyas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(companya)))
            .andExpect(status().isBadRequest());

        // Validate the Companya in the database
        List<Companya> companyaList = companyaRepository.findAll();
        assertThat(companyaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCompanyas() throws Exception {
        // Initialize the database
        companyaRepository.saveAndFlush(companya);

        // Get all the companyaList
        restCompanyaMockMvc.perform(get("/api/companyas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(companya.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].precioSesion").value(hasItem(DEFAULT_PRECIO_SESION.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCompanya() throws Exception {
        // Initialize the database
        companyaRepository.saveAndFlush(companya);

        // Get the companya
        restCompanyaMockMvc.perform(get("/api/companyas/{id}", companya.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(companya.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.precioSesion").value(DEFAULT_PRECIO_SESION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCompanya() throws Exception {
        // Get the companya
        restCompanyaMockMvc.perform(get("/api/companyas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompanya() throws Exception {
        // Initialize the database
        companyaRepository.saveAndFlush(companya);

        int databaseSizeBeforeUpdate = companyaRepository.findAll().size();

        // Update the companya
        Companya updatedCompanya = companyaRepository.findById(companya.getId()).get();
        // Disconnect from session so that the updates on updatedCompanya are not directly saved in db
        em.detach(updatedCompanya);
        updatedCompanya
            .nombre(UPDATED_NOMBRE)
            .precioSesion(UPDATED_PRECIO_SESION);

        restCompanyaMockMvc.perform(put("/api/companyas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompanya)))
            .andExpect(status().isOk());

        // Validate the Companya in the database
        List<Companya> companyaList = companyaRepository.findAll();
        assertThat(companyaList).hasSize(databaseSizeBeforeUpdate);
        Companya testCompanya = companyaList.get(companyaList.size() - 1);
        assertThat(testCompanya.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCompanya.getPrecioSesion()).isEqualTo(UPDATED_PRECIO_SESION);
    }

    @Test
    @Transactional
    public void updateNonExistingCompanya() throws Exception {
        int databaseSizeBeforeUpdate = companyaRepository.findAll().size();

        // Create the Companya

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompanyaMockMvc.perform(put("/api/companyas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(companya)))
            .andExpect(status().isBadRequest());

        // Validate the Companya in the database
        List<Companya> companyaList = companyaRepository.findAll();
        assertThat(companyaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCompanya() throws Exception {
        // Initialize the database
        companyaRepository.saveAndFlush(companya);

        int databaseSizeBeforeDelete = companyaRepository.findAll().size();

        // Delete the companya
        restCompanyaMockMvc.perform(delete("/api/companyas/{id}", companya.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Companya> companyaList = companyaRepository.findAll();
        assertThat(companyaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
