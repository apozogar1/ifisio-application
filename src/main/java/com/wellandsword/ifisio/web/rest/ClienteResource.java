package com.wellandsword.ifisio.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.wellandsword.ifisio.domain.Cliente;
import com.wellandsword.ifisio.domain.NumDoc;
import com.wellandsword.ifisio.repository.ClienteRepository;
import com.wellandsword.ifisio.repository.NumDocRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.wellandsword.ifisio.domain.Cliente}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClienteResource {

	private final Logger log = LoggerFactory.getLogger(ClienteResource.class);

	private static final String ENTITY_NAME = "cliente";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private NumDocRepository numDocRepository;

	/**
	 * {@code POST  /clientes} : Create a new cliente.
	 *
	 * @param cliente the cliente to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new cliente, or with status {@code 400 (Bad Request)} if the
	 *         cliente has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/clientes")
	public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) throws URISyntaxException {
		log.debug("REST request to save Cliente : {}", cliente);
		if (cliente.getId() != null) {
			throw new BadRequestAlertException("A new cliente cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Cliente result = clienteRepository.save(cliente);
		return ResponseEntity
				.created(new URI("/api/clientes/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /clientes} : Updates an existing cliente.
	 *
	 * @param cliente the cliente to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated cliente, or with status {@code 400 (Bad Request)} if the
	 *         cliente is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the cliente couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/clientes")
	public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente) throws URISyntaxException {
		log.debug("REST request to update Cliente : {}", cliente);
		if (cliente.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Cliente result = clienteRepository.save(cliente);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cliente.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /clientes} : get all the clientes.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of clientes in body.
	 */
	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> getAllClientes(Pageable pageable) {
		log.debug("REST request to get a page of Clientes");
		Page<Cliente> page = clienteRepository.findAll(pageable);
		for (Cliente cliente : page) {
			cliente.getNumDocs().forEach(p -> {
				p.getTratamientoClientes().stream()
						.forEach(tratamientos -> tratamientos.getCitas().stream().forEach(cita -> cita.getId()));
				p.getCompanya();
			});
		}
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /clientes/:id} : get the "id" cliente.
	 *
	 * @param id the id of the cliente to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the cliente, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/clientes/{id}")
	public ResponseEntity<Cliente> getCliente(@PathVariable Long id) {
		log.debug("REST request to get Cliente : {}", id);
		Optional<Cliente> cliente = clienteRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(cliente);
	}

	/**
	 * {@code DELETE  /clientes/:id} : delete the "id" cliente.
	 *
	 * @param id the id of the cliente to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
		log.debug("REST request to delete Cliente : {}", id);
		numDocRepository.findByClienteId(id, Pageable.unpaged()).stream().forEach(numDoc -> numDocRepository.delete(numDoc));
		clienteRepository.deleteById(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
