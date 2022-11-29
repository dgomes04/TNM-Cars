let token; 
let erro;
let dadosUser = [];
function entrar() {
    const autenticar2 = {
        email: document.querySelector('#email').value,
        senha: document.querySelector('#password').value
    }

    fetch('http://localhost:3456/users/autenticar', {
        method: 'POST',
        body: JSON.stringify(autenticar2),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(dados => {
        return dados.json()
    }).then(dados => {
        erro = dados.error;
       
       
        if(erro == undefined){
            token = dados.token;
            localStorage.setItem('token', token);
           
            dadosUser[0] = dados.nome;
            dadosUser[1] = dados.email; 
            dadosUser[2] = dados.usuario;
            dadosUser[3] = dados.telefone
            
            localStorage.setItem('dados',dadosUser)
            
            window.location.assign('../index.html')
        }else{
            alert(erro)
        }
    })

    return false
}
