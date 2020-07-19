package com.wellandsword.ifisio.domain;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

	@Column(name = "fecha_hora_cita_fin")
	private Instant fechaHoraCitaFin;

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

	public Instant getFechaHoraCitaFin() {
		return fechaHoraCitaFin;
	}

	public Cita fechaHoraCitaFin(Instant fechaHoraCitaFin) {
		this.fechaHoraCitaFin = fechaHoraCitaFin;
		return this;
	}

	public void setFechaHoraCitaFin(Instant fechaHoraCitaFin) {
		this.fechaHoraCitaFin = fechaHoraCitaFin;
	}

	public String getComentarios() {
		return comentarios;
	}

	public Cita comentarios(String comentarios) {
		this.comentarios = comentarios;
		return this;
	}

	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
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
		return "Cita{" + "id=" + getId() + ", fechaHoraCita='" + getFechaHoraCita() + "'" + ", fechaHoraCitaFin='"
				+ getFechaHoraCitaFin() + "'" + ", comentarios='" + getComentarios() + "'" + "}";
	}
}
