import request from '@/utils/request'

class TransactionApi {
  getList(params){
    return request({
      url: '/transactions/list',
      method: 'get',
      params
    })
  }
}


const Transaction = new TransactionApi()
export { Transaction as default }
