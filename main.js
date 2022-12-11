const form = document.querySelector(".form")
const lista = document.getElementById("lista")
const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []

pessoas.forEach ((elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
     
    const nome = evento.target.elements['name']
    const nascimento = evento.target.elements['birth-date']
    const pessoa = {
        "nome": nome.value,
        "nascimento": nascimento.value
    }

    criaElemento(pessoa)
    
    pessoas.push(pessoa)
    localStorage.setItem("pessoas", JSON.stringify(pessoas))

    nome.value = ''
    nascimento.value = ''
})

function criaElemento(linha) {
    const novaLinha = document.createElement('li')
    novaLinha.classList.add("list-group-item")

    const celulaNome = document.createElement('strong')
    celulaNome.innerHTML = linha.nome
    novaLinha.appendChild(celulaNome)
    novaLinha.innerHTML += linha.nascimento

    lista.appendChild(novaLinha)
}