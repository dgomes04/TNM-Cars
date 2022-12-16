const verLogin = () => {
  const token = localStorage.getItem('token');
  if (token != undefined || token != null ) {
      document.getElementById("perfil").innerHTML = `<a href="../perfil/perfil.html" style="margin-left: 5px;">Perfil</a>`;
      document.getElementById("favoritos").innerHTML = `<a href="../favoritos/meus-favoritos.html" style="margin-left: 5px;" onclick="resetarForm()">Favoritos</a>`;
      
  }
}
const pesquisar_carro_id = () => {
  var id = localStorage.getItem('id');
  console.log(id);
    const pesquisar = {
        id: id
    }
    fetch(`http://localhost:3456/carro/carro`, {
        method: 'POST',
        body: JSON.stringify(pesquisar),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {
        console.log(dados)
        var valor =  dados[0].valor.toString()
         var valorResultado;
         if(valor.length == 6){
          valorResultado = valor.slice(0,3) + "." + valor.slice(3) + ",00"
         }else if(valor.length == 5){
          valorResultado = valor.slice(0,2) + "." + valor.slice(2) + ",00"
         }
        var salvaDados = ``;
        salvaDados = `<div class="conteudo-central">
        <div class="titulo">
            <div class="titulo-posicao">
              <h1>${dados[0].marca + " " + dados[0].nome + " " +  dados[0].modelo  }</h1>
            </div>
        </div>
        <div class="conteudo">
          <div class="conteudo-esquerda">
            <div class="imagem-carro">
              <div class="imagem-posicao">
              <img src="${dados[0].foto}" width="100%" height="100%"alt="">
              </div>
            </div>
            <div class="dados-carro">
              <div class="dados-posicao">
                <div class="ano">
                    <h2 style="text-align:center;">Ano</h2>
                    <h3 style="text-align:center;">${dados[0].ano}</h3>
                </div>
                <div class="km">
                    <h2 style="text-align:center;">Km</h2>    
                    <h3 style="text-align:center;">${dados[0].km}</h3>
                </div>
                <div class="cor">
                    <h2 style="text-align:center;">Cor</h2>
                    <h3 style="text-align:center;">${dados[0].cor}</h3>
                </div>
                <div class="cambio">
                    <h2 style="text-align:center;">Câmbio</h2>
                    <h3 style="text-align:center;">${dados[0].cambio}</h3>
                </div>
              </div>
            </div>
            <div class="descricao-carro">
              <div class="descricao-posicao">
                <div class="descricao">
                    <p>${dados[0].descrição}
                </div>
              </div>
            </div>
          </div>
          <div class="conteudo-direita">
            <div class="dados-valor">
                <div class="preco">
                    <h1>R$ ${valorResultado}</h1>
                </div>
                <div class="mensagem-interessado">
                    <h2>Ficou interessado?</h2>
                    <p>Preencha seus dados e envie sua proposta para o vendedor</p>

                </div>
            </div>
            <div class="dados-usuario">
                <div class="dado-nome">
                <label for="nome-completo">Nome: </label>
                <input id="nome" type="text" name="nome-completo" placeholder="Digite seu nome">
                </div>
                <div class="dado-email">
                <label for="email">Email: </label>
                <input id="nome" type="mail" name="email" placeholder="Digite seu email">
                </div>
                <div class="dado-telefone">
                <label for="telefone">Telefone: </label>
                <input id="nome" type="tel" name="telefone" placeholder="(xx)xxxx-xxxx">
                </div>
                <div class="dado-cpf">
                <label for="cpf">CPF</label>
                <input id="nome" type="text" name="cpf" placeholder="Digite seu CPF">
                </div>
                <div class="dado-observacoes">
                <textarea placeholder="Escreva sua proposta" minlength="20"></textarea>
                
                </div>
            </div>
            <div class="botao-mensagem">
            
            
                <button ><a style="color: black;">Enviar proposta</a> </button>
            
            
        </div>
            </div>
          </div>
        </div>
      </div>`
        
    document.querySelector('.main').innerHTML = salvaDados
    })
}


