package com.wellandsword.ifisio.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
public class Cliente implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre")
	private String nombre;

	@Column(name = "apellidos")
	private String apellidos;

	@Column(name = "telefono")
	private String telefono;

	@Column(name = "fecha_nacimiento")
	private Instant fechaNacimiento;

	@OneToMany(mappedBy = "cliente")
	private Set<Medicion> medicions = new HashSet<>();

	@OneToMany(mappedBy = "cliente")
	private Set<TratamientoCliente> tratamientoClientes = new HashSet<>();

	@ManyToOne
	@JsonIgnoreProperties("clientes")
	private Companya companya;

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

	public Cliente nombre(String nombre) {
		this.nombre = nombre;
		return this;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public Cliente apellidos(String apellidos) {
		this.apellidos = apellidos;
		return this;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getTelefono() {
		return telefono;
	}

	public Cliente telefono(String telefono) {
		this.telefono = telefono;
		return this;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public Instant getFechaNacimiento() {
		return fechaNacimiento;
	}

	public Cliente fechaNacimiento(Instant fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
		return this;
	}

	public void setFechaNacimiento(Instant fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public Set<Medicion> getMedicions() {
		return medicions;
	}

	public Cliente medicions(Set<Medicion> medicions) {
		this.medicions = medicions;
		return this;
	}

	public Cliente addMedicion(Medicion medicion) {
		this.medicions.add(medicion);
		medicion.setCliente(this);
		return this;
	}

	public Cliente removeMedicion(Medicion medicion) {
		this.medicions.remove(medicion);
		medicion.setCliente(null);
		return this;
	}

	public void setMedicions(Set<Medicion> medicions) {
		this.medicions = medicions;
	}

	public Set<TratamientoCliente> getTratamientoClientes() {
		return tratamientoClientes;
	}

	public Cliente tratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
		this.tratamientoClientes = tratamientoClientes;
		return this;
	}

	public Cliente addTratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoClientes.add(tratamientoCliente);
		tratamientoCliente.setCliente(this);
		return this;
	}

	public Cliente removeTratamientoCliente(TratamientoCliente tratamientoCliente) {
		this.tratamientoClientes.remove(tratamientoCliente);
		tratamientoCliente.setCliente(null);
		return this;
	}

	public void setTratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
		this.tratamientoClientes = tratamientoClientes;
	}

	public Companya getCompanya() {
		return companya;
	}

	public Cliente companya(Companya companya) {
		this.companya = companya;
		return this;
	}

	public void setCompanya(Companya companya) {
		this.companya = companya;
	}
	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here, do not remove

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Cliente)) {
			return false;
		}
		return id != null && id.equals(((Cliente) o).id);
	}

	@Override
	public int hashCode() {
		return 31;
	}

	@Override
	public String toString() {
		return "Cliente{" + "id=" + getId() + ", nombre='" + getNombre() + "'" + ", apellidos='" + getApellidos() + "'"
				+ ", telefono='" + getTelefono() + "'" + ", fechaNacimiento='" + getFechaNacimiento() + "'" + "}";
	}
}
