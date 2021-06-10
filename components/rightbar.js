import axios from "axios"
import { useState, useCallback, useContext, useEffect, useRef } from "react"
import moment from "moment-timezone"
import styles from "../styles/RightBar.module.css"
import clsx from "clsx"
import Boxes from "./boxes"
import { Context } from "../store/store"

function momentTimeFormat(timestamp, timezone) {
  return moment.unix(timestamp).tz(timezone).format("HH:mm")
}

export default function RightBar({ data }) {
  const [state, dispatch] = useContext(Context)
  const { location } = state
  const myRef = useRef(null)

  const scrollToRef = ref => {
    ref.current.scrollLeft = 0
  }
  const executeScroll = () => scrollToRef(myRef)

  const [hourly, setHourly] = useState(true)
  // hourly -> true
  // daily -> false
  const switchButtons = useCallback(() => {
    setHourly(!hourly)
    executeScroll()
  }, [hourly])

  useEffect(() => {
    setHourly(true)
    executeScroll()
  }, [location])

  return (
    <div className={styles.rightBar}>
      <div className={styles.forcasts}>
        <div className={styles.buttons}>
          <button
            className={clsx({
              [styles.onButton]: hourly === true,
              [styles.offButton]: hourly === false,
            })}
            onClick={switchButtons}
          >
            hourly
          </button>

          <span className={styles.leftFloat}>/</span>

          <button
            className={clsx({
              [styles.offButton]: hourly === true,
              [styles.onButton]: hourly === false,
            })}
            onClick={switchButtons}
          >
            daily
          </button>
        </div>
        <div>
          <Boxes
            ref={myRef}
            timezone={data.timezone}
            data={hourly === true ? data?.hourly : data?.daily}
            hourly={hourly}
          />
        </div>
      </div>

      <div className={styles.todayHighlights}>
        <p>Today</p>
        {data.current && (
          <div className={styles.todayHighlightsBoxes}>
            <div>
              Wind speed: {data?.current?.wind_speed} <small>meter/sec</small>
            </div>
            <div>Humidity : {data?.current?.humidity} %</div>

            <div>
              sunrise :{momentTimeFormat(data.current.sunrise, data.timezone)}
            </div>

            <div>
              sunset:
              {momentTimeFormat(data.current.sunset, data.timezone)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
