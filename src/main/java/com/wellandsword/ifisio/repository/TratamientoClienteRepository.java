package com.wellandsword.ifisio.repository;

import com.wellandsword.ifisio.domain.Cita;
import com.wellandsword.ifisio.domain.TratamientoCliente;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TratamientoCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TratamientoClienteRepository extends JpaRepository<TratamientoCliente, Long> {
	
	List<TratamientoCliente> findByNumDocClienteId(Long id);
}
