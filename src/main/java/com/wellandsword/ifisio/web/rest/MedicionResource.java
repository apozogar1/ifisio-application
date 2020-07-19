package com.wellandsword.ifisio.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.wellandsword.ifisio.domain.Medicion;
import com.wellandsword.ifisio.repository.MedicionRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.wellandsword.ifisio.domain.Medicion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedicionResource {

	private final Logger log = LoggerFactory.getLogger(MedicionResource.class);

	private static final String ENTITY_NAME = "medicion";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final MedicionRepository medicionRepository;

	public MedicionResource(MedicionRepository medicionRepository) {
		this.medicionRepository = medicionRepository;
	}

	/**
	 * {@code POST  /medicions} : Create a new medicion.
	 *
	 * @param medicion the medicion to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new medicion, or with status {@code 400 (Bad Request)} if
	 *         the medicion has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/medicions")
	public ResponseEntity<Medicion> createMedicion(@RequestBody Medicion medicion) throws URISyntaxException {
		log.debug("REST request to save Medicion : {}", medicion);
		if (medicion.getId() != null) {
			throw new BadRequestAlertException("A new medicion cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Medicion result = medicionRepository.save(medicion);
		return ResponseEntity
				.created(new URI("/api/medicions/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /medicions} : Updates an existing medicion.
	 *
	 * @param medicion the medicion to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated medicion, or with status {@code 400 (Bad Request)} if the
	 *         medicion is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the medicion couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/medicions")
	public ResponseEntity<Medicion> updateMedicion(@RequestBody Medicion medicion) throws URISyntaxException {
		log.debug("REST request to update Medicion : {}", medicion);
		if (medicion.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Medicion result = medicionRepository.save(medicion);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicion.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /medicions} : get all the medicions.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of medicions in body.
	 */
	@GetMapping("/medicions")
	public ResponseEntity<List<Medicion>> getAllMedicions(Pageable pageable) {
		log.debug("REST request to get a page of Medicions");
		Page<Medicion> page = medicionRepository.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	@GetMapping("/medicions/cliente/{id}")
	public ResponseEntity<List<Medicion>> getByClienteMedicions(@PathVariable Long id, Pageable pageable) {
		log.debug("REST request to get a page of Medicions");
		Page<Medicion> page = medicionRepository.findByClienteId(id, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /medicions/:id} : get the "id" medicion.
	 *
	 * @param id the id of the medicion to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the medicion, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/medicions/{id}")
	public ResponseEntity<Medicion> getMedicion(@PathVariable Long id) {
		log.debug("REST request to get Medicion : {}", id);
		Optional<Medicion> medicion = medicionRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(medicion);
	}

	/**
	 * {@code DELETE  /medicions/:id} : delete the "id" medicion.
	 *
	 * @param id the id of the medicion to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/medicions/{id}")
	public ResponseEntity<Void> deleteMedicion(@PathVariable Long id) {
		log.debug("REST request to delete Medicion : {}", id);
		medicionRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
