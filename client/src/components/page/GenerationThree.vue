<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <header>
      <h1>
        {{pageTitle}}
      </h1>
    </header>
    <!-- your content -->
    <Pokedex :pokemonGenerationIDs='pokemonGenerationIDs'></Pokedex>
  </div>
</template>

<script>
import Pokedex from '@/Pokedex.vue'
import {POKEMON_GENERATION_ID} from '../../constants'

export default {
  components: {
    'Pokedex': Pokedex
  },
  data () {
    return {
      pageTitle: 'Generation III',
      pokemonGenerationIDs: POKEMON_GENERATION_ID.GENERATION_3
    }
  },
}
</script>

<style>
</style>
