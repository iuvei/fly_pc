import {
  fetch
} from '@/services/fetch'
export default {
  namespaced: true,
  state: {
    //所有玩法列表数据
    gamePlayList: [],
    showCheckBox: false,
    twoGameOddList: []


  },
  getters: {},
  mutations: {
    gamePlay(state, json) {
      state.gamePlayList = json
    },
    setShowCheckBox(state, boolen) {
      state.showCheckBox = boolen;
    },
    saveTwoGameOdd(state, data) {
      state.twoGameOddList = data
    }

  },
  actions: {
    //获取所有玩法列表
    async gamePlay({
      commit
    }, params) {
      let res = await fetch('get', 'gamePlay', params)
      commit("gamePlay", res.data)
    },
    async getTwoGameOdd({
      commit
    }, params) {
      let res = await fetch('get', 'twoGameOdd', params)
      commit("saveTwoGameOdd", res.data)
    },
    async lmpbet({
      commit
    }, params) {
      let res = await fetch('post', 'lmpbet', params)
      return res
    },
    setShowCheckBox({
      commit
    }, boolen) {
      commit("setShowCheckBox", boolen)
    },

  }
}
