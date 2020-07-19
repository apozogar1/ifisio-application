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
 * A Companya.
 */
@Entity
@Table(name = "companya")
public class Companya implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "precio_sesion")
	private Float precioSesion;

	@OneToMany(mappedBy = "companya")
	private Set<Cliente> clientes = new HashSet<>();

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

	public Companya nombre(String nombre) {
		this.nombre = nombre;
		return this;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Float getPrecioSesion() {
		return precioSesion;
	}

	public Companya precioSesion(Float precioSesion) {
		this.precioSesion = precioSesion;
		return this;
	}

	public void setPrecioSesion(Float precioSesion) {
		this.precioSesion = precioSesion;
	}

	public Set<Cliente> getClientes() {
		return clientes;
	}

	public Companya clientes(Set<Cliente> clientes) {
		this.clientes = clientes;
		return this;
	}

	public Companya addCliente(Cliente cliente) {
		this.clientes.add(cliente);
		cliente.setCompanya(this);
		return this;
	}

	public Companya removeCliente(Cliente cliente) {
		this.clientes.remove(cliente);
		cliente.setCompanya(null);
		return this;
	}

	public void setClientes(Set<Cliente> clientes) {
		this.clientes = clientes;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Companya)) {
			return false;
		}
		return id != null && id.equals(((Companya) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Companya{" + "id=" + getId() + ", nombre='" + getNombre() + "'" + ", precioSesion=" + getPrecioSesion()
				+ "}";
	}
}
