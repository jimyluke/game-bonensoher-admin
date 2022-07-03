import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, getRefreshToken, removeRefreshToken } from '@/utils/auth'
import _ from 'lodash'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 45000 // request timeout
})

const check_refresh_token = _.debounce(function(message){
  if(router.history.current.path === '/login' || store.state.users.relogin_cancel){
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })

    return;
  }


  if(getRefreshToken()){
    MessageBox.confirm('Session expires, you can cancel to stay on this page, or login again', 'Confirm Relogin', {
      confirmButtonText: 'Re-Login',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      removeToken();
      store.commit('users/SET_TOKEN', null);

      store.dispatch('users/refreshToken').then((response) => {
        if(response.success){
          location.reload()
        }else{
          removeRefreshToken()
          store.commit('users/SET_REFRESH_TOKEN', null);
        }
      })
    }).catch( error => {
      store.commit('users/SET_RELOGIN_CANCEL', true)
    })
  }
}, 500)

const error_notify = _.debounce(function(message, callback){
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })

  if(typeof callback === 'function'){
    callback();
  }
}, 500)

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // {'Authorization': `Bearer ${state.token}`}
      // config.headers['Authorization'] = getToken()
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    //console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 419 || res.code === 400 || res.code === 418) {
        let msg = '';

        switch (res.code) {
          case 419:
            msg = 'Session is overdue';
            break;

          case 400:
            msg = 'Bad Request';
            break;

          case 418:
            msg = 'The server refuses the attempt to brew coffee with a teapot.';
            break;

          default:
            break;
        }

        MessageBox.confirm(msg, 'Confirm logout', {
          confirmButtonText: 'Reload',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('users/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },

  error => {
    let status_code = error.response.status;

    if(status_code === 403){
      check_refresh_token(error.message);
    }else{
      error_notify(error.message)
    }

    return Promise.reject(error)
  }
)

export default service
