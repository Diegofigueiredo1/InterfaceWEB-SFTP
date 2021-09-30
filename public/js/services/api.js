const domain = '';

async function create(resource, data) {
  const res = await fetch(`${domain}/${resource}`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });

  return await res.json();
}

async function read(resource, path, config) {
  const res = await fetch(`${domain}/${resource}`, {
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


export default { read, create };
