import {createStore} from "vuex";

let store;
export default store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    }
  },
  getters: {},
  mutations: {
    logout: state => {
      state.user.data = {}
      state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  actions: {
    register({commit}, user) {
      return fetch('http://127.0.0.1:8000/api/register', {
        headers: {
          "Content-Type": 'application/json',
          Accept: 'application/json',
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          commit("setUser", res);
          return res
        })
    }
  },
  modules: {}
})
