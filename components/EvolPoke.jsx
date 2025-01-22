import styles from "../styles/EvolPoke.module.css"
import backgroundTypes from "../modules/backgroundTypes"

function EvolPoke({ evol, setHighlight }) {
    return (
        <div className={styles.evol} onClick={() => setHighlight(evol)}>
            <div className={styles.evol_imgBlock}>
                <img className={styles.evol_image} src={evol.sprites.front_default} alt={evol.name} />
                <div className={styles.evol_bckgImage} style={{ background: backgroundTypes(evol.types) }} />
            </div>
            <p>{evol.name}</p>
        </div>)
}

export default EvolPoke