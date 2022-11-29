const mudaPag = document.querySelector('#margemLog');
let preToken;
let dadosUser = [];

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


    let user = localStorage.getItem('dados');
    let string = '';
    for (let i = 0; i < user.length; i++)
        string += user[i];
    let vet = string.split(',')


    document.getElementById('nomePerfil').innerHTML = `Nome <p style="padding-top:5px;">${vet[0]}</p>  `;
    document.getElementById("email").innerHTML = vet[1];
    document.getElementById('usuario').innerHTML = vet[2];
    document.getElementById("telefone").innerHTML = vet[3];
}

function deslogar() {


    if (confirm('Tem certeza?') == true) {

        localStorage.removeItem('dados');
        localStorage.removeItem('token');
        window.location.assign('../index.html')
    }
}


const trocarSenha = () => {



    if (confirm('Tem certeza?') == true) {
        let user = localStorage.getItem('dados');
        let string = '';
        for (let i = 0; i < user.length; i++)
            string += user[i];
        let vet = string.split(',')

        let confirmaSenha = prompt('Digite sua senha antiga: ')

        const dadosConfirmacao = {
            email: vet[1],
            senha: confirmaSenha
        }

        fetch('http://localhost:3456/users/autenticar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConfirmacao)
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            erro = dados.error;


            if (erro == undefined) {
                preToken = dados.token;
                localStorage.setItem('token', preToken);


                let novaSenha = prompt("Digite sua nova senha: ")
                let confirmaNovaSenha = prompt("Confirme a senha: ")
                if (novaSenha === confirmaNovaSenha) {
                    const dadosTroca = {
                        nome: vet[0],
                        email: vet[1],
                        telefone: vet[3],
                        usuario: vet[2],
                        senha: novaSenha
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

                        dadosUser[0] = dados.nome;
                        dadosUser[1] = dados.email;
                        dadosUser[2] = dados.usuario;
                        dadosUser[3] = dados.telefone
                        localStorage.setItem('dados', dadosUser)
                        deslogar()
                    })

                } else {
                    alert(erro)
                }
            }


        })

    }
}
const trocarEmail = () => {


    if (confirm('Tem certeza?') == true) {
        let user = localStorage.getItem('dados');
        let string = '';
        for (let i = 0; i < user.length; i++)
            string += user[i];
        let vet = string.split(',')

        let confirmaSenha = prompt('Digite sua senha: ')

        const dadosConfirmacao = {
            email: vet[1],
            senha: confirmaSenha
        }

        fetch('http://localhost:3456/users/autenticar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConfirmacao)
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            erro = dados.error;


            if (erro == undefined) {
                preToken = dados.token;
                localStorage.setItem('token', preToken);


                let novoEmail = prompt("Digite seu novo Email: ")
                const dadosTroca = {
                    nome: vet[0],
                    email: novoEmail,
                    telefone: vet[3],
                    usuario: vet[2],
                    senha: confirmaSenha
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

                    dadosUser[0] = dados.nome;
                    dadosUser[1] = dados.email;
                    dadosUser[2] = dados.usuario;
                    dadosUser[3] = dados.telefone
                    localStorage.setItem('dados', dadosUser)

                    deslogar()
                })

            } else {
                alert(erro)
            }

        })

    }
}

const trocarUsuario = () =>{

    if (confirm('Tem certeza?') == true) {
        let user = localStorage.getItem('dados');
        let string = '';
        for (let i = 0; i < user.length; i++)
            string += user[i];
        let vet = string.split(',')

        let confirmaSenha = prompt('Digite sua senha: ')

        const dadosConfirmacao = {
            email: vet[1],
            senha: confirmaSenha
        }

        fetch('http://localhost:3456/users/autenticar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConfirmacao)
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            erro = dados.error;


            if (erro == undefined) {
                preToken = dados.token;
                localStorage.setItem('token', preToken);


                let novoUsuario = prompt("Digite seu novo usuário: ")
                const dadosTroca = {
                    nome: vet[0],
                    email: vet[1],
                    telefone: vet[3],
                    usuario: novoUsuario,
                    senha: confirmaSenha
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

                    dadosUser[0] = dados.nome;
                    dadosUser[1] = dados.email;
                    dadosUser[2] = dados.usuario;
                    dadosUser[3] = dados.telefone
                    localStorage.setItem('dados', dadosUser)

                    deslogar()
                })

            } else {
                alert(erro)
            }

        })

    }
}
const trocaTelefone = () =>{

    if (confirm('Tem certeza?') == true) {
        let user = localStorage.getItem('dados');
        let string = '';
        for (let i = 0; i < user.length; i++)
            string += user[i];
        let vet = string.split(',')

        let confirmaSenha = prompt('Digite sua senha: ')

        const dadosConfirmacao = {
            email: vet[1],
            senha: confirmaSenha
        }

        fetch('http://localhost:3456/users/autenticar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConfirmacao)
        }).then(dados => {
            return dados.json()
        }).then(dados => {
            erro = dados.error;


            if (erro == undefined) {
                preToken = dados.token;
                localStorage.setItem('token', preToken);


                let novoTelefone = prompt("Digite seu novo número de telefone: ")
                const dadosTroca = {
                    nome: vet[0],
                    email: vet[1],
                    telefone: novoTelefone,
                    usuario: vet[2],
                    senha: confirmaSenha
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

                    dadosUser[0] = dados.nome;
                    dadosUser[1] = dados.email;
                    dadosUser[2] = dados.usuario;
                    dadosUser[3] = dados.telefone
                    localStorage.setItem('dados', dadosUser)

                    deslogar()
                })

            } else {
                alert(erro)
            }

        })

    }
}



verficaDados();

document.getElementById('deslogar').addEventListener('click', deslogar);
document.getElementById('deleteAcc').addEventListener('click', deletaDados);
document.getElementById('trocaSenha').addEventListener('click', trocarSenha);
document.getElementById('trocaEmail').addEventListener('click', trocarEmail);
document.getElementById('trocaUsuario').addEventListener('click', trocarUsuario);
document.getElementById('trocaTelefone').addEventListener('click', trocaTelefone);