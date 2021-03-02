<template>
	<v-app>
		<div class="header">
			<v-card class="overflow-hidden">
				<v-app-bar height="100" class="header-menu header">
					<v-container class="d-flex header-item">
						<v-layout>
							<nuxt-link to="/top" class="link d-flex">
								<v-icon>mdi-timer-sand</v-icon>
								<v-toolbar-title class="title menu"> TimeOverGrow </v-toolbar-title>
							</nuxt-link>
						</v-layout>
						<v-layout class="d-flex p-0 justify-end">
							<v-btn text class="menu" style="display: block" color="grey darken-3" @click="signOut">
								<v-icon>mdi-arrow-left-bold</v-icon>
								<v-list-item-title style="display: block">ログアウト</v-list-item-title>
							</v-btn>
							<slot></slot>
							<nuxt-link to="/mypage" class="link d-flex"> </nuxt-link>
						</v-layout>
					</v-container>
				</v-app-bar>
			</v-card>
		</div>
	</v-app>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,
				group: null
			};
		},
		methods: {
			signOut() {
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

<style>
	.link {
		text-decoration: none;
	}
	.link:visited {
		color: inherit;
	}

	.title {
		font-size: 35px;
	}
	.menu {
		width: 200px;
		padding: 0;
	}
	h1 {
		margin: 0 auto;
	}
	.header {
		margin-bottom: 50px;
		/* background-color: #70c2fd; */
		background: #2980b9; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #2980b9, #6dd5fa, #ffffff); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#2980b9,
			#6dd5fa,
			#ffffff
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.header-menu {
		margin: 0 auto;
		padding: 0 20%;
	}
</style>
