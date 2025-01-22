import { useState } from 'react';
import styles from '../styles/Home.module.css';

import PokemonHighlight from "./PokemonHighlight"
import InfiniteScrollPokemon from "./InfiniteScrollPokemon"
import BottomBar from './BottomBar';


function Home() {

  const [gridStyles, setGridStyles] = useState({ width: "100%", gridTemplateColumns: "repeat(5, 1fr)" })
  const [pokemonHighlight, setPokemonHighlight] = useState(null)

  function setHighlight(pokemon) {
    if (pokemonHighlight === pokemon) {
      setPokemonHighlight(null)
      setGridStyles({ width: "100%", gridTemplateColumns: "repeat(5, 1fr)" })
    } else {
      setPokemonHighlight(pokemon)
      setGridStyles({ width: "60%", gridTemplateColumns: "repeat(4, 1fr)" })
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.pokeGrid} style={gridStyles} >
        <InfiniteScrollPokemon setHighlight={setHighlight} />
        <BottomBar setHighlight={setHighlight} />
      </div>
      {pokemonHighlight &&
        <PokemonHighlight pokemon={pokemonHighlight} setHighlight={setHighlight} />
      }

    </main>
  );
}

export default Home;
