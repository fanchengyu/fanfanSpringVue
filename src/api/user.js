import { get, post } from '../http'
function getAllInfo() {
  return get('/api/getUserInfo')
}
function loginSystem(body) {
  return post('/api/loginSystem', body)
}

export {
  getAllInfo,
  loginSystem
}
