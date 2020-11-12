import axios from 'axios'
import { Message, Notification } from 'element-ui'
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
    if (response.data.code !== '0') {
      Notification.error({
        title: '错误',
        message: response.data.message
      })
      return Promise.reject(response.data.message)
    }
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response.data)
  }
},
error => {
  console.log('error', error.response)
  if (error.response && error.response.error) {
    Message({
      message: `${error.response.error}`,
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
function post(url, body, config) {
  return new Promise((resolve, reject) => {
    fanfanHttp.post(url, body, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
function patch(url, body, config) {
  return new Promise((resolve, reject) => {
    fanfanHttp.patch(url, body, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
function del(url, params) {
  return new Promise((resolve, reject) => {
    fanfanHttp.delete(url, { params }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
export { get, post, del, patch }
