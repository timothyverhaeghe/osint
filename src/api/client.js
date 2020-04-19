import axios from 'axios'
import Config from '@/../env'
import Cookies from '@/api/cookies'


const client = axios.create({
    baseURL: `${Config.apiUrl}`,
    json: true,
    headers: {
      'authorization': 'Bearer '+Cookies.get('session')
    }
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then(req => {
            return req.data
        })
    }
}
