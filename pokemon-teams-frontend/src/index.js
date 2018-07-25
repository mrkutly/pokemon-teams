const cardContainer = document.querySelector('#card-container')
Adapter.getTrainers().then(renderAllCards)
document.addEventListener('click', releasePokemon)
document.addEventListener('click', addPokemon)

function addPokemon(e) {
  if (e.target.className === 'add'){
    let trainerId = e.target.dataset.trainerId
    let pokemonsList = e.target.nextElementSibling

    if (pokemonsList.childElementCount < 6) {
      createAndAppendPokemon(trainerId, pokemonsList)
    } else {
      let trainerName = e.target.parentElement.firstElementChild.innerText
      alert(`${trainerName} can only have 6 pokemon`)
    }
  }
}

function createAndAppendPokemon(trainerId, pokemonsList) {
  Adapter.addPokemon(trainerId)
    .then((pokemon) => {
      let template = makePokemonTemplate(pokemon)
      pokemonsList.innerHTML += template
    })
}

function releasePokemon(e) {
  if (e.target.className === 'release') {
    let pokemonId = e.target.dataset.pokemonId
    Adapter.releasePokemon(pokemonId)
    e.target.parentElement.remove()
  }
}

function makeTrainerCardTemplate(trainer) {
  return `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul class='pokemons-list'></ul>
    </div>
    `
}

function makePokemonTemplate(pokemon){
  return `<li>${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
  </li>`
}

function makePokemonsTemplate(trainer) {
  return trainer.pokemons.map(pokemon => {
    return makePokemonTemplate(pokemon)
  }).join("")
}

function renderAllCards(trainers) {
  trainers.forEach(trainer => {
    renderTrainerCard(trainer)
    renderPokemonsList(trainer)
  })
}

function renderTrainerCard(trainer) {
  let trainerCardTemplate = makeTrainerCardTemplate(trainer)
  cardContainer.innerHTML += trainerCardTemplate
}

function renderPokemonsList(trainer) {
  let pokemonsTemplate = makePokemonsTemplate(trainer)
  let card = cardContainer.querySelector(`[data-id="${trainer.id}"]`)

  card.querySelector('.pokemons-list').innerHTML += pokemonsTemplate
}
