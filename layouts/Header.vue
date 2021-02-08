<template>
	<div class="header">
		<v-card class="mx-auto overflow-hidden">
			<v-app-bar color="primary" dark height="100">
				<v-toolbar-title>
					<v-icon>mdi-timer-sand</v-icon>
					{{ title }}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn icon> </v-btn>
				<v-app-bar-nav-icon class="float-right" @click="drawer = true"></v-app-bar-nav-icon>
			</v-app-bar>
			<v-navigation-drawer v-model="drawer" absolute temporary>
				<v-list nav dense>
					<v-list-item-group v-model="group" active-class="deep-grey--text text--accent-4">
						<v-list-item color="grey darken-3" @click="signOut">
							<v-list-item-icon>
								<v-icon>mdi-arrow-left-bold</v-icon>
							</v-list-item-icon>
							<v-list-item-title>ログアウト</v-list-item-title>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-navigation-drawer>
		</v-card>
	</div>
</template>

<script>
	export default {
		name: 'TimeOverGrow',
		data() {
			return {
				title: 'TimeOverGrow',
				drawer: false,
				group: null
			}
		},
		methods: {
			signOut() {
				this.$store
					.dispatch('signOut')
					.then(() => {
						this.$router.push({
							name: 'login'
						})
					})
					.catch(err => {
						alert(err.message)
					})
			}
		}
	}
</script>

<style scoped>
	h1 {
		margin: 0 auto;
	}
	.header {
		margin-bottom: 3vw;
	}
</style>
