package com.wellandsword.ifisio.repository;

import com.wellandsword.ifisio.domain.Medicion;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Medicion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicionRepository extends JpaRepository<Medicion, Long> {
}
