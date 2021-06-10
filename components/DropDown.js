import styles from "../styles/DropDown.module.css"

function DropDown(props) {
  return (
    <div className={styles.DropDownContainer}>
      {props.listItems.map((item, i) => (
        <p onClick={() => props.onClickOption(item)} key={`${i}`}>
          {item.city} , {item.iso2}
        </p>
      ))}
    </div>
  )
}

export default DropDown
