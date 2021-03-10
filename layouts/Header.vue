<template>
	<v-app>
		<div class="header">
			<v-card class="overflow-hidden">
				<v-app-bar app height="100" class="header-menu header">
					<v-container class="d-flex header-item">
						<div>
							<v-btn v-if="title" text>
								<nuxt-link to="/top" class="link d-flex menu">
									<v-icon color="black">mdi-timer-sand</v-icon>
									<v-toolbar-title> TimeOverGrow </v-toolbar-title>
								</nuxt-link>
							</v-btn>
						</div>
						<div class="p-0 justify-end hidden-md-and-down">
							<v-btn v-if="logout" text @click="signOut">
								<v-icon>mdi-arrow-left-bold</v-icon>
								<v-list-item-title>ログアウト</v-list-item-title>
							</v-btn>
							<!-- ここで挿入される -->
							<slot></slot>
						</div>
						<!-- ここからハンバーガーメニュー -->
						<div class="hidden-md-and-up">
							<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
							<v-navigation-drawer v-model="drawer" right fixed temporary>
								<v-list nav dense>
									<v-list-item-group>
										<v-list-item>
											<v-btn v-if="logout" text @click="signOut">
												<v-icon>mdi-arrow-left-bold</v-icon>
												<v-list-item-title>ログアウト</v-list-item-title>
											</v-btn>
										</v-list-item>
										<v-list-item>
											<!-- ここで挿入される -->
											<slot></slot>
										</v-list-item>
									</v-list-item-group>
								</v-list>
							</v-navigation-drawer>
							<!-- ここまで -->
						</div>
					</v-container>
				</v-app-bar>
			</v-card>
		</div>
	</v-app>
</template>

<script>
	export default {
		props: {
			title: {
				type: Boolean,
				default: true
			},
			logout: {
				type: Boolean,
				default: true
			}
		},
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
	.header {
		background-color: #70c2fd;
		background: #2980b9; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #2980b9, #6dd5fa, #ffffff); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#2980b9,
			#6dd5fa,
			#ffffff
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	.title {
		font-size: 35px;
	}
	.menu {
		width: 200px;
		padding: 0;
		text-decoration: none;
		color: inherit;
	}
	h1 {
		margin: 0 auto;
	}
	.header-menu {
		margin: 0 auto;
		padding: 0 20%;
	}
</style>
