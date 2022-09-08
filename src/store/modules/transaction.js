import Transaction from '@/api/transaction'

const getDefaultState = () => {
  return {
    list: [], // list of transactions
    total: 0,
    dataSend: {
      page: 1,
      search: '',
      limit: 20
    }
  }
}

const state = getDefaultState()

const mutations = {
  SET_LIST_DATA: (state, data) => {
    state.list = data;
  },

  SET_TOTAL: (state, total) => {
    state.total = total;
  },

  SET_PAGE: (state, page) => {
    state.dataSend.page = page;
  }
}

const actions = {
  loadData({ commit, state }) {
    return new Promise((resolve, reject) => {
      Transaction.getList(state.dataSend).then( response => {
        commit('SET_LIST_DATA', response.transactions);
        commit('SET_TOTAL', response.total);
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

