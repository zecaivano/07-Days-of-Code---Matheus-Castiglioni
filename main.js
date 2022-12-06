const nome = document.querySelector('#name')
const nascimento = document.querySelector('#birth-date')
const submit = document.querySelector(".salvar")

function consolar() {
    console.log(nome.value);
    console.log(nascimento.value);
}

submit.addEventListener('click', (evento) => {
    evento.preventDefault();
    consolar();
})
