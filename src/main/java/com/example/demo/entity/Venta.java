package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.Objects;

@Entity
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int nroventa;

    @ManyToOne
    @JoinColumn(name = "id_vendedor")
    private Vendedor vendedor;

    private Double importe;
    private Double igv;
    private Double total;

    public Venta() {}

    public Venta(int nroventa, Vendedor vendedor, Double importe, Double igv, Double total) {
        this.nroventa = nroventa;
        this.vendedor = vendedor;
        this.importe = importe;
        this.igv = igv;
        this.total = total;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public int getNroventa() {
        return nroventa;
    }

    public void setNroventa(int nroventa) {
        this.nroventa = nroventa;
    }

    public Vendedor getVendedor() {
        return vendedor;
    }

    public void setVendedor(Vendedor vendedor) {
        this.vendedor = vendedor;
    }

    public Double getImporte() {
        return importe;
    }

    public void setImporte(Double importe) {
        this.importe = importe;
    }

    public Double getIgv() {
        return igv;
    }

    public void setIgv(Double igv) {
        this.igv = igv;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Venta venta = (Venta) o;
        return id == venta.id &&
                Double.compare(venta.importe, importe) == 0 &&
                Double.compare(venta.igv, igv) == 0 &&
                Double.compare(venta.total, total) == 0 &&
                Objects.equals(vendedor, venta.vendedor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, vendedor, importe, igv, total);
    }

    @Override
    public String toString() {
        return "Venta{" +
                "id=" + id +
                ", vendedor=" + vendedor +
                ", importe=" + importe +
                ", igv=" + igv +
                ", total=" + total +
                '}';
    }

    
}
