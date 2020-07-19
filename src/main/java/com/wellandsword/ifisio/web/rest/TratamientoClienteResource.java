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

import com.wellandsword.ifisio.domain.TratamientoCliente;
import com.wellandsword.ifisio.repository.TratamientoClienteRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing
 * {@link com.wellandsword.ifisio.domain.TratamientoCliente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TratamientoClienteResource {

	private final Logger log = LoggerFactory.getLogger(TratamientoClienteResource.class);

	private static final String ENTITY_NAME = "tratamientoCliente";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final TratamientoClienteRepository tratamientoClienteRepository;

	public TratamientoClienteResource(TratamientoClienteRepository tratamientoClienteRepository) {
		this.tratamientoClienteRepository = tratamientoClienteRepository;
	}

	/**
	 * {@code POST  /tratamiento-clientes} : Create a new tratamientoCliente.
	 *
	 * @param tratamientoCliente the tratamientoCliente to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new tratamientoCliente, or with status
	 *         {@code 400 (Bad Request)} if the tratamientoCliente has already an
	 *         ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/tratamiento-clientes")
	public ResponseEntity<TratamientoCliente> createTratamientoCliente(
			@RequestBody TratamientoCliente tratamientoCliente) throws URISyntaxException {
		log.debug("REST request to save TratamientoCliente : {}", tratamientoCliente);
		if (tratamientoCliente.getId() != null) {
			throw new BadRequestAlertException("A new tratamientoCliente cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		TratamientoCliente result = tratamientoClienteRepository.save(tratamientoCliente);
		return ResponseEntity
				.created(new URI("/api/tratamiento-clientes/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /tratamiento-clientes} : Updates an existing tratamientoCliente.
	 *
	 * @param tratamientoCliente the tratamientoCliente to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated tratamientoCliente, or with status
	 *         {@code 400 (Bad Request)} if the tratamientoCliente is not valid, or
	 *         with status {@code 500 (Internal Server Error)} if the
	 *         tratamientoCliente couldn't be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/tratamiento-clientes")
	public ResponseEntity<TratamientoCliente> updateTratamientoCliente(
			@RequestBody TratamientoCliente tratamientoCliente) throws URISyntaxException {
		log.debug("REST request to update TratamientoCliente : {}", tratamientoCliente);
		if (tratamientoCliente.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		TratamientoCliente result = tratamientoClienteRepository.save(tratamientoCliente);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
				tratamientoCliente.getId().toString())).body(result);
	}

	/**
	 * {@code GET  /tratamiento-clientes} : get all the tratamientoClientes.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of tratamientoClientes in body.
	 */
	@GetMapping("/tratamiento-clientes")
	public ResponseEntity<List<TratamientoCliente>> getAllTratamientoClientes(Pageable pageable) {
		log.debug("REST request to get a page of TratamientoClientes");
		Page<TratamientoCliente> page = tratamientoClienteRepository.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /tratamiento-clientes/:id} : get the "id" tratamientoCliente.
	 *
	 * @param id the id of the tratamientoCliente to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the tratamientoCliente, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/tratamiento-clientes/cliente/{id}")
	public ResponseEntity<List<TratamientoCliente>> getTratamientoClienteByCliente(@PathVariable Long id,
			Pageable pageable) {
		log.debug("REST request to get TratamientoCliente : {}", id);
		List<TratamientoCliente> list = tratamientoClienteRepository.findByClienteId(id);
		return ResponseEntity.ok().body(list);
	}

	/**
	 * {@code GET  /tratamiento-clientes/:id} : get the "id" tratamientoCliente.
	 *
	 * @param id the id of the tratamientoCliente to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the tratamientoCliente, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/tratamiento-clientes/{id}")
	public ResponseEntity<TratamientoCliente> getTratamientoCliente(@PathVariable Long id) {
		log.debug("REST request to get TratamientoCliente : {}", id);
		Optional<TratamientoCliente> tratamientoCliente = tratamientoClienteRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(tratamientoCliente);
	}

	/**
	 * {@code DELETE  /tratamiento-clientes/:id} : delete the "id"
	 * tratamientoCliente.
	 *
	 * @param id the id of the tratamientoCliente to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/tratamiento-clientes/{id}")
	public ResponseEntity<Void> deleteTratamientoCliente(@PathVariable Long id) {
		log.debug("REST request to delete TratamientoCliente : {}", id);
		tratamientoClienteRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
