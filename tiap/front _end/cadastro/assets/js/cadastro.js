function cadastrar() {
    
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const confirmacao = document.getElementById('confirma_senha').value
    const usuario = document.getElementById('usuario').value
    const telefone = document.getElementById('telefone').value

    if ( !nome || !email || !senha || !confirmacao ) {
        alert("Insira os valores nos campos corretamente!")
        return false;
    }

    if (nome.length < 6) {
        alert("Insira seu nome completo!")
        return false;
    }

    if (senha.length < 6) {
        alert("Insira uma senha com no mínimo 6 caracteres!")
        return false;
    }

    if (senha != confirmacao) {
        alert("As senhas não conferem!")
        return false;
    }

    if (senha === confirmacao) {

        const registrate = {
            nome: nome,
            email: email,
            telefone: telefone,
            usuario: usuario,
            senha: senha,
            confirmacaoDeSenha: confirmacao
        }
        fetch('http://localhost:3456/users', {
            method: 'POST',
            body: JSON.stringify(registrate),            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            alert("Confirme seu email para que possa realizar seu login")
        })
        
        window.location.assign('../login/login.html')
        return false
    }

}
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
     cadastrar();
    }
});
