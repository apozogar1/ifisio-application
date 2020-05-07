package com.wellandsword.ifisio.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "companya")
    private Set<NumDoc> numDocs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public Set<NumDoc> getNumDocs() {
        return numDocs;
    }

    public Companya numDocs(Set<NumDoc> numDocs) {
        this.numDocs = numDocs;
        return this;
    }

    public Companya addNumDoc(NumDoc numDoc) {
        this.numDocs.add(numDoc);
        numDoc.setCompanya(this);
        return this;
    }

    public Companya removeNumDoc(NumDoc numDoc) {
        this.numDocs.remove(numDoc);
        numDoc.setCompanya(null);
        return this;
    }

    public void setNumDocs(Set<NumDoc> numDocs) {
        this.numDocs = numDocs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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
        return "Companya{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
