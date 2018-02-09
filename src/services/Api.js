import axios from 'axios'

// a public API gateway
const url = 'https://7b1e3ny5yg.execute-api.eu-west-1.amazonaws.com/dev'
const entrypoint =
  process.env.NODE_ENV === 'production' ? url : 'http://localhost:3000'

const getObservations = () => {
  console.log('Getting observations from ' + entrypoint)
  return axios
    .get(`${entrypoint}/api/observations`)
    .then(response => response.data)
}
const addObservation = newObs => {
  const request = axios.post(`${entrypoint}/api/observations`, newObs)
  return request.then(response => response.data)
}

export default { getObservations, addObservation }
