function consultarOS(){

let os = document.getElementById("os").value
let telefone = document.getElementById("telefone").value

let url = "https://script.google.com/macros/s/AKfycbyGIGOxXHGtxXj5b4WHxbIU7IluC-Y7JWuZR_o1Dz0/dev?acao=consultarOS&os="+os+"&telefone="+telefone

fetch(url)
.then(res => res.json())
.then(dados => {

document.getElementById("resultado").innerHTML =
"<pre>"+JSON.stringify(dados,null,2)+"</pre>"

})

}
