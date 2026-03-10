function consultarOS(){

let os = document.getElementById("os").value
let telefone = document.getElementById("telefone").value

document.getElementById("resultado").innerHTML = ""
document.getElementById("loading").style.display = "block"

let url = "https://script.google.com/macros/s/AKfycbyGIGOxXHGtxXj5b4WHxbIU7IluC-Y7JWuZR_o1Dz0/exec?acao=consultarOS&os="+os+"&telefone="+telefone+"&callback=mostrarResultado"

let script = document.createElement("script")
script.src = url

document.body.appendChild(script)

}

function mostrarResultado(dados){

document.getElementById("loading").style.display = "none"

if(!dados.encontrado){

document.getElementById("resultado").innerHTML =
"<div class='erro'>Ordem de serviço não encontrada.</div>"

return
}

document.getElementById("resultado").innerHTML = `
<div class="os-card">

<h2>Ordem de Serviço ${dados.os}</h2>

<p><b>Cliente:</b> ${dados.cliente}</p>

<p><b>Produto:</b> ${dados.produto}</p>

<p><b>Situação:</b> ${dados.situacao}</p>

<p><b>Entrada:</b> ${dados.entrada_data} - ${dados.entrada_hora}</p>

<p><b>Valor:</b> R$ ${dados.valor_total}</p>

<p><b>Recebido por:</b> ${dados.recebido_por}</p>

</div>
`

}
