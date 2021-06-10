import moment from "moment-timezone"
import styles from "../styles/Boxes.module.css"
import { forwardRef } from "react"

const Boxes = forwardRef(({ timezone, data, hourly }, ref) => {
  return (
    <div className={styles.boxes} ref={ref}>
      {data &&
        hourly &&
        data.map((forcast, i) => (
          <div key={`${i}`} className={styles.hourForcast}>
            <p>{moment.unix(forcast.dt).tz(timezone).format("HH")}</p>
            <img
              className={styles.icon}
              src={`http://openweathermap.org/img/wn/${forcast?.weather[0]?.icon}@2x.png`}
              alt="related hour weather icon"
            />
            <p>{~~(forcast?.temp - 273.15)}°C</p>
          </div>
        ))}

      {data &&
        !hourly &&
        data.map((forcast, j) => (
          <div key={`${j}`} className={styles.dayForcast}>
            <p>{moment.unix(forcast.dt).format("ddd")}</p>
            <p>{moment.unix(forcast.dt).format("MMM DD")}</p>
            <img
              className={styles.icon}
              src={`http://openweathermap.org/img/wn/${forcast?.weather[0]?.icon}@2x.png`}
              alt="related hour weather icon"
            />
            <div className={styles.rangeBox}>
              <p>
                {~~(forcast?.temp?.min - 273.15)}°-
                {~~(forcast?.temp?.max - 273.15)}°
              </p>
            </div>
          </div>
        ))}
    </div>
  )
})
export default Boxes
