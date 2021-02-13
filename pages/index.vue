<template>
	<v-app>
		<v-main>
			<v-container>
				<Header />
				<Main />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	// import Vue from 'vue';
	// import Vuetify from 'vuetify';
	import Header from '../layouts/Header';
	import Main from '../components/Main';

	// Vue.use(Vuetify);
	export default {
		components: {
			Header,
			Main
		}
	};
</script>

<style scoped>
	>>> .v-application--wrap {
		min-height: 0;
	}
</style>
