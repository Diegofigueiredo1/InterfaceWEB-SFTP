const domain = 'http://localhost:3000';


async function read(resource) {
  const res = await fetch(`${domain}/${resource}`);

  return await res.json();
}


export default { read };