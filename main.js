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
    const existe = pessoas.find(elemento => elemento.nome === nome.value)
    const pessoa = {
        "nome": nome.value,
        "nascimento": nascimento.value,
    }
    if (existe) {
        pessoa.id = existe.id
        atualizaElemento(pessoa)
        pessoas[pessoas.findIndex(elemento => elemento.id === existe.id)] = pessoa
    } else {
        pessoa.id = pessoas[pessoas.length - 1] ? (pessoas[pessoas.length - 1]).id + 1 : 0
        criaElemento(pessoa)
        pessoas.push(pessoa)
    }
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
    
    const celulaNascimento = document.createElement('em')
    celulaNascimento.innerHTML = linha.nascimento
    celulaNascimento.dataset.id = linha.id
    novaLinha.appendChild(celulaNascimento)

    novaLinha.appendChild(botaoEditar(linha.id))
    novaLinha.appendChild(botaoDeletar(linha.id))
    lista.appendChild(novaLinha)
}

function botaoEditar(id) {
    const elementoBotao = document.createElement("button")
    const elementoI = document.createElement("i")
    elementoBotao.appendChild(elementoI)
    elementoI.classList.add("fa-solid")
    elementoI.classList.add("fa-pen-to-square")

    elementoBotao.addEventListener('click', function() {
        index = pessoas.indexOf(this.parentNode)
       editaElemento(this.parentNode, id);
    })
    return elementoBotao
}

function editaElemento(tag, id) {
    document.querySelector("#name").value = tag.children[0].textContent
    document.querySelector("#birth-date").value = tag.children[1].textContent
    document.querySelector('#name').focus()
    deletaElemento (tag, id)
}

function atualizaElemento(pessoa) {
    document.querySelector("[data-id='"+pessoa.id+"']").innerHTML = pessoa.nascimento;
}

function deletaElemento (tag, id) {
    tag.remove()
    pessoas.splice(pessoas.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("pessoas", JSON.stringify(pessoas))
}

function botaoDeletar(id) {
    const elementoBotao = document.createElement("button")
    const elementoI = document.createElement("i")
    elementoBotao.appendChild(elementoI)
    elementoI.classList.add("fa-solid")
    elementoI.classList.add("fa-trash")

    elementoBotao.addEventListener('click', function() {
        index = pessoas.indexOf(this.parentNode)
       deletaElemento(this.parentNode, id);
    })
    return elementoBotao
}