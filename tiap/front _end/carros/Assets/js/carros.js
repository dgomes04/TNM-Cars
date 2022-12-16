const verLogin = () => {
  const token = localStorage.getItem('token');
  if (token != undefined || token != null ) {
      document.getElementById("perfil").innerHTML = `<a href="../perfil/perfil.html" style="margin-left: 5px;">Perfil</a>`;
      document.getElementById("favoritos").innerHTML = `<a href="../favoritos/meus-favoritos.html" style="margin-left: 5px;" onclick="resetarForm()">Favoritos</a>`;
      
  }
}
function montaCardPesquisa() {
  
  let carroAtual = JSON.parse(localStorage.getItem('carrosForm'));

  if (carroAtual != null && carroAtual.length > 0) {
    let dadosCarros = '';


    for (let i = 0; i < carroAtual.length; i++) {

      var descricao = "" 
          for(let j = 0;j < 100;j++){
            if(carroAtual[i].descrição[j] == undefined)
            break;
            
             descricao += carroAtual[i].descrição[j].toUpperCase()
          } 
          descricao += "..."
         var valor =  carroAtual[i].valor.toString()
         var valorResultado;
         if(valor.length == 6){
          valorResultado = valor.slice(0,3) + "." + valor.slice(3) + ",00"
         }else if(valor.length == 5){
          valorResultado = valor.slice(0,2) + "." + valor.slice(2) + ",00"
         }
         
         
      dadosCarros += `<li>
          
      <div class="conteudo-principal" id="salvadados>
      <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
          <div class="quadrado-de-cima">
              <div class="quadrado-do-titulo">
              
                  <input id="id-${carroAtual[i].id}" value ="${carroAtual[i].id}" hidden>
                  <h2>${carroAtual[i].marca} ${carroAtual[i].nome} ${carroAtual[i].modelo}</h2>
              </div>
              <div class="quadrado-do-preco">
                  <h3 >R$${valorResultado}</h3>
              </div>
          </div>
          </a>
          <div class="quadrado-conteudo-principal">
              <div class="carro">
              <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
                  <img src="${carroAtual[i].foto}" width="100%" height="100%"alt="">
                  </a>
              </div>
              <div class="descricao">
              <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
                  <div class="detalhe">
                      <div class="ano">
                          <p style="font-size: larger;">Ano</p>
                          <p style=" font-weight:bold;">${carroAtual[i].ano}</p>
                      </div>
                      <div class="km">
                          <p style="font-size: larger;">Km</p>
                          <p style=" font-weight:bold;">${carroAtual[i].km}</p>
                      </div>
                      <div class="cambio">
                          <p >Câmbio</p>

                          <p style=" font-weight:bold;">${carroAtual[i].cambio}</p>
                      </div>
                  </div>
                  <div class="mais-detalhe">
                      <h2 style="font-weight:300; padding-top:10px;">${descricao}</h2>
                  </div>
                  </a> 
              </div>
              <div class="logo-carros">
             
                  <img src="${carroAtual[i].imagem_marca}" class="logo-marca"alt="" >
                  <h2 style="text-align: center;">Oferta ${carroAtual[i].marca}</h2>
                  </a>
                  <div class="muda-estrela-${carroAtual[i].id}"> 
                  <img src="../images/estrela-desativada.png" alt="favoritar" class="favoritar" onclick="favoritar(${carroAtual[i].id})">
                  </div>
              </div>
          </div>
      </div>
      
  </li>`

    }


    document.getElementById("carrosDiv").innerHTML = dadosCarros
    document.querySelector(".titulo-site").innerHTML = `<h1>Quantidade de ofertas (${carroAtual.length})</h1>`
  }

  else {
    //Preenchimento de todos os carros
    fetch('http://localhost:3456/carro/todos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(dados => {
      return dados.json()
    }).then(dados => {

      let carroAtual = dados;

      if (carroAtual.length > 0) {
        let salvaDados = '';

        for (let i = 0; i < 10; i++) {
          var descricao = "" 
          for(let j = 0;j < 100;j++){
            if(carroAtual[i].descrição[j] == undefined)
            break;

             descricao += carroAtual[i].descrição[j].toUpperCase()
          } 
          descricao += "..."
          var valor =  carroAtual[i].valor.toString()
         var valorResultado;
         if(valor.length == 6){
          valorResultado = valor.slice(0,3) + "." + valor.slice(3) + ",00"
         }else if(valor.length == 5){
          valorResultado = valor.slice(0,2) + "." + valor.slice(2) + ",00"
         }
          salvaDados += `<li>
          
          <div class="conteudo-principal" id="salvadados>
          <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
              <div class="quadrado-de-cima">
                  <div class="quadrado-do-titulo">
                  
                      <input id="id-${carroAtual[i].id}" value ="${carroAtual[i].id}" hidden>
                      <h2>${carroAtual[i].marca} ${carroAtual[i].nome} ${carroAtual[i].modelo}</h2>
                  </div>
                  <div class="quadrado-do-preco">
                      <h3 >R$${valorResultado}</h3>
                  </div>
              </div>
              </a>
              <div class="quadrado-conteudo-principal">
                  <div class="carro">
                  <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
                      <img src="${carroAtual[i].foto}" width="100%" height="100%"alt="">
                      </a>
                  </div>
                  <div class="descricao">
                  <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
                      <div class="detalhe">
                          <div class="ano">
                              <p style="font-size: larger;">Ano</p>
                              <p style=" font-weight:bold;">${carroAtual[i].ano}</p>
                          </div>
                          <div class="km">
                              <p style="font-size: larger;">Km</p>
                              <p style=" font-weight:bold;">${carroAtual[i].km}</p>
                          </div>
                          <div class="cambio">
                              <p >Câmbio</p>

                              <p style=" font-weight:bold;">${carroAtual[i].cambio}</p>
                          </div>
                      </div>
                      <div class="mais-detalhe">
                          <h2 style="font-weight:300; padding-top:10px;">${descricao}</h2>
                      </div>
                      </a> 
                  </div>
                  <div class="logo-carros">
                  <a href="../carro_especifico/carro_especifico.html" style="text-decoration:none; color:black;" onclick="salvar_id(${carroAtual[i].id})">
                      <img src="${carroAtual[i].imagem_marca}" class="logo-marca"alt="" >
                      <h2 style="text-align: center;">Oferta ${carroAtual[i].marca}</h2>
                      </a>
                      <div class="muda-estrela-${carroAtual[i].id}"> 
                      <img src="../images/estrela-desativada.png" alt="favoritar" class="favoritar" onclick="favoritar(${carroAtual[i].id})">
                      </div>
                  </div>
              </div>
          </div>
          
      </li>`

        }
        salvaDados+= `<nav aria-label="Page navigation example" class="paginacao">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <div class="altera-previous">
                    <a class="page-link anterior" onclick="paginar(0)">Anterior</a>
                </div>
                
              </li>
              <li class="page-item"><a class="page-link numeros" onclick="paginar(1)">1</a></li>
              <li class="page-item"><a class="page-link numeros" onclick="paginar(2)">2</a></li>
              <li class="page-item"><a class="page-link numeros" onclick="paginar(3)">3</a></li>
              <li class="page-item">
                <div class="altera-next">
                    <a class="page-link proximo" onclick="paginar(2)">Próximo</a>
                </div>
                
              </li>
            </ul>
          </nav>`
        document.getElementById('carrosDiv').innerHTML = salvaDados
        
        document.querySelector('.titulo-site').innerHTML = `<h1>Quantidade de ofertas (${carroAtual.length})</h1>`

      }
    })
  }
}

