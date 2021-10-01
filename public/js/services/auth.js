function isAuthenticated() {
    if (!getToken()) {
      window.location.href = "/public/signin.html";
    } else {
      return true;
    }
  }
  
  function getToken() {
    return localStorage.getItem("@MonitorApp:token");
  }
  
  function signin(token) {
    localStorage.setItem("@MonitorApp:token", token);
  
    window.location.href = "/public/index.html";
  }
  
  function signout() {
    fetch("/signout");
  
    localStorage.removeItem("@FoodsApp:token");
  
    window.location.href = "/public/signin.html";
  }
  
  export default { isAuthenticated, getToken, signin, signout };