import request from '@/utils/request'

class GameApi {
  getHistoryList(params){
    return request({
      url: '/game/history-list',
      method: 'get',
      params
    })
  }
}

const Game = new GameApi()
export { Game as default }
