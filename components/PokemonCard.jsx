import { useState } from "react";
import styles from "../styles/PokemonCard.module.css"
import backgroundTypes from "../modules/backgroundTypes"

function PokemonCard({ pokemon, setHighlight }) {

    const [image, setImage] = useState(pokemon.sprites.front_default)

    const hoverChangeImage = (isHover) => {
        if (isHover) {
            setImage(pokemon.sprites.back_default)
        } else {
            setImage(pokemon.sprites.front_default)
        }
    }

    const pokemonName = pokemon.name
    const pokemonTypes = pokemon.types

    return (
        <div
            className={styles.card}
            style={{ background: backgroundTypes(pokemonTypes) }}
            onClick={() => setHighlight(pokemon)}
            onMouseEnter={() => hoverChangeImage(true)}
            onMouseLeave={() => hoverChangeImage(false)}
        >
            <img src={image} alt={pokemonName} />
            <p className={styles.name}>{pokemonName}</p>
        </div>
    )
}

export default PokemonCard