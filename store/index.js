import { vuexfireMutations } from 'vuexfire'
import Vuex from 'vuex'
import sampleUsers from './sampleUsers'

const createStore = () => {
  return new Vuex.Store({
    mutations: {
      ...vuexfireMutations
    },
    modules: {
      sampleUsers
    }
  })
}

export default createStore
