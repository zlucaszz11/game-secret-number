//let title = document.querySelector('h1');
//title.innerHTML = 'Number Secret Gamer';
//let paragraph= document.querySelector('p');
//paragraph.innerHTML= 'choose a number from 1 to 10';
let listaDeNumerosSorteados = [];
let numeroLimite= 10;
let numeroSecreto= gerarNumeroAleatorio();
let tentativas = 1;
function exibirTextoNaTela(tag,texto){
    let camp=document.querySelector(tag);
    camp.innerHTML= texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','jogo do numero secreto');
    exibirTextoNaTela('p','escolha um numero entre 1 a 10');
}
exibirMensagemInicial();
//exibirTextoNaTela('h1','jogo do numero secreto');
//exibirTextoNaTela('p','escolha um numero entre 1 a 10');
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute==numeroSecreto) {
        exibirTextoNaTela('h1','acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `vc descobriu o numerosecreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute>numeroSecreto) {
            exibirTextoNaTela('p','o numero secreto é menor');
        } else {
            exibirTextoNaTela('p','o numero secreto é maior');
        }
        tentativas++;
        limparCamp();
    }
}
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() *numeroLimite+1);
    let quantidadesDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadesDeElementosNaLista==numeroLimite) {
        listaDeNumerosSorteados= [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCamp(){
    chute= document.querySelector('input');
    chute.value='';
}
function reiniciarJogo(){
    numeroSecreto=gerarNumeroAleatorio();
    limparCamp();
    tentativas=1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}