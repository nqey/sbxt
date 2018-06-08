import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    token: '',
    rule: '',
    state: '',
  },
  mutations: {
    setToken: (state, data) => {
      state.token = data;
    },
  },
});
