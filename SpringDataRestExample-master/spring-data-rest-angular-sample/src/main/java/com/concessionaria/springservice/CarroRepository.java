package com.concessionaria.springservice;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CarroRepository extends CrudRepository<Carro, Integer> {

	List<Carro> findByVendido(@Param("vendido") int vendido);
	
	List<Carro> findByStatus(@Param("status") String status);
	
}
