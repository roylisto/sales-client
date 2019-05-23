/* eslint-disable */
import Api from '@/services/Api'
function getToken(){
  const user = JSON.parse(localStorage.getItem('user'))
  const token = 'Bearer '+user.token
  
  return {headers: {Authorization: token}}
}
export default {
  list(filters) {       
    console.log(filters)
    return Api().get('/sales', { params: filters })
  },
  add(sales) {
    return Api().post('/sales', sales, getToken())
  },
  delete(salesId) {
    return Api().delete('/sales/'+salesId, getToken())
  }
}