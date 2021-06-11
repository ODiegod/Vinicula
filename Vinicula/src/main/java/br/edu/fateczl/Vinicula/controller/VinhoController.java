package br.edu.fateczl.Vinicula.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.fateczl.Vinicula.model.Vinho;
import br.edu.fateczl.Vinicula.repository.VinhoRepository;

@CrossOrigin
@RestController
@RequestMapping("/vinho")
public class VinhoController {

	@Autowired
	private VinhoRepository vrep;
	
	
	@PostMapping("/add")
	public String adicionarVinho (@Valid @RequestBody Vinho v) {
		
		vrep.save(v);
		System.out.println("Vinho adicionado com sucesso");
		return "Vinho adicionado com sucesso";
	}
	
	@GetMapping("/find/{nome}")
	public ResponseEntity<List<Vinho>> pesquisarVinhoporNome(@PathVariable(value = "nome") String nome){
		
		List<Vinho> vinhos = vrep.findByNome(nome);
		
		return ResponseEntity.ok().body(vinhos);
	}
}
