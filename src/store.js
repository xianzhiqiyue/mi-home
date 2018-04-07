import Vue from "vue";
import Vuex from "vuex";
import ls from "store2";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    commodities: {},
    user_info: {}
  },
  mutations: {
    changeCommodities(state, init) {
      state.commodities = { ...state.commodities, ...init };
      ls("commodities", state.commodities);
    },
    clearCommodities(state) {
      state.commodities = {};
      ls("commodities", state.commodities);
    },
    deleteCommodities(state, index) {
      const temp = {};
      for (let key in state.commodities) {
        if (key !== index) {
          temp[key] = state.commodities[key];
        }
        delete state.commodities[key];
      }
      state.commodities = { ...state.commodities, ...temp };
      ls("commodities", state.commodities);
    },
    loginIn(state, user) {
      state.user_info = { ...state.user_info, ...user };
      ls("user_info", state.user_info);
    }
  },
  actions: {
    changeCommodities({ commit }, init) {
      commit("changeCommodities", init);
    },
    deleteCommodities({ commit }, index) {
      commit("deleteCommodities", index);
    },
    clearCommodities({ commit }) {
      commit("clearCommodities");
    },
    loginIn({ commit }, user) {
      commit("loginIn", user);
    }
  }
});
