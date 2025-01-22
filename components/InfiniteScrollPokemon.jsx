import styles from "../styles/InfiniteScrollPokemon.module.css"
import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from "./PokemonCard"
import Image from "next/image";


const InfiniteScrollPokemon = ({ setHighlight }) => {
    const [pokemonArr, setPokemonArr] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startFetch, setStartFetch] = useState(1);
    const [endFetch, setEndFetch] = useState(21);
    const load = useRef(false);


    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            let pokemons = []
            for (let i = startFetch; i < endFetch; i++) {
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                const pokemonObj = await resp.json()
                pokemons.push(await pokemonObj)
            }
            setPokemonArr(prevItems => [...prevItems, ...pokemons]);
            setStartFetch(endFetch)
            setEndFetch(prevPage => prevPage + 20);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop <= document.documentElement.offsetHeight - 100 || isLoading) {
            return;
        }
        fetchData();
    };

    useEffect(() => {
        if (!load.current) {
            fetchData();
            load.current = true
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    const pokemons = pokemonArr.map((pokemon, index) => {
        return <PokemonCard key={index} pokemon={pokemon} setHighlight={setHighlight} />
    })

    return (
        <>
            {pokemons}
            {isLoading && <div className={styles.loading}>
                <Image src="/pokeball.webp" width={50} height={50} />
                <p>Loading...</p>
            </div>}
            {error && <p>Error: {error.message}</p>}
        </>
    );
};

export default InfiniteScrollPokemon