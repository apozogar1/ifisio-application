package com.wellandsword.ifisio.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * A Tratamiento.
 */
@Entity
@Table(name = "tratamiento")
public class Tratamiento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "num_sesiones")
	private Long numSesiones;

	@OneToMany(mappedBy = "tratamiento")
	private Set<TratamientoCliente> tratamientoClientes = new HashSet<>();

	// jhipster-needle-entity-add-field - JHipster will add fields here, do not
	// remove
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public Tratamiento nombre(String nombre) {
		this.nombre = nombre;
		return this;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Long getNumSesiones() {
		return numSesiones;
	}

	public Tratamiento numSesiones(Long numSesiones) {
		this.numSesiones = numSesiones;
		return this;
	}

	public void setNumSesiones(Long numSesiones) {
		this.numSesiones = numSesiones;
	}

	public Set<TratamientoCliente> getTratamientoClientes() {
		return tratamientoClientes;
	}

	public Tratamiento tratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
		this.tratamientoClientes = tratamientoClientes;
		return this;
	}

	public Tratamiento addTratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoClientes.add(tratamientoCliente);
		tratamientoCliente.setTratamiento(this);
		return this;
	}

	public Tratamiento removeTratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoClientes.remove(tratamientoCliente);
		tratamientoCliente.setTratamiento(null);
		return this;
	}

	public void setTratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
		this.tratamientoClientes = tratamientoClientes;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Tratamiento)) {
			return false;
		}
		return id != null && id.equals(((Tratamiento) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Tratamiento{" + "id=" + getId() + ", nombre='" + getNombre() + "'" + ", numSesiones=" + getNumSesiones()
				+ "}";
	}
}
