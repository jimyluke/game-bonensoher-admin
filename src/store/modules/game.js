import Game from '@/api/game'

const getDefaultState = () => {
  return {
    history: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_HISTORY_LIST: (state, payload) => {
    state.history = payload;
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

