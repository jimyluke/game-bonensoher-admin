import Game from '@/api/game'

const getDefaultState = () => {
  return {
    history: [], // list games
    current_game: {},
    game_player: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_HISTORY_LIST: (state, payload) => {
    state.history = payload;
  },

  SET_CURRENT_GAME: (state, game) => {
    state.current_game = game;
  },

  SET_GAME_PLAYER: (state, payload) => {
    state.game_player = payload;
  }
}

const actions = {
  loadHistory({ commit, state }) {
    return new Promise((resolve, reject) => {
      Game.getHistoryList().then( response => {
        commit('SET_HISTORY_LIST', response.history);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  loadGameInfo({ commit, state }, game_id ){
    return new Promise((resolve, reject) => {
      Game.loadGameInfo(game_id).then( response => {
        commit('SET_CURRENT_GAME', response.current_game);
        commit('SET_GAME_PLAYER', response.game_player);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  initNewGameAll({ commit, state }){
    return new Promise((resolve, reject) => {
      Game.initNewGameAll().then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

