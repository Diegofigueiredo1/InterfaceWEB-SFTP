import Client from "ssh2-sftp-client";
async function remotePath() {
    let sftp = new Client();
    const config = {
        host: '192.168.1.5',
        port: '22',
        username: 'diego',
        password: 'ifpb'
    }
    await sftp.connect(config);
    let list = await sftp.list('/home/diego/');
    await sftp.end();
    console.log(list[0])
    return list

}

export { remotePath };




