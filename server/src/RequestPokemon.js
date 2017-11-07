let Pokedex = require('pokedex-promise-v2')
let P = new Pokedex()

module.exports = {
  async getPokemonData (req, res) {
    try {
      // .getPokemonByName takes a string or number to get a pokemon
      // string - name of pokemon
      // number - id of pokemon
      const pokemon = await P.getPokemonByName(req.query.pokemonID)

      res.send(pokemon)
    } catch (err) {
      res.status(400).send({
        error: 'Pokemon cannot be found'
      })
    }
  },
  async getPokemonsNameList (req, res) {
    try {
      const pokemonList = await P.getPokemonsList()
      const pokemonIDFrom = parseInt(req.query.pokemonIDFrom)
      const pokemonIDTo = parseInt(req.query.pokemonIDTo)
      const results = pokemonList.results.slice(pokemonIDFrom - 1, pokemonIDTo).map((item, index) => {
        let pokemonID = index + pokemonIDFrom
        let numDigits = pokemonID.toString().length
        let pokemonImgUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/'
        let pokemonIDPaddedZeroes = ''

        switch (numDigits) {
          case 1:
            pokemonIDPaddedZeroes = `00${pokemonID}`
            pokemonImgUrl += `${pokemonIDPaddedZeroes}.png`
            break
          case 2:
            pokemonIDPaddedZeroes = `0${pokemonID}`
            pokemonImgUrl += `${pokemonIDPaddedZeroes}.png`
            break
          case 3:
            pokemonIDPaddedZeroes = `${pokemonID}`
            pokemonImgUrl += `${pokemonIDPaddedZeroes}.png`
        }
        
        return {
          id: pokemonID,
          idPaddedZeroes: pokemonIDPaddedZeroes,
          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          imgUrl: pokemonImgUrl
        }
      })
      res.send(results)
    } catch (err) {
      res.status(400).send({
        error: 'Pokemons List cannot be found'
      })
    }
  }
}
