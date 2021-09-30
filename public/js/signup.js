import api from "./services/api.js";

const form = document.querySelector("form");

form.onsubmit = async (event) => {
    event.preventDefault();

    const user = Object.fromEntries(new FormData(form));

    // if (user.password !== user.passwordConfirmation)
    await api.create("signup", user);

    window.location.assign("/signin.html");
};
