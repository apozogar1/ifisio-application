package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.domain.Tratamiento;
import com.wellandsword.ifisio.repository.TratamientoRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.wellandsword.ifisio.domain.Tratamiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TratamientoResource {

    private final Logger log = LoggerFactory.getLogger(TratamientoResource.class);

    private static final String ENTITY_NAME = "tratamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TratamientoRepository tratamientoRepository;

    public TratamientoResource(TratamientoRepository tratamientoRepository) {
        this.tratamientoRepository = tratamientoRepository;
    }

    /**
     * {@code POST  /tratamientos} : Create a new tratamiento.
     *
     * @param tratamiento the tratamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tratamiento, or with status {@code 400 (Bad Request)} if the tratamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tratamientos")
    public ResponseEntity<Tratamiento> createTratamiento(@RequestBody Tratamiento tratamiento) throws URISyntaxException {
        log.debug("REST request to save Tratamiento : {}", tratamiento);
        if (tratamiento.getId() != null) {
            throw new BadRequestAlertException("A new tratamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tratamiento result = tratamientoRepository.save(tratamiento);
        return ResponseEntity.created(new URI("/api/tratamientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tratamientos} : Updates an existing tratamiento.
     *
     * @param tratamiento the tratamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tratamiento,
     * or with status {@code 400 (Bad Request)} if the tratamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tratamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tratamientos")
    public ResponseEntity<Tratamiento> updateTratamiento(@RequestBody Tratamiento tratamiento) throws URISyntaxException {
        log.debug("REST request to update Tratamiento : {}", tratamiento);
        if (tratamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tratamiento result = tratamientoRepository.save(tratamiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tratamiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tratamientos} : get all the tratamientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tratamientos in body.
     */
    @GetMapping("/tratamientos")
    public List<Tratamiento> getAllTratamientos() {
        log.debug("REST request to get all Tratamientos");
        return tratamientoRepository.findAll();
    }

    /**
     * {@code GET  /tratamientos/:id} : get the "id" tratamiento.
     *
     * @param id the id of the tratamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tratamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tratamientos/{id}")
    public ResponseEntity<Tratamiento> getTratamiento(@PathVariable Long id) {
        log.debug("REST request to get Tratamiento : {}", id);
        Optional<Tratamiento> tratamiento = tratamientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tratamiento);
    }

    /**
     * {@code DELETE  /tratamientos/:id} : delete the "id" tratamiento.
     *
     * @param id the id of the tratamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tratamientos/{id}")
    public ResponseEntity<Void> deleteTratamiento(@PathVariable Long id) {
        log.debug("REST request to delete Tratamiento : {}", id);
        tratamientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
