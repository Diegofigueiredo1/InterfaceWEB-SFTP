import api from './api.js'

let acc = 0;
const buttonConectar = document.querySelector('#conectar')
const buttonDesconectar = document.querySelector('#desconectar')

buttonConectar.onclick = function () {
  if (autenticar()) {
    document.getElementById('host').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('port').value = '';
    if (acc < 1) {
      // load();
      loadlocal();
      acc += 1

    }
  } else {
    swal("ERRO", "Falha ao se conectar!", "error")
  }

}

buttonDesconectar.onclick = function () {
  if (acc == 1) {
    document.querySelector('#remoto tbody').innerHTML = '';
    document.querySelector('#local tbody').innerHTML = '';
    acc = 0
    swal("Desconectado", ' ', "success")
  }
}

function autenticar() {
  const host = document.getElementById('host').value;
  const user = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const port = document.getElementById('port').value;

  if (host === '' || user === '' || password === '' || port === '') {
    return false
  } else {
    return true
  }
}

// async function load() {
//   const diretorio = await api.read('Servidor');
//   getDirFileServer(diretorio);

// }


// async function execDownload(id) {
//   const valor = document.getElementById(id);
//   loadSpinner(valor);
//   const servidor = await api.read('Servidor');
//   const hostlocal = document.querySelector('#local tbody');
//   let rowLocal;
//   for (const direct of servidor) {
//     if (id == direct.id) {
//       if (direct.type === 'pasta de arquivos') {
//         rowLocal = `
//         <tr>
//           <td><i class="fas fa-folder"></i> ${direct.name}</td>
//         </tr>`;
//       } else {
//         rowLocal = `
//         <tr>
//           <td><i class="fas fa-file-pdf"></i> ${direct.name}</td>
//         </tr>`;
//       }

//     }
//   }
//   hostlocal.insertAdjacentHTML('beforeend', rowLocal);
//   hideSpinner(valor);
// }

// function getDirFileServer(direct) {
//   let arrayfiles = [];
//   let arraydirs = [];

//   for (const dir of direct) {
//     const { name, type, id } = dir;

//     let row;
//     if (type === 'pasta de arquivos') {
//       row = `
//       <tr>
//         <td><i class="fas fa-folder"></i> ${name}</td>
//       </tr>`;
//       arraydirs.push(row)
//     } else {
//       row = `
//       <tr>
//         <td><i class="fas fa-file-pdf"></i> ${name} 
//         <i class="fas fa-file-download float-end pt-1" onclick="execDownload('${id}')" ></i><div id="${id}" class="spinner-border spinner-border-sm invisible float-end pt-2" role="status">
//             <span class="sr-only">Loading...</span>
//           </div> </td>
//       </tr>`;
//       arrayfiles.push(row)
//     }

//   }

//   let path = '#remoto tbody'
//   setDir(arraydirs, path);
//   setDir(arrayfiles, path);

// }


function setDir(array, path) {
  for (let dirr of array) {
    let row = dirr
    const tbody = document.querySelector(path);

    tbody.insertAdjacentHTML('beforeend', row);

  }
}


////////////// local ///////
async function loadlocal() {
  const diretoriolocal = await api.read('sftp?list=/home/jefferson/');
  getDirFileLocal(diretoriolocal);
}

function getDirFileLocal(directlocal) {
  let arrayfilel = [];
  let arraydirl = [];
  for (const dirlocal of directlocal) {
    const { name, type } = dirlocal;

    let rowlocal;
    if (type === 'd') {
      rowlocal = `
      <tr>
        <td><i class="fas fa-folder"></i> ${name}</td>
      </tr>`;
      arraydirl.push(rowlocal);
    } else {
      rowlocal = `
      <tr>
        <td><i class="fas fa-file-pdf"></i> ${name}</td>
      </tr>`;
      arrayfilel.push(rowlocal);
    }

  }
  let path = '#local tbody'
  setDir(arraydirl, path);
  setDir(arrayfilel, path);

}

function loadSpinner(valor) {
  valor.classList.remove("invisible");
}

function hideSpinner(valor) {
  valor.classList.add("invisible");
}

// window.execDownload = execDownload;