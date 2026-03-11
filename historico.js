const URL_API = "https://script.google.com/macros/s/AKfycbyGIGOxXHGtxXj5b4WHxbIU7IluC-Y7JWuZR_o1Dz0/exec";

/* ── verifica sessão ── */
if (!sessionStorage.getItem("iplace_logado")) {
  window.location.href = "admin-login.html";
}

function sair() {
  sessionStorage.removeItem("iplace_logado");
  window.location.href = "admin-login.html";
}

let _historicoCompleto = [];

/* ══════════════════════════════
   CARREGAR
══════════════════════════════ */
function carregarHistorico() {
  const container = document.getElementById("hist-conteudo");
  container.innerHTML = '<div class="hist-loading"><div class="spinner-hist"></div><p>Carregando histórico...</p></div>';

  jsonp(URL_API + "?acao=listarHistorico", "cbHistorico", function (dados) {
    _historicoCompleto = dados.historico || [];
    renderHistorico(_historicoCompleto);
  });
}

/* ══════════════════════════════
   FILTRO
══════════════════════════════ */
function filtrarHistorico() {
  const busca = document.getElementById("busca-os").value.trim();
  document.getElementById("btn-limpar").style.display = busca ? "flex" : "none";

  if (!busca) {
    renderHistorico(_historicoCompleto);
    return;
  }

  const num = busca.replace(/^0+/, "");
  const filtrado = _historicoCompleto.filter(function (grupo) {
    const osNum = String(grupo.os).replace(/^0+/, "");
    return osNum.includes(num);
  });

  renderHistorico(filtrado, busca);
}

function limparBusca() {
  document.getElementById("busca-os").value = "";
  document.getElementById("btn-limpar").style.display = "none";
  renderHistorico(_historicoCompleto);
}

/* ══════════════════════════════
   RENDER
══════════════════════════════ */
function renderHistorico(grupos, busca) {
  const container = document.getElementById("hist-conteudo");

  if (!grupos || grupos.length === 0) {
    container.innerHTML = `
      <div class="hist-vazio">
        <div class="hist-vazio-icon">🔍</div>
        <p>${busca ? "Nenhum resultado para OS #" + busca : "Nenhum histórico registrado."}</p>
      </div>`;
    return;
  }

  container.innerHTML = grupos.map(function (grupo, gi) {
    const eventos = grupo.eventos || [];
    const total   = eventos.length;

    const linhasTempo = eventos.map(function (ev, i) {
      const isPrimeiro = i === 0;
      const isUltimo   = i === total - 1;
      const classe = isPrimeiro ? "primeiro" : isUltimo ? "ultimo" : "";
      return `
        <div class="hist-evento ${classe}">
          <div class="hist-evento-card">
            <div class="hist-evento-top">
              <span class="hist-evento-status">${ev.evento || "—"}</span>
              <span class="hist-evento-tempo">${ev.data || ""}${ev.hora ? " às " + ev.hora : ""}</span>
            </div>
          </div>
        </div>`;
    }).join("");

    return `
      <div class="hist-grupo" id="grupo-${gi}">
        <div class="hist-grupo-header" onclick="toggleGrupo(${gi})">
          <span class="hist-os-num">OS #${grupo.os}</span>
          <span class="hist-os-cliente">${grupo.cliente || ""}</span>
          <span class="hist-os-badge">${total} evento${total !== 1 ? "s" : ""}</span>
          <svg class="hist-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div class="hist-timeline">${linhasTempo}</div>
      </div>`;
  }).join("");
}

function toggleGrupo(index) {
  const grupo = document.getElementById("grupo-" + index);
  if (grupo) grupo.classList.toggle("collapsed");
}

/* ══════════════════════════════
   JSONP HELPER
══════════════════════════════ */
function jsonp(url, cb, fn) {
  window[cb] = function (data) { fn(data); delete window[cb]; };
  const s = document.createElement("script");
  s.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cb;
  s.onerror = function () { console.error("Erro de conexão."); };
  document.body.appendChild(s);
}

/* ── START ── */
carregarHistorico();