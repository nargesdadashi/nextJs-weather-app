import axios from "axios"

export default async (req, res) => {
  const [lat, lon] = req.query.coordinates
  await axios
    .get(`https://api.openweathermap.org/data/2.5/onecall`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        appid: process.env.REACT_WEATHER_APP_ID,
        lat: lat,
        lon: lon,
      },
    })
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}
