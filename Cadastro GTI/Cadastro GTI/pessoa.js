class Pessoa{
    constructor(){
    this.pessoas = localStorage.getItem('tbPessoas') === null
    ? []
    : JSON.parse(localStorage.getItem('tbPessoas'))
    }

    salva(pessoa){
        if(document.getElementById('codigo').getAttribute('disabled')=='disabled'){
            this.apaga(pessoa.codigo)
        }
        this.pessoas.push(pessoa) //adicionar um novo registro no fim do array
        localStorage.setItem('tbPessoas',JSON.stringify(this.pessoas))
        alert('Pessoa salva com sucesso!')
    }

    apaga(codigo){
    let index = this.pessoas.findIndex(pessoa => pessoa.codigo == codigo)
    //primeiro parametro é o indice do array e o segundo é o nr de itens removidos
    this.pessoas.splice(index,1)
    localStorage.setItem('tbPessoas', JSON.stringify(this.pessoas))
    pessoa.atualiza()
    }

    edita(pessoa){
    document.getElementById('codigo').value = pessoa.codigo
    document.getElementById('codigo').setAttribute('disabled', 'disabled')
    document.getElementById('nome').value = pessoa.nome
    document.getElementById('cep').value = pessoa.cep
    document.getElementById('endereco').value = pessoa.endereco
    document.getElementById('bairro').value = pessoa.bairro
    document.getElementById('cidade').value = pessoa.cidade
    document.getElementById('observacoes').value = pessoa.observacoes
    }

    lista(){
    const listagem = this.pessoas.map((pessoa) => (
    `<tr>
         <td>${pessoa.codigo}</td>
         <td>${pessoa.nome}</td>
         <td>${pessoa.cep}</td>
         <td>${pessoa.endereco}</td>
         <td>${pessoa.bairro}</td>
         <td>${pessoa.cidade}</td>
         <td>${pessoa.observacoes}</td>
         <td>
         <button id='apagar' onClick='pessoa.apaga(${pessoa.codigo})'>
         🗑️ Apagar</button>
         <button id='editar' onClick='pessoa.edita(${JSON.stringify(pessoa)})'>
         🗒️ Editar</button>
         </td>
     </tr>`
    )).join("")
    return (`<table border='1' class='steelBlueCols'>
    <caption>Relação das Pessoas</caption>
    <thead>
           <th>Código</th>           
           <th>Nome</th>
           <th>CEP</th>             
           <th>Endereço</th>
           <th>Bairro</th>          
           <th>Cidade</th>
           <th>Observações</th>     
           <th>Opções</th>
    </thead>
    <tbody>${listagem}</tbody>
    </table>
    `)
}   
  
    atualiza(){
        document.getElementById('listagem').innerHTML = pessoa.lista()
    }
}

//instanciamos um novo objeto
const pessoa = new Pessoa()

//tratando o botão salvar
document.getElementById('salvar').onclick = function(){

   const registro = {
       codigo: document.getElementById('codigo').value,
       nome: document.getElementById('nome').value,
       cep: document.getElementById('cep').value,
       endereco: document.getElementById('endereco').value,
       bairro: document.getElementById('bairro').value,
       cidade: document.getElementById('cidade').value,
       observacoes: document.getElementById('observacoes').value
   }
   if(registro.codigo === ''){
       alert('O código da pessoa é obrigatório')
       return false
   }
   if(registro.nome === ''){
    alert('O nome da pessoa é obrigatório')
    return false
   }
   if(registro.cep === ''|| registro.endereco==='' || registro.cidade === ''){
    alert('O campo CEP, endereço e cidade da pessoa são obrigatórios')
    return false
   }

   pessoa.salva(registro)
}

//tratando a listagem
window.onload = function(){
    pessoa.atualiza()
}