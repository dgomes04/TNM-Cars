const autenticar = () => {
    fetch('https://newsapi.org/v2/everything?q=keyword&apiKey=824c98733ba7433383e5d688bc877fc6', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {



    })
}

const escrever_noticia = (pesquisa) => {
    fetch(`https://newsapi.org/v2/everything?q=${pesquisa}&language=pt&apiKey=824c98733ba7433383e5d688bc877fc6`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {

        var status = dados.status;

        if (status == "ok") {
            var salva_dados;

            var noticia = dados.articles;

            for (var i = 0; i < 7; i++) {
                if (dados.articles[i].title != null) {
                    if (i == 0) {
                       
                continue;
                    }else if(i == 1){
                        salva_dados += `<div class="conteudo-cima">
                        <div class="imagem-cima">
                            <a href="${dados.articles[i].url}">
                            <img src="${dados.articles[i].urlToImage}" style="width:100%; height:90%;"alt="imagem noticia">
                            <div class="descricao-imagem" style="position:absolute">
                                <p >${dados.articles[i].title}</p>
                            </div>
                            </a> 
                        </div>
                        
                    </div>
                `
                continue;
                    }
                    salva_dados += `
                    <div class="conteudo-linha">
                <div class="conteudo-esquerda">
                    <div class="imagem">
                        <a href="${dados.articles[i].url}"><img src="${dados.articles[i].urlToImage}" style="width:100%; height: 100%;" alt="imagem noticia"></a>
                    </div>
                    <div class="descricao">
                       <a href="${dados.articles[i].url}">
                        <h2>${dados.articles[i].title}</h2>
                        <p>${dados.articles[i].description}</p>
                    </a> 
                    </div>
                </div>
                <div class="conteudo-direita">
                <div class="imagem">
                <a href="${dados.articles[i + 1].url}"><img src="${dados.articles[i + 1].urlToImage}" style="width:100%; height: 100%;" alt="imagem noticia"></a>
            </div>
            <div class="descricao">
               <a href="${dados.articles[i + 1].url}">
                <h2>${dados.articles[i + 1].title}</h2>
                <p>${dados.articles[i + 1].description}</p>
            </a> 
            </div>
                </div>
            </div>
                `
                    i++;

                }

            }
            var correto = salva_dados.replace("undefined","");
            document.querySelector('.conteudo-principal').innerHTML = correto;
            var altera_titulo = pesquisa.split(" ")
            document.querySelector('.titulo').innerHTML = `<h1 style="text-align: center;">${altera_titulo[0][0].toUpperCase() + altera_titulo[0].substring(1)}</h1>`
        }

    })
}

            //   <div class="card" style="width: 18rem; display: inline;">
            //     <img class="card-img-top" src="${dados.articles[i].urlToImage}" alt="Card image cap">
            //     <div class="card-body">
            //       <h5 class="card-title">${dados.articles[i].title}</h5>
            //       <p class="card-text">${dados.articles[i].description}</p>
            //       <a href="${dados.articles[i].url}" class="btn btn-primary">Go somewhere</a>
            //     </div>
            //   </div>