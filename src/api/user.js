import request from '@/utils/request'
class UserApi {
  login(data) {
    return request({
      url: '/auth/login',
      method: 'post',
      data
    })
  }

  getInfo(token) {
    return request({
      url: '/auth/info',
      method: 'get'
    })
  }

  logout() {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  }

}

const User = new UserApi()
export { User as default }
