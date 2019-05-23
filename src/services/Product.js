/* eslint-disable */
import Api from '@/services/Api'
function getToken(){
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+user.token  
  
  return {headers: {Authorization: token}}
}
export default {
  list() {
    return Api().get('/product', getToken())
  }
}