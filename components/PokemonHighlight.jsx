import { useState, useEffect } from "react"
import styles from "../styles/PokemonHighlight.module.css"
import backgroundTypes from "../modules/backgroundTypes"
import { TYPES_COLORS } from "../modules/globalVariables"
import StatBar from "./StatBar"
import EvolPoke from "./EvolPoke"
import { CircleX } from "lucide-react"

function PokemonHighlight({ pokemon, setHighlight }) {

    const pokemonImg = pokemon.sprites.front_default
    const pokemonCry = new Audio(pokemon.cries.latest)
    const { name, types, stats, height, weight } = pokemon

    const [firstEvolutions, setFirstEvolutions] = useState(null)
    const [secondEvolutions, setSecondEvolutions] = useState([])
    const [thirdEvolutions, setThirdEvolutions] = useState([])
    const [description, setDescription] = useState("")

    const fetchEvolv = async (evol) => {
        const pokeName = evol.species.name
        const respPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        const pokeObj = await respPoke.json()
        return pokeObj
    }

    useEffect(() => {
        const fetchDetails = async () => {
            const respSpecies = await fetch(pokemon.species.url)
            const species = await respSpecies.json()

            const respEvol = await fetch(species.evolution_chain.url)
            const evol = await respEvol.json()

            setDescription(species.flavor_text_entries.find(obj => obj.language.name === 'en').flavor_text)


            const firstPoke = await fetchEvolv(evol.chain)
            setFirstEvolutions(firstPoke)
            setSecondEvolutions([])
            setThirdEvolutions([])

            if (evol.chain.evolves_to.length > 0) {
                const secondPokeList = evol.chain.evolves_to
                let scdPokeArr = []
                secondPokeList.forEach(async scdEvol => {
                    const scdPoke = await fetchEvolv(scdEvol)
                    scdPokeArr = [...scdPokeArr, scdPoke]
                    setSecondEvolutions(scdPokeArr)
                    if (scdEvol.evolves_to.length > 0) {
                        const ThirdPokeList = scdEvol.evolves_to
                        let thrdPokeArr = []
                        ThirdPokeList.forEach(async thrdEvol => {
                            const thrdPoke = await fetchEvolv(thrdEvol)
                            thrdPokeArr = [...thrdPokeArr, thrdPoke]
                            setThirdEvolutions(thrdPokeArr)
                        })
                    }
                })
            }
        }
        fetchDetails()

    }, [pokemon])


    const typesList = types.map((typeObj, i) => {
        return <div key={i} style={{ background: TYPES_COLORS[typeObj.type.name] }} className={styles.type} >{typeObj.type.name}</div>
    })

    const statsList = stats.map((statObj, i) => {
        return (<div key={i} className={styles.stat}>
            <div>
                <p className={styles.statName}>{statObj.stat.name}</p>
                <p className={styles.statRatio}>({statObj.base_stat}/255)</p>
            </div>
            <StatBar number={statObj.base_stat} color={TYPES_COLORS[types[0].type.name]} />
        </div>)
    })

    const scdEvolList = secondEvolutions.map((evol, i) => {
        return <EvolPoke key={i} evol={evol} setHighlight={setHighlight} />
    })


    const thrdEvolList = thirdEvolutions.map((evol, i) => {
        return <EvolPoke key={i} evol={evol} setHighlight={setHighlight} />
    })

    return (
        <div
            className={styles.card}
        >
            <div className={styles.mainInfos}>
                <img src={pokemonImg} alt={name} onClick={() => pokemonCry.play()} />

                <div className={styles.name_types}>
                    <p className={styles.name}>{name}</p>
                    <div className={styles.types}>
                        {typesList}
                    </div>
                </div>
                <CircleX className={styles.closeHighlight} onClick={(e) => {
                    setHighlight(pokemon)
                }} />
            </div>
            <div className={styles.cardInnerBackground}
                style={{ background: backgroundTypes(types) }}>
                <div className={styles.cardInner} id='highlight-top'>

                    <div className={styles.description}>
                        <h2>Description</h2>
                        <p>{description}</p>
                    </div>
                    <div className={styles.basicInfos}>
                        <h2>Basic information</h2>
                        <p>Height : {height / 10}m</p>
                        <p>Weight : {weight / 10}kg</p>
                    </div>
                    <div className={styles.stats}>
                        <h2>Statistics</h2>
                        {statsList}
                    </div>
                    <div>
                        <h2>Evolutions</h2>
                        <div className={styles.evolutions} >
                            {firstEvolutions && <EvolPoke evol={firstEvolutions} setHighlight={setHighlight} />}
                            {scdEvolList.length > 0 && <div>
                                {scdEvolList}
                            </div>}
                            {thrdEvolList.length > 0 && <div>
                                {thrdEvolList}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonHighlight