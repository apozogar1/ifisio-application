package com.wellandsword.ifisio.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A TratamientoCliente.
 */
@Entity
@Table(name = "tratamiento_cliente")
public class TratamientoCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_sesiones")
    private Long numSesiones;

    @Column(name = "diagnostico")
    private String diagnostico;

    @OneToMany(mappedBy = "tratamientoCliente")
    private Set<Cita> citas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tratamientoClientes")
    private Tratamiento tratamiento;

    @ManyToOne
    @JsonIgnoreProperties("tratamientoClientes")
    private NumDoc numDoc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNumSesiones() {
        return numSesiones;
    }

    public TratamientoCliente numSesiones(Long numSesiones) {
        this.numSesiones = numSesiones;
        return this;
    }

    public void setNumSesiones(Long numSesiones) {
        this.numSesiones = numSesiones;
    }

    public String getDiagnostico() {
        return diagnostico;
    }

    public TratamientoCliente diagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
        return this;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }

    public Set<Cita> getCitas() {
        return citas;
    }

    public TratamientoCliente citas(Set<Cita> citas) {
        this.citas = citas;
        return this;
    }

    public TratamientoCliente addCita(Cita cita) {
        this.citas.add(cita);
        cita.setTratamientoCliente(this);
        return this;
    }

    public TratamientoCliente removeCita(Cita cita) {
        this.citas.remove(cita);
        cita.setTratamientoCliente(null);
        return this;
    }

    public void setCitas(Set<Cita> citas) {
        this.citas = citas;
    }

    public Tratamiento getTratamiento() {
        return tratamiento;
    }

    public TratamientoCliente tratamiento(Tratamiento tratamiento) {
        this.tratamiento = tratamiento;
        return this;
    }

    public void setTratamiento(Tratamiento tratamiento) {
        this.tratamiento = tratamiento;
    }

    public NumDoc getNumDoc() {
        return numDoc;
    }

    public TratamientoCliente numDoc(NumDoc numDoc) {
        this.numDoc = numDoc;
        return this;
    }

    public void setNumDoc(NumDoc numDoc) {
        this.numDoc = numDoc;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TratamientoCliente)) {
            return false;
        }
        return id != null && id.equals(((TratamientoCliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TratamientoCliente{" +
            "id=" + getId() +
            ", numSesiones=" + getNumSesiones() +
            ", diagnostico='" + getDiagnostico() + "'" +
            "}";
    }
}
