package com.wellandsword.ifisio.repository;

import com.wellandsword.ifisio.domain.Companya;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Companya entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyaRepository extends JpaRepository<Companya, Long> {
}
