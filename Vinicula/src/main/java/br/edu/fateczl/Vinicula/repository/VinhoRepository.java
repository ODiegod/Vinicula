package br.edu.fateczl.Vinicula.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.fateczl.Vinicula.model.Vinho;

@Repository
public interface VinhoRepository extends JpaRepository<Vinho, Long>{

	public List<Vinho> findByNome (String nome);
}
