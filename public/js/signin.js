import api from "./services/api.js";
import Auth from "./services/auth.js";

const form = document.querySelector("form");

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const user = Object.fromEntries(new FormData(form));

    const { auth, token } = await api.create("signin", user, false);

    if (auth) {
      Auth.signin(token);
    } else {
        swal ( "ERRO" ,  "Login ou senha incorretos!" ,  "error" )
    }
  } catch (error) {
    console.log(error)
  }
};