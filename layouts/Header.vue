<template>
	<v-app>
		<div class="header">
			<v-card class="overflow-hidden" color="#70c2fd">
				<v-app-bar height="100" class="header-menu" color="#70c2fd">
					<div class="d-flex header-item">
						<v-toolbar-title class="title menu">
							<nuxt-link to="top" class="link">
								<v-icon>mdi-timer-sand</v-icon>
								{{ title }}
							</nuxt-link>
						</v-toolbar-title>
						<!-- <v-spacer /> -->
						<!-- <v-app-bar-nav-icon class="float-right" @click="drawer = true" /> -->
						<!-- <v-navigation-drawer v-model="drawer" absolute temporary right> -->
						<!-- <v-list nav dense> -->
						<!-- <v-list-item-group v-model="group" active-class="deep-grey--text text--accent-4"> -->
						<v-btn
							text
							right
							absolute
							class="menu d-flex"
							style="display: block"
							color="grey darken-3"
							@click="signOut"
						>
							<v-icon>mdi-arrow-left-bold</v-icon>
							<v-list-item-title style="display: block">ログアウト</v-list-item-title>
						</v-btn>
						<!-- </div> -->
						<!-- </v-list-item-group> -->
						<!-- </v-list> -->
						<!-- </v-navigation-drawer> -->
					</div>
				</v-app-bar>
			</v-card>
		</div>
	</v-app>
</template>

<script>
	export default {
		name: 'TimeOverGrow',
		data() {
			return {
				title: 'TimeOverGrow',
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
	.title {
		font-size: 35px;
	}
	.menu {
		width: 200px;
	}
	.header-item {
		/* margin: 0 auto; */
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
