import { get } from '../http'
function getAllInfo() {
  return get('/api/getUserInfo')
}

export {
  getAllInfo
}
