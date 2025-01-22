import styles from "../styles/StatBar.module.css"

function StatBar({ number, color }) {

    const widthSize = number * 100 / 255

    return (
        <div className={styles.statBar}>
            <div style={{ width: `${widthSize}%`, backgroundColor: color }} className={styles.statBar_color} />
        </div>
    )
}

export default StatBar