// Peguei a div containerPersonagens para inserir os dados da API.
const containerPersonagens = document.querySelector('#containerPersonagens')

// Peguei input numero da pagina para inserir o numero da pagina conforme for subindo ou descendo a pagina
const numeroDaPagina = document.querySelector('#numeroDaPagina')

// Defini um valor padrão para a pagina iniciar em 1
let pagina = 1

// Pegar valor do input e o botão de pesquisa
const pesquisarPersonagem = document.querySelector('#pesquisar-personagem')
const btnPesquisar = document.querySelector('#btn-pesquisar')

// Criei uma função para utiliza-la novamente
function fazerRequisicao() {

  // Atribuindo o numero da pagina no input do HTML
  numeroDaPagina.innerHTML = `${pagina} | 42`

  // Requisição GET com fetch js
  
  /** Deixei a pesquisa por padrão pois se assumir um valor undefined a busca sairá limpa sem filtro para personagem
   * Caso tenha o usuario pesquise por um personagem, dessa forma permite que o mesmo navegue pelas paginas do 
   * resultado que ele busca */
  fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}&&name=${pesquisarPersonagem.value}`)
  .then(async response => {

    // Defini uma constante para aguardar a resposta no formato json
    const dados = await response.json();

    // Inseri uma string vazia no HTML para não acumular conforme for incrementando os personagens
    containerPersonagens.innerHTML = ''

    // Utilizei map para inserir os dados no HTML a cada interação com o Array.
    dados.results.map(personagem => {
      containerPersonagens.innerHTML += `
      <div class="personagem">
        <img src="${personagem.image}">
        <h3>${personagem.name}</h3>
        <p>${personagem.status === 'Alive' ? 'Vivo' : 'Morto'} | ${personagem.species === 'Human' ? 'Humano' : personagem.species}</p>
      </div>
      `
    })
  })

  // Catch para tratar a exceção exibindo um alerta para o usuário.
  .catch((erro) => { 
    console.log(erro.message);
    containerPersonagens.innerHTML = `<h1>Não há personagens para o filtro: ${pesquisarPersonagem.value}<br>Ou a lista chegou ao fim!</h1>`
  })
  
  // Finally para indicar o final da requisição
  .finally(() => console.log('Fim da request'))
}

fazerRequisicao(pagina);

const botaoProximo = document.querySelector('#botao-proximo')

botaoProximo.addEventListener('click', () => {
  
  // Quando clicar no botão de proximo incrementa 1 na pagina e faz a requisição novamente
  pagina++
  
  // Condição para evitar que a aplicação quebre pois na há mais de 42 paginas na API
  if (pagina > 42) {
    pagina = 42
  }
  fazerRequisicao(pagina)
})

const botaoAnterior = document.querySelector('#botao-anterior')

botaoAnterior.addEventListener('click', () => {
  // Quando clicar no botão de anterior decrementa 1 na pagina e faz a requisição novamente
  pagina--
  if (pagina < 1) {
    pagina = 1
  }
  fazerRequisicao(pagina)
})


// Adicionar evento de clique ao botão
btnPesquisar.addEventListener('click', () => {
  fazerRequisicao()
})