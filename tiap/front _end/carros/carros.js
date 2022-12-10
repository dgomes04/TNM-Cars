let quantidadeCarros = 0;
function montaCardPesquisa() {
  let carroAtual = JSON.parse(localStorage.getItem('carrosForm'));

  if (carroAtual != null && carroAtual.length > 0) {
    let dadosCarros = '';


    for (let i = 0; i < carroAtual.length; i++) {

      quantidadeCarros++;
      dadosCarros += `<li>
      <div class="conteudo-principal">
          <div class="quadrado-de-cima">
              <div class="quadrado-do-titulo">
                  <input id="id-${carroAtual[i].id}" value ="${carroAtual[i].id}" hidden>
                  <h2>${carroAtual[i].marca} ${carroAtual[i].nome} ${carroAtual[i].modelo}</h2>
              </div>
              <div class="quadrado-do-preco">
                  <h3 >R$${carroAtual[i].valor}</h3>
              </div>
          </div>
          <div class="quadrado-conteudo-principal">
              <div class="carro">
                  <img src="${carroAtual[i].foto}" width="100%" height="100%"alt="">
              </div>
              <div class="descricao">
                  <div class="detalhe">
                      <div class="ano">
                          <p style="font-size: larger;">Ano</p>
                          <p>${carroAtual[i].ano}</p>
                      </div>
                      <div class="km">
                          
                          <p style="padding-top: 10px;">${carroAtual[i].km}KM</p>
                      </div>
                      <div class="cambio">
                          <h3>cambio</h3>

                          <p>${carroAtual[i].cambio}</p>
                      </div>
                  </div>
                  <div class="mais-detalhe">
                      <h2 style="font-weight:300; padding-top:10px;">${carroAtual[i].descrição}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus molestias odit autem dolores</h2>
                  </div>
                  
              </div>
              <div class="logo-carros">
                  <img src="${carroAtual[i].imagem_marca}" class="logo-marca"alt="" >
                  <h2 style="text-align: center;">Oferta ${carroAtual[i].marca}</h2>
                  <div class="muda-estrela-${carroAtual[i].id}"> 
                  <img src="../images/estrela-desativada.png" alt="favoritar" class="favoritar" onclick="favoritar(${carroAtual[i].id})">
                  </div>
              </div>
          </div>
      </div>
  </li>`

    }


    document.getElementById("carrosDiv").innerHTML = dadosCarros
    document.querySelector(".titulo-site").innerHTML = `<h1>Quantidade de ofertas (${quantidadeCarros})</h1>`

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

        for (let i = 0; i < carroAtual.length; i++) {
          quantidadeCarros++;
          salvaDados += `<li>
          <div class="conteudo-principal">
              <div class="quadrado-de-cima">
                  <div class="quadrado-do-titulo">
                      <input id="id-${carroAtual[i].id}" value ="${carroAtual[i].id}" hidden>
                      <h2>${carroAtual[i].marca} ${carroAtual[i].nome} ${carroAtual[i].modelo}</h2>
                  </div>
                  <div class="quadrado-do-preco">
                      <h3 >R$${carroAtual[i].valor}</h3>
                  </div>
              </div>
              <div class="quadrado-conteudo-principal">
                  <div class="carro">
                      <img src="${carroAtual[i].foto}" width="100%" height="100%"alt="">
                  </div>
                  <div class="descricao">
                      <div class="detalhe">
                          <div class="ano">
                              <p style="font-size: larger;">Ano</p>
                              <p>${carroAtual[i].ano}</p>
                          </div>
                          <div class="km">
                              
                              <p style="padding-top: 10px;">${carroAtual[i].km}KM</p>
                          </div>
                          <div class="cambio">
                              <h3>cambio</h3>

                              <p>${carroAtual[i].cambio}</p>
                          </div>
                      </div>
                      <div class="mais-detalhe">
                          <h2 style="font-weight:300; padding-top:10px;">${carroAtual[i].descrição}: Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus molestias odit autem dolores</h2>
                      </div>
                      
                  </div>
                  <div class="logo-carros">
                      <img src="${carroAtual[i].imagem_marca}" class="logo-marca"alt="" >
                      <h2 style="text-align: center;">Oferta ${carroAtual[i].marca}</h2>
                      <div class="muda-estrela-${carroAtual[i].id}"> 
                      <img src="../images/estrela-desativada.png" alt="favoritar" class="favoritar" onclick="favoritar(${carroAtual[i].id})">
                      </div>
                  </div>
              </div>
          </div>
      </li>`

        }
        document.getElementById('carrosDiv').innerHTML = salvaDados
        document.querySelector('.titulo-site').innerHTML = `<h1>Quantidade de ofertas (${quantidadeCarros})</h1>`

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

  const respostas = {
    cambio: cambioValor,
    estado: estadoV,
    marca: marcaValor,
    carroceria: carroceriaValor
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

      let salva = JSON.stringify(dados)
      console.log(dados)
      localStorage.removeItem("carrosForm")
      localStorage.setItem("carrosForm", salva);
      document.location.reload();
    }
  })
}
