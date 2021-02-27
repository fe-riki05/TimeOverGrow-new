<template>
	<v-app>
		<div class="header">
			<v-card class="overflow-hidden" color="#70c2fd">
				<v-app-bar height="100" class="header-menu" color="#70c2fd">
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
							<!-- <v-btn text class="menu" style="display: block" color="grey darken-3"> -->
							<slot></slot>
							<nuxt-link to="/mypage" class="link d-flex">
								<!-- <v-icon>mdi-account-check</v-icon>
								<v-list-item-title style="display: block"></v-list-item-title> -->
							</nuxt-link>
							<!-- </v-btn> -->
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
		background-color: #70c2fd;
	}
	.header-menu {
		margin: 0 auto;
		padding: 0 20%;
	}
</style>
