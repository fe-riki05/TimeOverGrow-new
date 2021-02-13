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
	import Header from '../layouts/Header';
	import Main from '../components/Main';

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
