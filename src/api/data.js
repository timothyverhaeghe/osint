import axios from 'axios'
import Config from '@/../env'

const get = endpoint => new Promise((resolve, reject) => {
  axios.get(`${Config.apiUrl}${endpoint}`, {
    })
    .then((response) => {
      resolve(response.data)
    }).catch((e) => {
      reject(e)
    })
})

const post = (endpoint, data) => new Promise((resolve, reject) => {
  axios.post(`${Config.apiUrl}${endpoint}`, data, {
  })
    .then((response) => {
      resolve(response.data)
    })
    .catch((e) => {
      reject(e)
    })
})


export default {
  get,
  post
}
