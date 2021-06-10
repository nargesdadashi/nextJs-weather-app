import axios from "axios"

const instance = axios.create({
  baseURL: ``,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

export default instance
