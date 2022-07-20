import {
  createStore
} from "vuex";
import axiosClient from "../request/axios";

let store;
export default store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [
      {
        id: 1,
        title: 'Title',
        slug: 'slug-slug-slug',
        status: 'draft',
        image: 'https://cdn.pixabay.com/photo/2016/08/15/10/17/survey-1594962_960_720.jpg',
        description: 'Description description description',
        created_at: '2021-12-20 18:00:00',
        updated_at: '2021-12-20 18:00:00',
        expire_date: '2021-12-20 18:00:00',
        questions: [{
            id: 1,
            type: 'select',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 2,
            type: 'radio',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 3,
            type: 'select',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 4,
            type: 'text',
            question: 'Question Title',
            description: 'Description here',
            data: []
          },
          {
            id: 5,
            type: 'textarea',
            question: 'Question Title',
            description: 'Description here',
            data: {}
          }
        ]
      },
      {
        id: 2,
        title: 'Title 2',
        slug: 'slug-slug-slug2',
        status: 'true',
        image: 'https://cdn.pixabay.com/photo/2012/04/25/00/23/checklist-41335_960_720.png',
        description: 'Description description description',
        created_at: '2021-12-20 18:00:00',
        updated_at: '2021-12-20 18:00:00',
        expire_date: '2021-12-20 18:00:00',
        questions: [{
            id: 16,
            type: 'select',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 25,
            type: 'radio',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 69,
            type: 'select',
            question: 'Question Title',
            description: 'Description here',
            data: [{
                uuid: '123e4567-e89b-12d3-a456-426614174000',
                text: 'answer1'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174002',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174003',
                text: 'answer2'
              },
              {
                uuid: '123e4567-e89b-12d3-a456-426614174004',
                text: 'answer2'
              },
            ]
          },
          {
            id: 455,
            type: 'text',
            question: 'Question Title',
            description: 'Description here',
            data: []
          },
          {
            id: 685,
            type: 'textarea',
            question: 'Question Title',
            description: 'Description here',
            data: {}
          }
        ]
      }
    ],
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea']
  },
  getters: {},
  mutations: {
    logout: state => {
      state.user.data = {}
      state.user.token = null
      sessionStorage.removeItem('TOKEN')
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem('TOKEN', userData.token)
    }
  },
  actions: {
    register({
      commit
    }, user) {
      return axiosClient.post('/register', user).then(({
        data
      }) => {
        commit('setUser', data);
        return data;
      })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user).then(({data}) => {commit('setUser', data); return data;})
    },
    logout({
      commit
    }) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    }
  },
  modules: {}
})
