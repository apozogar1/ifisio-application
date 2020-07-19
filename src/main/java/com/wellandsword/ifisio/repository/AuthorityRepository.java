package com.wellandsword.ifisio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellandsword.ifisio.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
