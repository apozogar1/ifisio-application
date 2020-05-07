package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.IFisioApp;
import com.wellandsword.ifisio.domain.NumDoc;
import com.wellandsword.ifisio.repository.NumDocRepository;

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
 * Integration tests for the {@link NumDocResource} REST controller.
 */
@SpringBootTest(classes = IFisioApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class NumDocResourceIT {

    private static final String DEFAULT_COMPANYIA = "AAAAAAAAAA";
    private static final String UPDATED_COMPANYIA = "BBBBBBBBBB";

    private static final Long DEFAULT_NUM_DOC = 1L;
    private static final Long UPDATED_NUM_DOC = 2L;

    @Autowired
    private NumDocRepository numDocRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNumDocMockMvc;

    private NumDoc numDoc;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NumDoc createEntity(EntityManager em) {
        NumDoc numDoc = new NumDoc()
            .companyia(DEFAULT_COMPANYIA)
            .numDoc(DEFAULT_NUM_DOC);
        return numDoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NumDoc createUpdatedEntity(EntityManager em) {
        NumDoc numDoc = new NumDoc()
            .companyia(UPDATED_COMPANYIA)
            .numDoc(UPDATED_NUM_DOC);
        return numDoc;
    }

    @BeforeEach
    public void initTest() {
        numDoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createNumDoc() throws Exception {
        int databaseSizeBeforeCreate = numDocRepository.findAll().size();

        // Create the NumDoc
        restNumDocMockMvc.perform(post("/api/num-docs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(numDoc)))
            .andExpect(status().isCreated());

        // Validate the NumDoc in the database
        List<NumDoc> numDocList = numDocRepository.findAll();
        assertThat(numDocList).hasSize(databaseSizeBeforeCreate + 1);
        NumDoc testNumDoc = numDocList.get(numDocList.size() - 1);
        assertThat(testNumDoc.getCompanyia()).isEqualTo(DEFAULT_COMPANYIA);
        assertThat(testNumDoc.getNumDoc()).isEqualTo(DEFAULT_NUM_DOC);
    }

    @Test
    @Transactional
    public void createNumDocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = numDocRepository.findAll().size();

        // Create the NumDoc with an existing ID
        numDoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNumDocMockMvc.perform(post("/api/num-docs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(numDoc)))
            .andExpect(status().isBadRequest());

        // Validate the NumDoc in the database
        List<NumDoc> numDocList = numDocRepository.findAll();
        assertThat(numDocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNumDocs() throws Exception {
        // Initialize the database
        numDocRepository.saveAndFlush(numDoc);

        // Get all the numDocList
        restNumDocMockMvc.perform(get("/api/num-docs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(numDoc.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyia").value(hasItem(DEFAULT_COMPANYIA)))
            .andExpect(jsonPath("$.[*].numDoc").value(hasItem(DEFAULT_NUM_DOC.intValue())));
    }
    
    @Test
    @Transactional
    public void getNumDoc() throws Exception {
        // Initialize the database
        numDocRepository.saveAndFlush(numDoc);

        // Get the numDoc
        restNumDocMockMvc.perform(get("/api/num-docs/{id}", numDoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(numDoc.getId().intValue()))
            .andExpect(jsonPath("$.companyia").value(DEFAULT_COMPANYIA))
            .andExpect(jsonPath("$.numDoc").value(DEFAULT_NUM_DOC.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNumDoc() throws Exception {
        // Get the numDoc
        restNumDocMockMvc.perform(get("/api/num-docs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNumDoc() throws Exception {
        // Initialize the database
        numDocRepository.saveAndFlush(numDoc);

        int databaseSizeBeforeUpdate = numDocRepository.findAll().size();

        // Update the numDoc
        NumDoc updatedNumDoc = numDocRepository.findById(numDoc.getId()).get();
        // Disconnect from session so that the updates on updatedNumDoc are not directly saved in db
        em.detach(updatedNumDoc);
        updatedNumDoc
            .companyia(UPDATED_COMPANYIA)
            .numDoc(UPDATED_NUM_DOC);

        restNumDocMockMvc.perform(put("/api/num-docs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNumDoc)))
            .andExpect(status().isOk());

        // Validate the NumDoc in the database
        List<NumDoc> numDocList = numDocRepository.findAll();
        assertThat(numDocList).hasSize(databaseSizeBeforeUpdate);
        NumDoc testNumDoc = numDocList.get(numDocList.size() - 1);
        assertThat(testNumDoc.getCompanyia()).isEqualTo(UPDATED_COMPANYIA);
        assertThat(testNumDoc.getNumDoc()).isEqualTo(UPDATED_NUM_DOC);
    }

    @Test
    @Transactional
    public void updateNonExistingNumDoc() throws Exception {
        int databaseSizeBeforeUpdate = numDocRepository.findAll().size();

        // Create the NumDoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNumDocMockMvc.perform(put("/api/num-docs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(numDoc)))
            .andExpect(status().isBadRequest());

        // Validate the NumDoc in the database
        List<NumDoc> numDocList = numDocRepository.findAll();
        assertThat(numDocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNumDoc() throws Exception {
        // Initialize the database
        numDocRepository.saveAndFlush(numDoc);

        int databaseSizeBeforeDelete = numDocRepository.findAll().size();

        // Delete the numDoc
        restNumDocMockMvc.perform(delete("/api/num-docs/{id}", numDoc.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NumDoc> numDocList = numDocRepository.findAll();
        assertThat(numDocList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
