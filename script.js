const buttonConectar = document.querySelector('#conectar')

buttonConectar.onclick = function () {
  connectHost()
}

function connectHost () {
    const host = document.getElementById('host').value;
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const port = document.getElementById('port').value;


    const conexao = {

        ip: host,
        usuario: user,
        senha: password,
        porta: port,
  }

  console.log(conexao)
}
