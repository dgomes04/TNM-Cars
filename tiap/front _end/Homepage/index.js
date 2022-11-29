
const verLogin = () => {
    const token = localStorage.getItem('token');
    if (token == undefined || token == null ) {
        document.getElementById("perfil").innerHTML = `
        <a href="./login/login.html">Logar</a> `;
        
    }
}
const deslogar = () => {

        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        window.location.assign('./login/login.html');
    
}

const montarCarrossel = () =>{
    
    const respostas2 = {
        valorParcela: 1300,
        qtdParcelas: 80,
        porcentagem: 25,
        cambio: "automatico",
        estilo: "todos",
        custoCombutivel: "todos"
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
            console.log(dados)
            let salva = JSON.stringify(dados)
            sessionStorage.clear();
            sessionStorage.setItem("carrosForm", salva);
            document.location.assign("./carros/carros.html")
        }
        else {
            if (erro == "token inválido") {
                deslogar();
            }
        }
    })
}

document.onload(montarCarrossel());

  
