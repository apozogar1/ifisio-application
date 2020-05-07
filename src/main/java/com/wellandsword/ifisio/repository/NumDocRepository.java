package com.wellandsword.ifisio.repository;

import com.wellandsword.ifisio.domain.NumDoc;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NumDoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NumDocRepository extends JpaRepository<NumDoc, Long> {
}
