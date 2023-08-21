package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Vendedor;

@RepositoryRestResource(collectionResourceRel = "vendedores", path = "vendedores")
public interface VendedorRepository extends CrudRepository<Vendedor, Long> {
    
}
