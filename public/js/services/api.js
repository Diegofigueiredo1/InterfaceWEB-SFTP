import Auth from "./auth.js"
const domain = 'http://localhost:3000';


async function create(resource, data, auth = true) {
  const config = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  };

  if (auth) {
    config.headers.Authorization = `Bearer ${Auth.getToken()}`;
  }

  const res = await fetch(`${domain}/${resource}`, config);

  const content = await res.json();

  if (content.auth === false) {
    window.location.href = "/signin.html";
  }

  return content;
}


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


export default { read, create};