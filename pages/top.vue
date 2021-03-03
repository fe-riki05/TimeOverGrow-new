<template>
	<v-app>
		<Header :title="false" :logout="false">
			<v-layout class="d-flex p-0 justify-end">
				<v-btn text @click="signIn">
					<v-icon>mdi-account-check</v-icon>
					<v-list-item-title>ログイン</v-list-item-title>
				</v-btn>
			</v-layout>
		</Header>
		<v-container>
			<v-row>
				<h1>TimeOverGrow</h1>
			</v-row>
			<v-row>
				<img class="img" src="@/assets/app_top.jpg" />
			</v-row>
		</v-container>
	</v-app>
</template>

<script>
	import Header from '../layouts/Header';

	export default {
		components: {
			Header
		},
		methods: {
			signIn() {
				this.$store
					.dispatch('signOut')
					.then(() => {
						this.$router.push({
							name: 'login'
						});
					})
					.catch(err => {
						alert(err.message);
					});
			}
		}
	};
</script>

<style scoped>
	>>> .v-application--wrap {
		min-height: 0;
	}

	.img {
		width: 40%;
	}
</style>
