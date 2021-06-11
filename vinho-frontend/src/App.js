import axios from "axios";
import React from "react";
import logo from "./Vinho.png"
import "./vinho.css"

function cabecalho() { 
  return (
    <div>
    <img src={logo} className="photo" alt="logo"/>
    <h2>Diego's Vinhos</h2>
    <br/>
    <br/>
    <br/>
    <br/>
    </div>
  );
}

class VinhoCorpo extends React.Component{
  state ={ 
    vinhoAtual : {
      nome:'',
      safra:'',
      preco: ''
    },

    lista: [
    ],
    vinhoPesquisa:{
      nome:''
    }
  }



  inputChangeAtual (campo, novoTexto) {
    const novoState = {...this.state}
    novoState.vinhoAtual[campo] = novoTexto
    this.setState(novoState)
  }

  inputChangePesquisa (campo, novoTexto) {
    const novoState = {...this.state}
    novoState.vinhoPesquisa[campo] = novoTexto
    this.setState(novoState)
  }


  adicionar() {
    const apiUrl = `http://localhost:8080/Vinicula/vinho/add`;
    axios.post(apiUrl, this.state.vinhoAtual)
        .then(
            (response) => {
                console.log(response.body);
                this.carregarVinho();
                this.inputChangeAtual('nome', "");
                this.inputChangeAtual('safra', "");
                this.inputChangeAtual('preco', "");
            })
        .catch((err) => {
            console.log(err);
        });
}


   carregarVinhos() {
    const opts = {
        responseType: 'json'
    }
    axios.get(`http://localhost:8080/Vinicula/vinho/find/${this.state.vinhoPesquisa.nome}`, opts)
        .then(
            (response) => {
                const novoState = { ...this.state };
                novoState.lista = response.data;
                this.setState(novoState);
            })
        .catch((err) => {
            console.log(err);
        });
    console.log("Vinhos carregados com sucesso");
}


   render(){
     const displayLista = [];

     for (let i=0; i<this.state.lista.length; i++){
       displayLista.push(
         <tr key ={i}>
         <td>{this.state.lista[i].nome}</td>
         <td>{this.state.lista[i].safra}</td>
         <td> {this.state.lista[i].preco}</td>
         </tr>)
      }

    return (      
      <div>
      <p>Dados do Vinho</p>
      <div className = "form-group">
        <label>Nome: </label>
      <input type = "TEXT" value = {this.state.vinhoAtual.nome} 
      placeholder ="Digite o Nome do Vinho"
      className="form-control"
      onChange={(novoTexto) =>{this.inputChangeAtual('nome',novoTexto.target.value)}}/>
      </div>
      <div className = "form-group">
      <label>Safra: </label>
      <input type = "TEXT" value = {this.state.vinhoAtual.safra} 
      placeholder ="Digite a data da safra do vinho"
      className="form-control"
      onChange={(novoTexto) =>{this.inputChangeAtual('safra',novoTexto.target.value)}}/>
      </div>
      <div className = "form-group">
      <label>Valor: </label>
      <input type = "TEXT" value = {this.state.vinhoAtual.preco} 
      className="form-control"
      placeholder ="Digite o preço do vinho"
      onChange={(novoTexto) =>{this.inputChangeAtual('preco',novoTexto.target.value)}}/>
      </div>
      <button className="btn btn-primary" onClick = {()=> {this.adicionar()}}>Adicionar</button>
      <p>Vinhos no Estoque</p>
      <table className = "table table-striped">
        <thead>
        <tr>
          <th>Nome</th>
          <th>safra</th>
          <th>preco</th>
        </tr>
        </thead>
        <tbody>
          {displayLista}
        </tbody>
      </table>
      <div className = "form-group">
        <label>Vinho a ser pesquisado: </label>
      <input type = "TEXT" value = {this.state.vinhoPesquisa.nome} 
      placeholder ="Digite o Nome do Vinho"
      className="form-control"
      onChange={(novoTexto) =>{this.inputChangePesquisa('nome',novoTexto.target.value)}}/>
      </div>
      <button className= "btn btn-primary" onClick={() => {this.carregarVinhos()}}>Carregar Vinho</button>
      </div>
      
      )
  }  
}


function retornaPagina() { 
  return (
    <div className="container">
      {cabecalho()}
      <VinhoCorpo/>
    </div>
  );
}


export default retornaPagina;