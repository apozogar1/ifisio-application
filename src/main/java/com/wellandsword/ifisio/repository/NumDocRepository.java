package com.wellandsword.ifisio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellandsword.ifisio.domain.NumDoc;

/**
 * Spring Data repository for the NumDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NumDocRepository extends JpaRepository<NumDoc, Long> {
	public List<NumDoc> findByClienteId(Long id);
}
