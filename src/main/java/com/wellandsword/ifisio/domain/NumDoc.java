package com.wellandsword.ifisio.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A NumDoc.
 */
@Entity
@Table(name = "num_doc")
public class NumDoc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_doc")
    private Long numDoc;

    @Column(name = "fecha_alta")
    private Instant fechaAlta;

    @OneToMany(mappedBy = "numDoc")
    private Set<TratamientoCliente> tratamientoClientes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("numDocs")
    private Companya companya;

    @ManyToOne
    @JsonIgnoreProperties("numDocs")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumDoc() {
        return numDoc;
    }

    public NumDoc numDoc(Long numDoc) {
        this.numDoc = numDoc;
        return this;
    }

    public void setNumDoc(Long numDoc) {
        this.numDoc = numDoc;
    }

    public Instant getFechaAlta() {
        return fechaAlta;
    }

    public NumDoc fechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
        return this;
    }

    public void setFechaAlta(Instant fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public Set<TratamientoCliente> getTratamientoClientes() {
        return tratamientoClientes;
    }

    public NumDoc tratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
        this.tratamientoClientes = tratamientoClientes;
        return this;
    }

    public NumDoc addTratamientoCliente(TratamientoCliente tratamientoCliente) {
        this.tratamientoClientes.add(tratamientoCliente);
        tratamientoCliente.setNumDoc(this);
        return this;
    }

    public NumDoc removeTratamientoCliente(TratamientoCliente tratamientoCliente) {
        this.tratamientoClientes.remove(tratamientoCliente);
        tratamientoCliente.setNumDoc(null);
        return this;
    }

    public void setTratamientoClientes(Set<TratamientoCliente> tratamientoClientes) {
        this.tratamientoClientes = tratamientoClientes;
    }

    public Companya getCompanya() {
        return companya;
    }

    public NumDoc companya(Companya companya) {
        this.companya = companya;
        return this;
    }

    public void setCompanya(Companya companya) {
        this.companya = companya;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public NumDoc cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NumDoc)) {
            return false;
        }
        return id != null && id.equals(((NumDoc) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NumDoc{" +
            "id=" + getId() +
            ", numDoc=" + getNumDoc() +
            ", fechaAlta='" + getFechaAlta() + "'" +
            "}";
    }
}
