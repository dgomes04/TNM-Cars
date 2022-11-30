function montaCardPesquisa() {
  let carros = JSON.parse(localStorage.getItem('carrosForm'));

  if (carros != null && carros.length > 0) {
    let dadosCarros = '';


    for (let i = 0; i < carros.length; i++) {
      let carroAtual = carros[i]
      let valor = carroAtual.valor.toString().replace(".", ",");
      dadosCarros += `<a id="linkCarro" href="../carro_especifico/carro_especifico.html"><div class="card mb-3" id="dadosCarros">
        <div class="row no-gutters">
        <h2 id="nome_esquerda" >${carroAtual.marca.charAt(0).toUpperCase() + carroAtual.marca.slice(1)} ${carroAtual.nome.charAt(0).toUpperCase() + carroAtual.nome.slice(1)} ${carroAtual.modelo.toUpperCase()}</h2>
        <h3 id="valor_direita">${valor}</h3>
        
        <div class="col-md-4">
            <img src="${carroAtual.foto}" class="card-img" style=" border-radius:10px;" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text" style="display:inline; margin-right: 3%;">Ano</p>
              <p class="card-text" style="display:inline;">Câmbio</p><br>
              <p class="card-text"  style="display:inline; font-weight:bold; margin-right:3%;">${carroAtual.ano} </p>
              <p class="card-text" style="display:inline; font-weight:bold; ">${carroAtual.cambio.charAt(0).toUpperCase() + carroAtual.cambio.slice(1)}</p>
              <p class="card-text"> ${carroAtual.descrição.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div></a><br>`

    }

    document.getElementById("carrosDiv").innerHTML = dadosCarros
    document.getElementById("carrosDiv2").innerHTML = dadosCarros

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

          let valor = carroAtual[i].valor.toString().replace(".", ",");
          salvaDados += `<div class="card mb-3" id="dadosCarros">
                <div class="row no-gutters">
                <h2 id="nome_esquerda" >${carroAtual[i].marca.charAt(0).toUpperCase() + carroAtual[i].marca.slice(1)} ${carroAtual[i].nome.charAt(0).toUpperCase() + carroAtual[i].nome.slice(1)} ${carroAtual[i].modelo.toUpperCase()}</h2>
                <h3 id="valor_direita">${valor}</h3>
                
                <div class="col-md-4">
                    <img src="${carroAtual[i].foto}" class="card-img" style=" border-radius:10px;" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text" style="display:inline; margin-right: 3%;">Ano</p>
                      <p class="card-text" style="display:inline;">Câmbio</p><br>
                      <p class="card-text"  style="display:inline; font-weight:bold; margin-right:3%;">${carroAtual[i].ano} </p>
                      <p class="card-text" style="display:inline; font-weight:bold; ">${carroAtual[i].cambio.charAt(0).toUpperCase() + carroAtual[i].cambio.slice(1)}</p>
                      <p class="card-text"> ${carroAtual[i].descrição.toUpperCase()}</p>
                      <button>ir pra outra pagina</button>
                    </div>
                  </div>
                </div>
              </div></a><br>`

        }
        document.getElementById('carrosDiv').innerHTML = salvaDados
      }
    })
  }
}

const resetarForm = () => {
  localStorage.removeItem('carrosForm')
}


const favoritar = () => {
  //verificar login
  

  const token = localStorage.getItem('token');
  
    if (token != undefined || token != null ) {
    const id = {"id": document.getElementById('id').value}
    console.log(id)    
    fetch('http://localhost:3456/carro/favoritar', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': token
      }
  }).then(dados => {
      return dados.json()
  }).then(dados => {
      document.querySelector('.favoritar').innerHTML = `<img src="../images/icons8-estrela-de-natal-32.png" alt="favoritar" class="favoritar" onclick="favoritar()"></img>`
  })
        
    }else{
      location.assign("../login/login.html")
    }
}