<template>
  <v-container>
    <Header />
    <Main />
  </v-container>
</template>

<script>
	import Vue from 'vue'
	import Vuetify from 'vuetify'
	import Header from '../layouts/Header'
	import Main from '../components/Main'

	Vue.use(Vuetify)
	export default {
		components: {
			Header,
			Main
		}
	}
</script>
