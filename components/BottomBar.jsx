import { useEffect, useState } from "react"
import styles from "../styles/BottomBar.module.css"
import { Search } from "lucide-react"


const BottomBar = ({ setHighlight }) => {

    const [searchInput, setSearchInput] = useState("")


    const fetchPokemonSearch = async () => {
        if (searchInput !== "") {
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
            const pokemonObj = await resp.json()
            if (pokemonObj) {
                setHighlight(pokemonObj)
            }
        }
    }


    useEffect(() => {
        fetchPokemonSearch()
    }, [searchInput])


    return (
        <div className={styles.bottomBar}>
            <div className={styles.search}>
                <Search />
                <input
                    placeholder="Pokemon name"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
            </div>
        </div>
    )
}

export default BottomBar