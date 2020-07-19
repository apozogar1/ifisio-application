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
 * A Medicion.
 */
@Entity
@Table(name = "medicion")
public class Medicion implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "peso")
	private Float peso;

	@Column(name = "altura")
	private Float altura;

	@Column(name = "imc")
	private Float imc;

	@Column(name = "fecha_medicion")
	private Instant fechaMedicion;

	@ManyToOne
	@JsonIgnoreProperties("medicions")
	private Cliente cliente;

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Float getPeso() {
		return peso;
	}

	public Medicion peso(Float peso) {
		this.peso = peso;
		return this;
	}

	public void setPeso(Float peso) {
		this.peso = peso;
	}

	public Float getAltura() {
		return altura;
	}

	public Medicion altura(Float altura) {
		this.altura = altura;
		return this;
	}

	public void setAltura(Float altura) {
		this.altura = altura;
	}

	public Float getImc() {
		return imc;
	}

	public Medicion imc(Float imc) {
		this.imc = imc;
		return this;
	}

	public void setImc(Float imc) {
		this.imc = imc;
	}

	public Instant getFechaMedicion() {
		return fechaMedicion;
	}

	public Medicion fechaMedicion(Instant fechaMedicion) {
		this.fechaMedicion = fechaMedicion;
		return this;
	}

	public void setFechaMedicion(Instant fechaMedicion) {
		this.fechaMedicion = fechaMedicion;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public Medicion cliente(Cliente cliente) {
		this.cliente = cliente;
		return this;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Medicion)) {
			return false;
		}
		return id != null && id.equals(((Medicion) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Medicion{" + "id=" + getId() + ", peso=" + getPeso() + ", altura=" + getAltura() + ", imc=" + getImc()
				+ ", fechaMedicion='" + getFechaMedicion() + "'" + "}";
	}
}
