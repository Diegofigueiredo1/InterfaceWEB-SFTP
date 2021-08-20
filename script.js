const buttonConectar = document.querySelector('#conectar')

buttonConectar.onclick = function () {
  connectHost()
}

function connectHost () {
  const host = document.querySelector('input[name="host"]')
  const user = document.querySelector('input[name="user"]')
  const password = document.querySelector('input[name="password"]')
  const port = document.querySelector('input[name="port"]')

  const conexao = {
    ip: host.value,
    usuario: user.value,
    senha: password.value,
    porta: port.value
  }

  console.log(conexao)
}