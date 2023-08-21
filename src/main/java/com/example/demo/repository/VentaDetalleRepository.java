package com.example.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Venta;
import com.example.demo.entity.VentaDetalle;

@RepositoryRestResource(collectionResourceRel = "ventasdetalles", path = "ventasdetalles")
public interface VentaDetalleRepository extends CrudRepository<VentaDetalle,Long>{
    List<VentaDetalle> findByVenta(Venta venta);
}
