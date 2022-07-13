import defaultSettings from '@/settings'
import Settings from '@/api/settings';
import Solana from '@/api/solana';

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  solana: {
    wallets: [],
    balance_wallets: {},
    settings: {}
  }
}

const getters = {
  solanaWallets(state){
    let wallets = [];
    state.solana.wallets.forEach( wallet => {
      wallet.balance = state.solana.balance_wallets[wallet.wallet_address];
      wallets.push(wallet);
    });
    return wallets;
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },

  SET_SOLANA_WALLETS: (state, payload) => {
    state.solana.wallets = payload;
  },

  SET_SOLANA_SETTINGS: (state, payload) => {
    state.solana.settings = payload;
  },

  SET_BALANCE_WALLETS: (state, payload) => {
    state.solana.balance_wallets = payload;
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },

  loadSettings({ commit, state }, settings) {
    return new Promise((resolve, reject) => {
      Settings.getSettings(settings).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateSettings({ commit, state}, settings) {
    return new Promise((resolve, reject) => {
      Settings.updateSettings(settings).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateSolanaSettings({ commit, state}, settings) {
    return new Promise((resolve, reject) => {
      Solana.updateSettings(settings).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  generateSolanaWallet(){
    return new Promise((resolve, reject) => {
      Solana.generateWallet().then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  loadSolanaWallets({ commit, state }) {
    return new Promise((resolve, reject) => {
      Solana.loadWallets().then( response => {
        commit('SET_SOLANA_WALLETS', response.walles);
        commit('SET_SOLANA_SETTINGS', response.settings);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getSolanaBalanceWallets({ commit, state }) {
    return new Promise((resolve, reject) => {
      Solana.getBalanceWallets().then( response => {
        commit('SET_BALANCE_WALLETS', response.balance_wallets);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  setPrimaryWallet({commit, state}, id){
    return new Promise((resolve, reject) => {
      const data_send = {id: id};
      Solana.setPrimaryWallet(data_send).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  checkSolanaWalletInfo({commit, state}, data_send){
    return new Promise((resolve, reject) => {
      Solana.checkWalletInfo(data_send).then( response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addSolanaWallet({commit, state}, data_send){
    return new Promise((resolve, reject) => {
      Solana.addWallet(data_send).then( response => {
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
  getters,
  mutations,
  actions
}

