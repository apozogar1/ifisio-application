package com.wellandsword.ifisio.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
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
import com.wellandsword.ifisio.domain.Medicion;
import com.wellandsword.ifisio.domain.NumDoc;
import com.wellandsword.ifisio.repository.ClienteRepository;
import com.wellandsword.ifisio.repository.CompanyaRepository;
import com.wellandsword.ifisio.repository.NumDocRepository;
import com.wellandsword.ifisio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.wellandsword.ifisio.domain.NumDoc}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NumDocResource {

	private final Logger log = LoggerFactory.getLogger(NumDocResource.class);

	private static final String ENTITY_NAME = "numDoc";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	@Autowired
	private NumDocRepository numDocRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private CompanyaRepository companyaRepository;

	/**
	 * {@code POST  /num-docs} : Create a new numDoc.
	 *
	 * @param numDoc the numDoc to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new numDoc, or with status {@code 400 (Bad Request)} if the
	 *         numDoc has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/num-docs")
	public ResponseEntity<NumDoc> createNumDoc(@RequestBody NumDoc numDoc) throws URISyntaxException {
		log.debug("REST request to save NumDoc : {}", numDoc);
		if (numDoc.getId() != null) {
			throw new BadRequestAlertException("A new numDoc cannot already have an ID", ENTITY_NAME, "idexists");
		}
		if (numDoc.getCliente() != null && numDoc.getCliente().getId() == null) {
			clienteRepository.save(numDoc.getCliente());
		}
		if (numDoc.getCompanya() != null && numDoc.getCompanya().getId() == null) {
			companyaRepository.save(numDoc.getCompanya());
		}
		NumDoc result = numDocRepository.save(numDoc);
		return ResponseEntity.created(new URI("/api/num-docs/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * {@code PUT  /num-docs} : Updates an existing numDoc.
	 *
	 * @param numDoc the numDoc to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated numDoc, or with status {@code 400 (Bad Request)} if the
	 *         numDoc is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the numDoc couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/num-docs")
	public ResponseEntity<NumDoc> updateNumDoc(@RequestBody NumDoc numDoc) throws URISyntaxException {
		log.debug("REST request to update NumDoc : {}", numDoc);
		if (numDoc.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		NumDoc result = numDocRepository.save(numDoc);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, numDoc.getId().toString())).body(result);
	}

	/**
	 * {@code GET  /num-docs} : get all the numDocs.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of numDocs in body.
	 */
	@GetMapping("/num-docs")
	public ResponseEntity<List<NumDoc>> getAllNumDocs(Pageable pageable) {
		log.debug("REST request to get a page of NumDocs");
		Page<NumDoc> page = numDocRepository.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}
	
	
	@GetMapping("/num-docs/cliente/{id}")
	public ResponseEntity<List<NumDoc>> getByClienteNumDoc(@PathVariable Long id, Pageable pageable) {
		log.debug("REST request to get a page of NumDocs");
		Page<NumDoc> page = numDocRepository.findByClienteId(id, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /num-docs} : get all the numDocs.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of numDocs in body.
	 */
//	@GetMapping("/num-docs/cliente/{id}")
//	public ResponseEntity<List<NumDoc>> getAllNumDocsByCliente(@PathVariable Long id) {
//		log.debug("REST request to get a page of NumDocs");
//		NumDoc probe = new NumDoc();
//		Cliente cliente = new Cliente();
//		cliente.setId(id);
//		probe.setCliente(cliente);
//		List<NumDoc> page = numDocRepository.findAll(Example.of(probe));
//		return ResponseEntity.ok().body(page);
//	}

	/**
	 * {@code GET  /num-docs/:id} : get the "id" numDoc.
	 *
	 * @param id the id of the numDoc to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the numDoc, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/num-docs/{id}")
	public ResponseEntity<NumDoc> getNumDoc(@PathVariable Long id) {
		log.debug("REST request to get NumDoc : {}", id);
		Optional<NumDoc> numDoc = numDocRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(numDoc);
	}

	/**
	 * {@code DELETE  /num-docs/:id} : delete the "id" numDoc.
	 *
	 * @param id the id of the numDoc to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/num-docs/{id}")
	public ResponseEntity<Void> deleteNumDoc(@PathVariable Long id) {
		log.debug("REST request to delete NumDoc : {}", id);
		numDocRepository.deleteById(id);
		return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
