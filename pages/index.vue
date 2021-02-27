<template>
	<v-app>
		<Header>
			<nuxt-link to="/mypage" class="link d-flex">
				<v-icon>mdi-account-check</v-icon>
				<v-list-item-title style="display: block">マイページ</v-list-item-title>
			</nuxt-link>
		</Header>
		<Main />
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
