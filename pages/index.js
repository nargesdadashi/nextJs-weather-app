import Home from "../components/home"
import styles from "../styles/main.module.css"
import Store from "../store/store"

export default function main() {
  return (
    <Store>
      <div className={styles.main}>
        <Home />
      </div>
    </Store>
  )
}
