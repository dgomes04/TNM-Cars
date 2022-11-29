let erro;
const buscarCarros = () => {
    token = localStorage.getItem('token');

    const selectCambio = document.getElementById("form_cambio")
    const cambio = selectCambio.options[selectCambio.selectedIndex].value;

    const selectModelo = document.getElementById("form_modelo")
    const modelo = selectModelo.options[selectModelo.selectedIndex].value;

    const selectPreco = document.getElementById("form_parcelas")
    const preco = selectPreco.options[selectPreco.selectedIndex].value;

    const selectCombustivel = document.getElementById("form_gasto")
    const combustivel = selectCombustivel.options[selectCombustivel.selectedIndex].value;

    const selectParcelas = document.getElementById("form_quant")
    const quantidadeParcelas = selectParcelas.options[selectParcelas.selectedIndex].value;



    const respostas2 = {
        valorParcela: preco,
        qtdParcelas: quantidadeParcelas,
        porcentagem: 37,
        cambio: cambio,
        estilo: modelo,
        custoCombutivel: combustivel
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
            console.log(salva)

            localStorage.setItem("carrosForm", salva);
            document.location.assign("./carros/carros.html")
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
