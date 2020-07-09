package com.wellandsword.ifisio.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A Cita.
 */
@Entity
@Table(name = "cita")
public class Cita implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "fecha_hora_cita")
	private Instant fechaHoraCita;

	@Column(name = "comentarios")
	private String comentarios;

	@ManyToOne
	@JsonIgnoreProperties("citas")
	private TratamientoCliente tratamientoCliente;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Instant getFechaHoraCita() {
		return fechaHoraCita;
	}

	public Cita fechaHoraCita(Instant fechaHoraCita) {
		this.fechaHoraCita = fechaHoraCita;
		return this;
	}

	public void setFechaHoraCita(Instant fechaHoraCita) {
		this.fechaHoraCita = fechaHoraCita;
	}

	public TratamientoCliente getTratamientoCliente() {
		return tratamientoCliente;
	}

	public Cita tratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoCliente = tratamientoCliente;
		return this;
	}

	public void setTratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoCliente = tratamientoCliente;
	}

	public String getComentarios() {
		return comentarios;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Cita)) {
			return false;
		}
		return id != null && id.equals(((Cita) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Cita{" + "id=" + getId() + ", fechaHoraCita='" + getFechaHoraCita() + "'" + "}";
	}
}
