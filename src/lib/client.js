import Client from "ssh2-sftp-client";
let sftp = new Client();


async function getDir(path, config) {
    await sftp.connect(config)
    let fileList = await sftp.list(path);
    await sftp.end();
    return fileList;

}


export { getDir };
