import { vuexfireMutations } from 'vuexfire'
import Vuex from 'vuex'
import users from './users'
import posts from './posts'

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations
    },
    modules: {
      users,
      posts
    }
  })
}

export default createStore
