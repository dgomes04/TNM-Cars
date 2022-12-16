let erro;
const buscarCarros = () => {
    const token = localStorage.getItem('token');

    const selectCambio = document.getElementById("form_cambio")
    const cambio = selectCambio.options[selectCambio.selectedIndex].value;

    const selectModelo = document.getElementById("form_modelo")
    const estilo = selectModelo.options[selectModelo.selectedIndex].value;

    const select_preco_max = document.getElementById("form_preco_max")
    const preco_max = select_preco_max.options[select_preco_max.selectedIndex].value;

    const select_preco_min = document.getElementById("form_preco_min")
    const preco_min = select_preco_min.options[select_preco_min.selectedIndex].value;

    const select_ano_minimo= document.getElementById("form_ano_minimo")
    const ano_minimo = select_ano_minimo.options[select_ano_minimo.selectedIndex].value;

    const select_ano_max = document.getElementById("form_ano_maximo")
    const ano_max = select_ano_max.options[select_ano_max.selectedIndex].value;


    const respostas2 = {
        cambio: cambio,
        estilo: estilo,
        anoMinimo: ano_minimo,
        anoMaximo: ano_max,
        precoMinimo: preco_min,
        precoMaximo: preco_max
    }

    fetch('http://localhost:3456/carro_ideal', {
        method: 'POST',
        body: JSON.stringify(respostas2),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {
        erro = dados.error;
       
        if (erro == undefined) {

            let salva = JSON.stringify(dados)
            localStorage.removeItem("carrosForm")
            localStorage.setItem("carrosForm", salva);
            window.location.assign("./carros/carros.html")
        }
        else {
            if (erro == "token inválido") {
                deslogar();
            }
        }
    })

}


//teste carrossel






document.getElementById("btn_buscar").addEventListener('click', buscarCarros)
