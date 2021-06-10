import axios from "axios"

const getUserLoc = () => {
  return axios.get("https://extreme-ip-lookup.com/json/").then(res => res.data)
}
export default getUserLoc
