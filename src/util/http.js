import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:3000'
const http = {
  async get (url, params) {
    let {data} = await axios.get(url, params)
    return data
  }
}
export default http
