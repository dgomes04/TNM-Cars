
const verLogin = () => {
    const token = localStorage.getItem('token');
    if (token != undefined || token != null ) {
        document.getElementById("perfil").innerHTML = `<a href="./perfil/perfil.html" style="margin-left: 5px;">Perfil</a>`;
        document.getElementById("favoritos").innerHTML = `<a href="./favoritos/meus-favoritos.html" style="margin-left: 5px;">Favoritos</a>`;
        
    }
}
const deslogar = () => {

        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        window.location.assign('./login/login.html');
    
}

const montarCarrossel = () =>{
    let token = localStorage.getItem('token')
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
window.onload(verLogin())


  
