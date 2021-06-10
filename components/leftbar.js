import axios from "axios"
import { useEffect, useState, useContext, useCallback, useRef } from "react"
import moment from "moment-timezone"
import styles from "../styles/LeftBar.module.css"
import { Context } from "../store/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarker } from "@fortawesome/free-solid-svg-icons"
import DropDown from "./DropDown"
import { actionSetLocation } from "../reducers/actions"
import clsx from "clsx"
import useOnClickOutside from "./outsideClick"

export default function LeftBar({ city, data }) {
  const [state, dispatch] = useContext(Context)

  const divRef = useRef()
  const handler = useCallback(() => {
    setIsOpen(false)
  }, [])
  useOnClickOutside(divRef, handler)

  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [inputText, setInputText] = useState("")
  const [cityOptions, setCityOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Use callback
  const handleInputChange = async e => {
    setInputText(e.target.value)
    try {
      if (e.target.value) {
        const autoCompleteRes = await axios.get(
          `/api/autoComplete/${e.target.value}`
        )

        setCityOptions(autoCompleteRes.data.data)
        setIsOpen(true)
      } else {
        setCityOptions([])
        setIsOpen(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnFocus = () => {
    setIsOpen(true)
  }

  const selectCity = city => {
    setInputText(`${city.city},${city.iso2}`)

    dispatch(
      actionSetLocation({
        city: city.city,
        countryCode: city.iso2,
        lat: city.lat,
        lon: city.lng,
      })
    )

    setIsOpen(false)
    setCityOptions([])
    setInputText("")
  }

  useEffect(() => {
    if (data?.timezone) {
      let t = moment().tz(data?.timezone)
      setTime(t.format("h a"))
      setDate(t.format("dddd, MMMM Do YYYY"))
    }
  })

  return (
    <div className={styles.leftBar}>
      <div className={styles.searchBox} ref={divRef}>
        <input
          value={inputText}
          onChange={handleInputChange}
          type="text"
          placeholder="search city"
          onFocus={handleOnFocus}
          className={clsx({
            [styles.openDropDownInput]: isOpen === true,
          })}
        />
        {/* onKeyDown={handleEnter} */}
        {isOpen && cityOptions.length !== 0 && (
          <DropDown listItems={cityOptions} onClickOption={selectCity} />
        )}
      </div>
      <div className={styles.locationBox}>
        <FontAwesomeIcon icon={faMapMarker}></FontAwesomeIcon>
        <p>{city}</p>
      </div>
      <p>{time}</p>
      <div>
        {data?.current?.weather[0]?.icon && (
          <img
            src={`http://openweathermap.org/img/wn/${data?.current?.weather[0]?.icon}@2x.png`}
            alt="current weather icon"
          />
        )}
        <p>{~~(data?.current?.temp - 273.15)}°C</p>
        <p>{data?.current?.weather[0]?.description}</p>
      </div>

      <p>{date}</p>
    </div>
  )
}
