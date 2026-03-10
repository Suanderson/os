function consultarOS(){

let os = document.getElementById("os").value
let telefone = document.getElementById("telefone").value

let url = "https://script.google.com/macros/s/AKfycbyGIGOxXHGtxXj5b4WHxbIU7IluC-Y7JWuZR_o1Dz0/dev?os="+os+"&telefone="+telefone

fetch(url)
.then(res => res.json())
.then(dados => {

if(dados.status == "erro"){

document.getElementById("resultado").innerHTML =
"OS não encontrada"

return

}

document.getElementById("resultado").innerHTML =

`
<h2>ORDEM DE SERVIÇO</h2>

<h1>${dados.os}</h1>

<p><b>Situação atual:</b><br>${dados.status}</p>

<p><b>Serviço:</b><br>${dados.servico}</p>

<p><b>Entrada:</b><br>${dados.entrada}</p>

<p><b>Saída:</b><br>${dados.saida}</p>
`

})

}
