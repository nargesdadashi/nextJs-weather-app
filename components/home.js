import styles from "../styles/Home.module.css"
import axios from "axios"
import { useState, useEffect, useCallback, useContext } from "react"
import RightBar from "./rightbar"
import LeftBar from "./leftbar"
import getUserLoc from "../services/getUserLoc"
import clsx from "clsx"
import { Context } from "../store/store"
import moment from "moment-timezone"
import { actionSetLocation, actionSetTimeState } from "../reducers/actions"

function currentMomentIsBefore(timezone, timestamp) {
  return moment().tz(timezone)?.isBefore(moment.unix(timestamp)?.tz(timezone))
}

const time = {
  day: "day",
  night: "night",
}

export default function Home() {
  const [weatherData, setWeatherData] = useState(null)
  const [state, dispatch] = useContext(Context)
  const { location, timeState } = state

  const getAndSetUserLocation = useCallback(async () => {
    try {
      const response = await getUserLoc()
      dispatch(
        actionSetLocation({
          city: response.city,
          countryCode: response.countryCode,
          lat: response.lat,
          lon: response.lon,
        })
      )
    } catch (err) {
      console.log("Request failed")
    }
  }, [getUserLoc])

  const updateWeather = useCallback(() => {
    if (location?.lat && location?.lon) {
      axios
        .get(`/api/weather/${location.lat}/${location.lon}`)
        .then(res => res.data)
        .then(data => {
          setWeatherData(data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [location])

  const makeUpdateTimePayload = useCallback(() => {
    if (weatherData) {
      if (
        currentMomentIsBefore(
          weatherData?.timezone,
          weatherData?.current?.sunset
        ) &&
        !currentMomentIsBefore(
          weatherData?.timezone,
          weatherData?.current?.sunrise
        )
      ) {
        return time.day
      } else {
        return time.night
      }
    }
  }, [weatherData])

  useEffect(() => {
    getAndSetUserLocation()
  }, [])

  useEffect(() => {
    const payload = makeUpdateTimePayload()
    dispatch(actionSetTimeState(payload))
  }, [dispatch, makeUpdateTimePayload])

  useEffect(() => {
    updateWeather()
  }, [location])

  return (
    weatherData && (
      <div
        className={clsx(
          {
            [styles.day]: timeState === time.day,
            [styles.night]: timeState === time.night,
          },
          styles.home
        )}
      >
        <div className={styles.box}>
          <LeftBar
            city={`${location?.city},${location?.countryCode}`}
            data={weatherData}
          />
          <RightBar data={weatherData} />
        </div>
      </div>
    )
  )
}
