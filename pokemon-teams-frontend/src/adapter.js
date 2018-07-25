const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class Adapter {
  static getTrainers() {
    return fetch(TRAINERS_URL)
      .then(resp => resp.json())
  }

  static addPokemon(trainerId) {
    return fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: trainerId
      })
    }).then(resp => resp.json())
  }

  static releasePokemon(pokemonId){
    return fetch(`${POKEMONS_URL}/${pokemonId}`,{
      method: 'DELETE'
    })
  }
}
