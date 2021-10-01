import api from './services/api.js';

const configlocal = {
  host: '127.0.0.1',
  port: '22',
  username: 'aluno',
  password: 'ifpb'
}

let configremote = {};

let acc = 0;
const buttonConectar = document.querySelector('#conectar')
const buttonDesconectar = document.querySelector('#desconectar')

buttonConectar.onclick = function () {
  if (authenticate()) {
    document.getElementById('host').value='';
    document.getElementById('username').value='';
    document.getElementById('password').value='';
    document.getElementById('port').value='';
    if (acc < 1) {
      acc +=1
      
    }
  } else {
    swal ( "ERRO" ,  "Falha ao se conectar!" ,  "error" )
  }
  
}

buttonDesconectar.onclick = function () {
  
    document.querySelector('#remoto tbody').innerHTML = '';
    document.querySelector('#local tbody').innerHTML = '';
    acc = 0
    window.location.href = "/public/signin.html"

}

async function authenticate () {
    const host = document.getElementById('host').value;
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const port = document.getElementById('port').value;
    
    configremote = {
      host,
      user,
      password,
      port
    }

    if (host === '' || user === '' || password === '' || port === '') {
      return false
    } else {
      await load('/home/aluno/', configlocal);
      await load(`/home/${user}/`, configremote);
      return true
    }
  }



async function execDownload(id) {
  const valor = document.getElementById(id);
  loadSpinner(valor);
  const hostlocal = document.querySelector('#local tbody');
  let rowlocal;
  rowlocal = `
        <tr>
          <td><i class="fas fa-file-pdf"></i> ${id}</td>
        </tr>`;
  hostlocal.insertAdjacentHTML('beforeend', rowlocal);
  setTimeout(() => {
    hideSpinner(valor);
  }, 2000);
  
  
}


function setDir (array, path) {
  for (let dirr of array){
    let row = dirr
    const tbody = document.querySelector(path);
    tbody.insertAdjacentHTML('beforeend', row);
    
  }
}

async function load(path,config) {
  const list = await api.read('sftp', path,config);
  loadAll(list, config);
}

function loadAll(listJson, config) {
  let arrayfile = [];
  let arraydir = [];
  let { host } = config
  if (host === '127.0.0.1') {
    for (const dirFiles of listJson) {
      const {name, type} = dirFiles;
      let rowlocal;
      if (name[0] !== '.') {
        if (type === 'd') {
        rowlocal = `
        <tr>
          <td><i class="fas fa-folder"></i> ${name}</td>
        </tr>`;
        arraydir.push(rowlocal);
      }  else {
        rowlocal = `
        <tr>
          <td><i class="fas fa-file-pdf"></i> ${name}</td>
        </tr>`;
        arrayfile.push(rowlocal);
      }
      }
      

    }
    let path = '#local tbody'
    setDir(arraydir, path);
    setDir(arrayfile, path);
      
    } else {
      for (const dirFiles of listJson) {
        const {name, type} = dirFiles;
        let row;
        if (name[0] !== '.'){
          if (type === 'd') {
          row = `
          <tr>
            <td><i class="fas fa-folder"></i> ${name}</td>
          </tr>`;
          arraydir.push(row)
        }  else {
          row = `
          <tr>
            <td><i class="fas fa-file-pdf"></i> ${name} 
            <i class="fas fa-file-download float-end pt-1" onclick="execDownload('${name}')"></i><div id="${name}" class="spinner-border spinner-border-sm invisible float-end pt-2" role="status">
                <span class="sr-only">Loading...</span>
              </div> </td>
          </tr>`;
          arrayfile.push(row)
        }

        }
        
  }
  
  let path = '#remoto tbody'
  setDir(arraydir, path);
  setDir(arrayfile, path);

    }
}


function loadSpinner(valor) {
  valor.classList.remove("invisible");
}


function hideSpinner(valor){
  valor.classList.add("invisible");
}


window.execDownload = execDownload;