const domain = '';


async function read(resource) {
  const res = await fetch(`${domain}/${resource}`);

  return await res.json();
}


export default { read };