const resetarForm = () => {
  localStorage.removeItem('carrosForm')
}

const favoritar = (id_carro) => {
  //verificar login
  let token = localStorage.getItem('token');

  if (token != undefined || token != null) {

    const id = { idCarro: id_carro }

    fetch('http://localhost:3456/carro/favoritar', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(dados => {
      let error = dados.error

      if (error == undefined) {
        document.querySelector(`.muda-estrela-${id_carro}`).innerHTML = `
        <img src="../images/estrela-ativa.png" alt="favoritar" class="favoritar" onclick="desfavoritar(${id_carro})">`

      } else if (error == "token inválido") {
        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        location.assign('../login/login.html')
      }

    })

  } else {
    location.assign("../login/login.html")
  }
}


const desfavoritar = (id_carro) => {
  const id = { idCarro: id_carro }

  let token = localStorage.getItem('token');

  if (token != undefined || token != null) {

    fetch('http://localhost:3456/carro/desfavoritar', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(dados => {
      let error = dados.error

      if (error == undefined) {
        document.querySelector(`.muda-estrela-${id_carro}`).innerHTML = `
      <img src="../images/estrela-desativada.png" alt="favoritar" class="favoritar" onclick="favoritar(${id_carro})">`

      } else if (error == "token inválido") {
        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        location.assign('../login/login.html')
      } else if (dados.response == undefined) {
        desfavoritar(id_carro);
      }
    })
  }
}

const verificar_favoritos = () => {

  let token = localStorage.getItem('token');

  if (token != undefined || token != null) {
    fetch('http://localhost:3456/carro/favoritos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      }
    }).then(dados => {
      return dados.json()
    }).then(dados => {
      let error = dados.error
      console.log(dados.error)
      if (error == undefined) {

        for (let i = 0; i < dados.length; i++) {


          document.getElementById("carrosDiv") = `<img src="../images/mitsubish.jpg" class="logo-marca"alt="" align="center">
          <h2 style="text-align: center;">Oferta Mitsubishi teste</h2>
          <img src="../images/estrela-ativa.png" alt="favoritar" class="favoritar" onclick="favoritar()">`
        }

      }
    })
  }


}


// filtros



const filtrar = () => {
  var marcaValor = document.querySelector('.marcaV').value
  var carroceriaValor = document.querySelector('.carroceriaV').value
  var cambioValor = document.querySelector('.cambioV').value
  var estadoV = document.querySelector('.estadoV').value
  var corV = document.querySelector('.corV').value

  const respostas = {
    cambio: cambioValor,
    estado: estadoV,
    marca: marcaValor,
    carroceria: carroceriaValor,
    cor: corV
  }
  fetch('http://localhost:3456/carro/filtrar_carro', {
    method: 'POST',
    body: JSON.stringify(respostas),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(dados => {
    return dados.json()
  }).then(dados => {
    let error = dados.error
    if (error == undefined) {
      //  
      
      if(!dados.length == 0){
        let salva = JSON.stringify(dados)
        localStorage.removeItem("carrosForm")
        localStorage.setItem("carrosForm", salva);
        document.location.reload();
      }else{
        document.querySelector('#carrosDiv').innerHTML = ``
        document.querySelector('.titulo-site').innerHTML = `<h1>Nenhum carro carro foi encontrado para a sua pesquisa</h1>`
        document.querySelector('.alteracoes').innerHTML = `<style>
        footer{
          margin-top: 10vh;
        }
    </style>`
      }
      
    }
  })
}

const salvar_id = (id) =>{
  localStorage.setItem('id', id)
  window.location.assign('../carro_especifico/carro_especifico.html')
}