import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../plugins/firebase'

Vue.use(Vuex)

export const strict = false

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  signUp({ email, password }) {
    return auth().createUserWithEmailAndPassword(email, password)
  },

  signInWithEmail({ email, password }) {
    return auth().signInWithEmailAndPassword(email, password)
  },

  signInWithGoogle() {
    return auth().signInWithPopup(new auth.GoogleAuthProvider())
  },

  signOut() {
    return auth().signOut()
  }
}

export const getters = {
  user(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  }
}
