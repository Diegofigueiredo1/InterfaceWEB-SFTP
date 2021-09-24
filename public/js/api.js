const domain = 'http://localhost:3000';


async function read(resource, path, config) {
  const res = await fetch(`${domain}/${resource}`,{
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: path,
      config: config
    })

  });

  return await res.json();
}


export default { read };
