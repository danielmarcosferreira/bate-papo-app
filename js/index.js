let lista = [];

const nome = prompt('Qual seu nome?');

function entrarNaSala () {
    
    const novaPessoa = {
        name: nome
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', novaPessoa)
    promessa.then(pegarMensagem);
    promessa.catch(deuErro);
}
entrarNaSala();


function pegarMensagem() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(deuCerto)
    .catch(deuErro)
}

function deuErro(err) {
    console.log(err);
}

function deuCerto(resposta) {
    console.log(resposta.data);
    lista = resposta.data;

    
    let usuario = document.querySelector('ul')
    for (let i = 0; i < lista.length; i++) {

        if (i === 0) {
            usuario.innerHTML = ``;
        }
        
        if (lista[i].type === "message") {
            usuario.innerHTML += `
            <li class='message'>
            (${lista[i].time}) <span>${lista[i].from}</span> para ${lista[i].to}: ${lista[i].text}
            </li>
            `;
        }

        if (lista[i].type === "status") {
            usuario.innerHTML += `
            <li class='status'>
            (${lista[i].time}) <span>${lista[i].from}</span> ${lista[i].text}
            </li>
            `;
        }

        if (lista[i].type === "private_message") {
            usuario.innerHTML += `
            <li class='private'>
            (${lista[i].time}) <span>${lista[i].from}</span> reservadamente para ${lista[i].to}: ${lista[i].text}
            </li>
            `;
        }
    }
}

function mandarMensagem () {
    const msg = document.querySelector('input').value;
    console.log(msg)

    const body = {
        from: nome,
        to: "todos",
        text: msg,
        type: "message"
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', body)
    .then(() => {
        console.log('tudo certo');
    })
    .catch((resp) => {
        console.log(resp);
    })
}

function manterConexao () {

    const novaPessoa = {
        name: nome
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', novaPessoa)
    .then((cert) => {
        pegarMensagem();
    })
    .catch((err) => {
        console.log(err)
    })

}

setInterval(manterConexao, 6000);