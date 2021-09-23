import Client from "ssh2-sftp-client";
let sftp = new Client();

const config = {
    host: `127.0.0.1`,
    port: `22`,
    username: `jefferson`,
    password: `98635`
}

async function getDir(path) {
    await sftp.connect(config)
    let fileList = await sftp.list(path);
    await sftp.end();
    return fileList;

}

export { getDir };
