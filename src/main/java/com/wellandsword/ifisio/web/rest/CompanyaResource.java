package com.wellandsword.ifisio.web.rest;

import com.wellandsword.ifisio.domain.Companya;
import com.wellandsword.ifisio.repository.CompanyaRepository;
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
 * REST controller for managing {@link com.wellandsword.ifisio.domain.Companya}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CompanyaResource {

    private final Logger log = LoggerFactory.getLogger(CompanyaResource.class);

    private static final String ENTITY_NAME = "companya";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompanyaRepository companyaRepository;

    public CompanyaResource(CompanyaRepository companyaRepository) {
        this.companyaRepository = companyaRepository;
    }

    /**
     * {@code POST  /companyas} : Create a new companya.
     *
     * @param companya the companya to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new companya, or with status {@code 400 (Bad Request)} if the companya has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/companyas")
    public ResponseEntity<Companya> createCompanya(@RequestBody Companya companya) throws URISyntaxException {
        log.debug("REST request to save Companya : {}", companya);
        if (companya.getId() != null) {
            throw new BadRequestAlertException("A new companya cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Companya result = companyaRepository.save(companya);
        return ResponseEntity.created(new URI("/api/companyas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /companyas} : Updates an existing companya.
     *
     * @param companya the companya to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companya,
     * or with status {@code 400 (Bad Request)} if the companya is not valid,
     * or with status {@code 500 (Internal Server Error)} if the companya couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/companyas")
    public ResponseEntity<Companya> updateCompanya(@RequestBody Companya companya) throws URISyntaxException {
        log.debug("REST request to update Companya : {}", companya);
        if (companya.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Companya result = companyaRepository.save(companya);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, companya.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /companyas} : get all the companyas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of companyas in body.
     */
    @GetMapping("/companyas")
    public ResponseEntity<List<Companya>> getAllCompanyas(Pageable pageable) {
        log.debug("REST request to get a page of Companyas");
        Page<Companya> page = companyaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /companyas/:id} : get the "id" companya.
     *
     * @param id the id of the companya to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the companya, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/companyas/{id}")
    public ResponseEntity<Companya> getCompanya(@PathVariable Long id) {
        log.debug("REST request to get Companya : {}", id);
        Optional<Companya> companya = companyaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(companya);
    }

    /**
     * {@code DELETE  /companyas/:id} : delete the "id" companya.
     *
     * @param id the id of the companya to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/companyas/{id}")
    public ResponseEntity<Void> deleteCompanya(@PathVariable Long id) {
        log.debug("REST request to delete Companya : {}", id);
        companyaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
