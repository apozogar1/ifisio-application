package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.domain.Cita;
import com.wellandsword.ifisio.repository.CitaRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.wellandsword.ifisio.domain.Cita}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CitaResource {

    private final Logger log = LoggerFactory.getLogger(CitaResource.class);

    private static final String ENTITY_NAME = "cita";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CitaRepository citaRepository;

    public CitaResource(CitaRepository citaRepository) {
        this.citaRepository = citaRepository;
    }

    /**
     * {@code POST  /citas} : Create a new cita.
     *
     * @param cita the cita to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cita, or with status {@code 400 (Bad Request)} if the cita has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/citas")
    public ResponseEntity<Cita> createCita(@RequestBody Cita cita) throws URISyntaxException {
        log.debug("REST request to save Cita : {}", cita);
        if (cita.getId() != null) {
            throw new BadRequestAlertException("A new cita cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cita result = citaRepository.save(cita);
        return ResponseEntity.created(new URI("/api/citas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /citas} : Updates an existing cita.
     *
     * @param cita the cita to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cita,
     * or with status {@code 400 (Bad Request)} if the cita is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cita couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/citas")
    public ResponseEntity<Cita> updateCita(@RequestBody Cita cita) throws URISyntaxException {
        log.debug("REST request to update Cita : {}", cita);
        if (cita.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cita result = citaRepository.save(cita);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cita.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /citas} : get all the citas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of citas in body.
     */
    @GetMapping("/citas")
    public ResponseEntity<List<Cita>> getAllCitas(Pageable pageable) {
        log.debug("REST request to get a page of Citas");
        Page<Cita> page = citaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /citas/:id} : get the "id" cita.
     *
     * @param id the id of the cita to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cita, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/citas/{id}")
    public ResponseEntity<Cita> getCita(@PathVariable Long id) {
        log.debug("REST request to get Cita : {}", id);
        Optional<Cita> cita = citaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cita);
    }

    /**
     * {@code DELETE  /citas/:id} : delete the "id" cita.
     *
     * @param id the id of the cita to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/citas/{id}")
    public ResponseEntity<Void> deleteCita(@PathVariable Long id) {
        log.debug("REST request to delete Cita : {}", id);
        citaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
