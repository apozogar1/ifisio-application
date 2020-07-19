package com.wellandsword.ifisio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellandsword.ifisio.domain.Companya;

/**
 * Spring Data repository for the Companya entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyaRepository extends JpaRepository<Companya, Long> {
}
