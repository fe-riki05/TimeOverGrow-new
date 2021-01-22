<template>
  <v-container>
    <Header />
    <Main />
  </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import MessageModel from '../models/Message'
import { auth } from '../plugins/firebase'
import Header from '../layouts/Header'
import Main from '../components/Main'

Vue.use(Vuetify)
export default {
  components: {
    Header,
    Main,
  },
}
</script>
