import Client from "ssh2-sftp-client";
import fs from "node:fs"
let client = new Client();


const config = {
    host: `192.168.1.5`,
    port: `22`,
    username: `diego`,
    password: `ifpb`
}

let remotePath = '/home/diego/file.txt';
let dst = fs.createWriteStream('/home/aluno/arquivos/copy.txt');

client.connect(config)
  .then(() => {
    return client.get(remotePath, dst);
  })
  .then(() => {
    client.end();
  })
  .catch(err => {
    console.error(err.message);
  });

