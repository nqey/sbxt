import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    name: '',
    rule: '',
    state: '',
    token: null,
  },
  mutations: {
    name: (state, data) => {
      sessionStorage.setItem('name', data);
      state.name = data;
    },
    rule: (state, data) => {
      sessionStorage.setItem('rule', data);
      state.rule = data;
    },
    state: (state, data) => {
      sessionStorage.setItem('state', data);
      state.state = data;
    },
    login: (state, data) => {
      sessionStorage.setItem('token', data);
      state.token = data;
    },
    logout: (state) => {
      sessionStorage.removeItem('token');
      state.token = null;
    },
  },
});
