package com.wellandsword.ifisio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wellandsword.ifisio.domain.Tratamiento;

/**
 * Spring Data repository for the Tratamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TratamientoRepository extends JpaRepository<Tratamiento, Long> {
}
