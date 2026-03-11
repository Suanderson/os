const URL_API = "https://script.google.com/macros/s/AKfycbyGIGOxXHGtxXj5b4WHxbIU7IluC-Y7JWuZR_o1Dz0/exec";

/* ── INIT: se já estiver logado, redireciona ── */
if (sessionStorage.getItem("iplace_logado")) {
  window.location.href = "admin-painel.html";
}

/* ── ENTER no campo senha ── */
document.getElementById("login-senha").addEventListener("keydown", function (e) {
  if (e.key === "Enter") fazerLogin();
});

/* ── LOGIN ── */
function fazerLogin() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value.trim();
  const btn   = document.getElementById("btn-login");
  const erro  = document.getElementById("login-erro");

  erro.classList.remove("show");

  if (!email || !senha) {
    mostrarErro("Preencha e-mail e senha.");
    return;
  }

  btn.disabled     = true;
  btn.textContent  = "Verificando...";

  const url = URL_API
    + "?acao=login"
    + "&email=" + encodeURIComponent(email)
    + "&senha=" + encodeURIComponent(senha);

  jsonp(url, "cbLogin", function (dados) {
    btn.disabled    = false;
    btn.textContent = "Entrar";

    if (dados.login) {
      sessionStorage.setItem("iplace_logado", "1");
      window.location.href = "admin-painel.html";
    } else {
      mostrarErro("E-mail ou senha incorretos.");
    }
  });
}

function mostrarErro(msg) {
  const el = document.getElementById("login-erro");
  el.textContent = msg;
  el.classList.add("show");
}

/* ── JSONP HELPER ── */
function jsonp(url, cb, fn) {
  window[cb] = function (data) {
    fn(data);
    delete window[cb];
  };
  const s = document.createElement("script");
  s.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cb;
  s.onerror = function () {
    mostrarErro("Erro de conexão. Tente novamente.");
  };
  document.body.appendChild(s);
}