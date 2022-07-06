import request from '@/utils/request'

class GameApi {
  getHistoryList(params){
    return request({
      url: '/game/history-list',
      method: 'get',
      params
    })
  }

  loadGameInfo(game_id){
    return request({
      url: `/game-info/${game_id}`,
      method: 'get'
    })
  }

  checkGame(data){
    return request({
      url: `/game/check`,
      method: 'post',
      data
    })
  }

  initNewGameAll(){
    return request({
      url: '/game/create-game-for-all-user',
      method: 'post'
    })
  }
}

const Game = new GameApi()
export { Game as default }
