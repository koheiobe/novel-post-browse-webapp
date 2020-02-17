import { vuexfireMutations } from 'vuexfire'
import Vuex from 'vuex'
import users from './users'
import novels from './novels'

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations
    },
    modules: {
      users,
      novels
    }
  })
}

export default createStore
