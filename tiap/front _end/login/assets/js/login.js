let token; 
let erro;
let dadosUser = [];
function entrar() {
    const autenticar2 = {
        email: document.querySelector('#email').value,
        senha: document.querySelector('#senha').value
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
            
            const dadosUser = {
                nome: dados.nome,
                email: dados.email,
                usuario: dados.usuario,
                telefone: dados.telefone,
                id: dados.id
            }
            
            localStorage.setItem('dados',JSON.stringify(dadosUser))   
            window.location.assign('../index.html')
            
        }else{
            alert(erro)
            
        }
    })

    return false
}
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      entrar();
    }
});
