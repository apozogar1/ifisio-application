package com.wellandsword.ifisio.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellandsword.ifisio.domain.Medicion;

/**
 * Spring Data repository for the Medicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicionRepository extends JpaRepository<Medicion, Long> {

	public Page<Medicion> findByClienteId(Long id, Pageable pageable);
}