import { vuexfireMutations } from 'vuexfire'
import Vuex from 'vuex'
import users from './users'
import novels from './novels'
import chapters from './chapters'

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations
    },
    modules: {
      users,
      novels,
      chapters
    }
  })
}

export default createStore
