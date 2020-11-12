import { get, post, del, patch } from '../http'
function getAllInfo() {
  return get('/api/getUserInfo')
}
function loginSystem(body) {
  return post('/api/loginSystem', body)
}
function deleteInfo(id) {
  return del(`/api/delete?id=${id}`)
}
function addUserInfo(body) {
  return post('/api/addUserInfo', body)
}
function editUserInfo(body) {
  return patch(`/api/updateInfo`, body)
}

export {
  getAllInfo,
  loginSystem,
  deleteInfo,
  addUserInfo,
  editUserInfo
}
