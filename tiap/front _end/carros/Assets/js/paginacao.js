

const paginar = (indice) =>{
fetch('http://localhost:3456/carro/todos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(dados => {
      return dados.json()
    }).then(dados => {
      if(indice == 1){
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
              <li class="page-item active"><a class="page-link numeros" onclick="paginar(1)">1</a></li>
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
        document.querySelector('.alteracoes').innerHTML = ` <style>
        .proximo:hover{
            background-color: lightgray;
        }
        
    </style>`
        window.scrollTo(0, 0);
      }  
      

      }else if(indice == 2){
        let carroAtual = dados;
        console.log(carroAtual[9])
      if (carroAtual.length > 0) {
        let salvaDados = '';

        for (let i = 10; i < 20; i++) {
          var descricao = "" 
          for(let j = 0;j < 100;j++){
            if(carroAtual[i].descrição[j] == undefined)
            break;

             descricao += carroAtual[i].descrição[j].toUpperCase()
          } 
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
              <li class="page-item active"><a class="page-link numeros" onclick="paginar(2)">2</a></li>
              <li class="page-item"><a class="page-link numeros" onclick="paginar(3)">3</a></li>
              <li class="page-item">
                <div class="altera-next">
                    <a class="page-link proximo" onclick="paginar(2)">Próximo</a>
                </div>
                
              </li>
            </ul>
          </nav>`
        document.getElementById('carrosDiv').innerHTML = salvaDados
        
        document.querySelector('.altera-previous').innerHTML = `<a class="page-link" onclick="paginar(1)">Anterior</a>`
        document.querySelector('.altera-next').innerHTML = `<a class="page-link" onclick="paginar(3)">Próximo</a>`
        document.querySelector('.alteracoes').innerHTML = ` <style>
        .anterior:hover{
            background-color: lightgray;
        }
        .proximo:hover{
            background-color: lightgray;
        }
        
    </style>`
        window.scrollTo(0, 0);
      }  
      

      }else if(indice == 3){
        let carroAtual = dados;

      if (carroAtual.length > 0) {
        let salvaDados = '';

        for (let i = 20; i < carroAtual.length; i++) {
          var descricao = "" 
          for(let j = 0;j < 100;j++){
            if(carroAtual[i].descrição[j] == undefined)
            break;

             descricao += carroAtual[i].descrição[j].toUpperCase()
          } 
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
              <li class="page-item active"><a class="page-link numeros" onclick="paginar(3)">3</a></li>
              <li class="page-item">
                <div class="altera-next">
                    <a class="page-link proximo" onclick="paginar(2)">Próximo</a>
                </div>
                
              </li>
            </ul>
          </nav>`
        document.getElementById('carrosDiv').innerHTML = salvaDados
        document.querySelector('.altera-previous').innerHTML = `<a class="page-link" onclick="paginar(2)">Anterior</a>`
        document.querySelector('.altera-next').innerHTML = `<a class="page-link" onclick="paginar(0)">Próximo</a>`
        document.querySelector('.alteracoes').innerHTML = ` <style>
        .anterior:hover{
            background-color: lightgray;
        }
        
    </style>`
        window.scrollTo(0, 0);
      }  
      

      }
    })
  }
  

