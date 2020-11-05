import axios from 'axios'
import { Message } from 'element-ui'
const fanfanHttp = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 20000
})
fanfanHttp.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
fanfanHttp.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response.data)
  }
},
error => {
  console.log('error', error.response)
  if (error.response && error.response.data) {
    Message({
      message: `${error.response.data}`,
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    Message({
      message: `${error.message}`,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return Promise.reject(error.data)
}
)

function get(url, params) {
  return new Promise((resolve, reject) => {
    fanfanHttp.get(url, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export { get }
