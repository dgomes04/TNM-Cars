const mudaPag = document.querySelector('#margemLog');
let preToken;


function verLogin() {
    let user = JSON.parse(localStorage.getItem('usuario'));

    if (user) {
        document.getElementById("margemLog").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
         <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>`;

    }


}

verLogin();
const deletaDados = () => {
    
    

    if (confirm('Tem certeza?')) {
        let token = localStorage.getItem('token')
        fetch('http://localhost:3456/users/deletar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            }
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            console.log(dados)
            localStorage.removeItem('dados');
            localStorage.removeItem('token');
            window.location.assign('../index.html')
        })

    }

}



function verficaDados() {


    let dadosUser = JSON.parse(localStorage.getItem('dados'));


    document.getElementById("dados-nome").innerHTML = `<h1 style="display: inline; font-size:x-large;">Nome: </h1>
                                                      <h2 style="display: inline;">${dadosUser.nome}</h2>`;

    document.getElementById("dados-username").innerHTML = `<h1 style="display: inline; font-size:x-large;">Usuario: </h1>
                                                           <h2 style="display: inline;">${dadosUser.usuario} </h2>`

   
    document.getElementById("dados-telefone").innerHTML = `<h1 style="display: inline; font-size:x-large;">Telefone: </h1>
                                                           <h2 style="display: inline;">${dadosUser.telefone}</h2>`

     document.getElementById('dados-email').innerHTML = `<h1 style="display: inline; font-size:x-large;">Email: </h1>
     <h2 style="display: inline;">${dadosUser.email}</h2>`;   
     



     document.getElementById("dados-nome-alteracao").innerHTML = `<label for="nome-completo">Nome completo</label>
     <input id="nome" type="text" name="nome-completo" placeholder="${dadosUser.nome}">`;

    document.getElementById("dados-username-alteracao").innerHTML = `<label for="usuario">Usuário</label>
    <input id="usuario" type="text" name="usuario" placeholder="${dadosUser.usuario}">`

   
    document.getElementById("dados-telefone-alteracao").innerHTML = `<label for="telefone">Telefone</label>
    <input id="telefone" type="tel" name="telefone" placeholder="${dadosUser.telefone}">`

     document.getElementById('dados-email-alteracao').innerHTML = `<label for="email">E-mail</label>
     <input id="email" type="email" name="email" placeholder="${dadosUser.email}">`;   
     
}

function deslogar() {

        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        window.location.assign('../index.html')
    
}


const alterarDados = () =>{
    
        let dadosUser = JSON.parse(localStorage.getItem('dados'));

        var nome_completo_form = document.querySelector("#nome").value
        var usuario_form = document.querySelector("#usuario").value
        var email_form = document.querySelector("#email").value
        var telefone_form = document.querySelector("#telefone").value
        var senha_atual = document.querySelector("#senha-atual").value
        var senha_alterada = document.querySelector("#senha-alterar").value

        if(nome_completo_form == "")
            nome_completo_form = dadosUser.nome
        

        if(usuario_form == "")
            usuario_form = dadosUser.usuario
        
        if(email_form == "")
            email_form = dadosUser.email
        
        if(telefone_form == "")
            telefone_form = dadosUser.telefone
        
        if(senha_atual == "")
            alert("É necessário inserir a sua senha atual para realizar a alteração dos dados")
        
        if(senha_alterada == "")
            senha_alterada = senha_atual
        

        const dados_autenticacao = {
            email: email_form,
            senha:senha_atual
        }
        
        fetch('http://localhost:3456/users/autenticar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados_autenticacao)
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            erro = dados.error;
            console.log(erro)

            if (erro == undefined) {
                preToken = dados.token;
                localStorage.setItem('token', preToken);

                if (senha_atual != senha_alterada) {
                    const dadosTroca = {
                        nome: nome_completo_form,
                        email: email_form,
                        telefone: telefone_form,
                        usuario: usuario_form,
                        senha: senha_alterada
                    }


                    let token = localStorage.getItem('token')
                    fetch('http://localhost:3456/users/editar', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': token
                        },
                        body: JSON.stringify(dadosTroca)
                    }).then(dados => {
                        return dados.json()
                    }).then(dados => {
                        console.log(dados)
                        localStorage.setItem('token', token);

                        const dadosNovos = {
                            nome: dados.nome,
                            email: dados.email,
                            usuario: dados.usuario,
                            telefone: dados.telefone,
                            id: dados.id
                        }
                        localStorage.setItem('dados', JSON.stringify(dadosNovos))
                        deslogar()
                    })

                } else {
                    alert(erro)
                }
            }


        })

   
}






verficaDados();

