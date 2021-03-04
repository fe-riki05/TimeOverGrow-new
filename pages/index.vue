<template>
	<v-app>
		<Header>
			<v-btn text>
				<nuxt-link to="/mypage" class="d-flex auth">
					<v-icon>mdi-account-check</v-icon>
					<v-list-item-title style="display: block">マイページ</v-list-item-title>
				</nuxt-link>
			</v-btn>
		</Header>
		<Main class="mt-7" />
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
	.auth {
		text-decoration: none;
		color: inherit;
	}
</style>
