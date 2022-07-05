import defaultSettings from '@/settings'
import Settings from '@/api/settings';

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

